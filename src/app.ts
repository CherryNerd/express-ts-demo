import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import moment from 'moment';
import { getModelForClass, prop } from "@typegoose/typegoose";

const logger = function(...args: any[]) {
    console.log(moment().format('YYYY/MM/DD HH:mm:ss'), ...arguments)
}

/***********
 ** Mongo **
 ***********/
const mongoUri = require('mongo-uri-builder')({
    username: process.env.MONGODB_ADMIN_USERNAME, // or user: 'user'
    password: process.env.MONGODB_ADMIN_PASSWORD,
    host: process.env.MONGODB_HOST,
    port: 27017,
    // replicas: [
        // {host: 'host2', port: 2222},
        // {host: 'host3', port: 3333}
    // ],
    database: process.env.MONGODB_DATABASE,
    // options: {
    //     w: 0,
    //     readPreference: 'secondary'
    // }
});


class Person {
    @prop()
    public name?: string;
  
    @prop({ required: true })
    public age!: number; // This is a single Primitive

    @prop({ type: () => [String] })
    public devices?: string[]; // This is a Primitive Array
}

const PersonModel = getModelForClass(Person);

/***********
 * Express *
 ***********/

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    logger('Requesting incoming on path', req.url);
    next();
})

app.post('/person', async (req: Request, res: Response) => {
    const person = await PersonModel.create(req.body);
    try {
        const validated = await person.validate();
        await person.save()
        res.send(person);
    } catch(e) {
        res.send({error: e.errors});   
    }
});

app.get('/person', async (req: Request, res: Response) => {
    res.send(await PersonModel.find());
});

app.get('/person/:id', async(req: Request, res: Response) => {
    res.send(await PersonModel.findById(req.params.id))
});

app.get('/', async(req: Request, res: Response) => {
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

    logger('Connecting to mongoose on URI', mongoUri)
    mongoose.connect(mongoUri || 'localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true,})
    .finally(() => {
        logger('Connection status', mongoose.connection.readyState)
    })
});