import express from 'express'
import database from './config/database.mjs';
import userRouter from './routes/api/userRoute.mjs';
import authRouter from './routes/api/authRoute.mjs';
import cors from 'cors'
import dotenv from 'dotenv';

const app = express()
dotenv.config()

let statusdb = 'unknown';

app.use(cors());
app.use(express.json())
database.sync({force:false})

app.get('/', (req, res) => {
    res.send(statusdb)
})

app.use(userRouter)
app.use(authRouter)


app.listen(process.env.PORT, () => {
    console.log(`RUNNING PROGRAM ON PORT ${process.env.PORT}`);
})