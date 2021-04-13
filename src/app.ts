import express, { Request, Response } from 'express';

const app = express();

const port = process.env.PORT || 3000;
app.get('/', (req: Request, res: Response) => {
    res.send('Server is working');
});

app.get('/healthcheck', (req: Request, res: Response) => {
    res.send('Healthcheck OK');
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})