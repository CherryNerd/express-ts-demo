import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import moment from 'moment';

const logger = function(...args: any[]) {
    console.log(moment().format('YYYY/MM/DD HH:mm:ss'), ...arguments)
}

const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    logger('Requesting incoming on path', req.url);
    next();
})

app.get('/', (req: Request, res: Response) => {
    res.send('Server is working');
});

app.get('/healthcheck', (req: Request, res: Response) => {
    logger('Healthcheck! status:', mongoose.connection.readyState)
    if(mongoose.connection.readyState !== 1) {
        res.status(500);
        res.send('Mongo Connection Broken');
        return;
    }
    res.status(200);
    res.send('Healthcheck OK');
});

app.listen(port, async () => {
    logger('Mongo Connection string', process.env.MONGO_CONNECTION_STRING);
    logger(`Server is running at ${port}`);

    logger('Connecting to mongoose....')
    mongoose.connect(process.env.MONGO_CONNECTION_STRING || 'localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true,})
    .finally(() => {
        logger('Connection status', mongoose.connection.readyState)
    })
});