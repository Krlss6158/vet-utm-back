import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

//import routers
import petRouter from './routes/pet.router';
import userRouter from './routes/user.router';
import provinceRouter from './routes/province.router';
import cantonRouter from './routes/canton.router';


//init server
const app = express();

dotenv.config();
app.use(morgan(process.env.mode || null));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.options("*", cors());
app.use(express.static(path.join(__dirname, '/public/upload')));
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