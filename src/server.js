import express, { json } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';

//import routers
import petRouter from './routes/pet.router';
import userRouter from './routes/user.router';
import provinceRouter from './routes/province.router';
import cantonRouter from './routes/canton.router';


//init server
const app = express();

dotenv.config();
app.use(morgan(process.env.mode || null));
app.use(json());
app.use(cors());
app.options("*", cors());

//routers
app.use(`/api/pets`, petRouter);
app.use(`/api/users`, userRouter);
app.use(`/api/provinces`, provinceRouter);
app.use(`/api/cantons`, cantonRouter);

//test
app.use('/ping', (req, res) => {
    res.send('pong 🔴')
})

app.use('*', (req, res) => { res.status(404).json({ menssage: 'Endpoint not found' }) })

export default app;