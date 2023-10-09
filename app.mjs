import express from 'express'
import database from './config/database.mjs';
import userRouter from './routes/api/userRoute.mjs';
import authRouter from './routes/api/authRoute.mjs';
import cors from 'cors'
import dotenv from 'dotenv';
import TestRouter from './routes/testRoute.mjs';
import Config from './config/app.mjs'

const app = express()
dotenv.config()

const port = Config.port;

app.use(cors());
app.use(express.json())
database.sync({force:false})

app.get('/', (req, res) => {
    res.send('hello ayo cpns')
})

app.use(userRouter)
app.use(authRouter)
app.use(TestRouter)

app.listen(port, () => {
    console.log(`RUNNING PROGRAM ON PORT ${port}`);
})