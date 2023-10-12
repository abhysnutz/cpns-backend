import express from 'express'
import database from './config/database.mjs';
import './config/association.mjs'
import userRouter from './routes/api/userRoute.mjs';
import authRouter from './routes/api/authRoute.mjs';
import cors from 'cors'
import dotenv from 'dotenv';
import TestRouter from './routes/testRoute.mjs';
import Config from './config/app.mjs'
import https from 'https';
import fs from 'fs';

dotenv.config()
const app = express()
const port = Config.port;

app.use(cors());
app.use(express.json())

// await database.drop()
// await database.sync({force:false})
await database.sync({alter:true})

app.get('/', (req, res) => {
    res.send('hello ayo cpns')
})

app.use(userRouter)
app.use(authRouter)
app.use(TestRouter)

if(process.env.APP_ENV === 'production'){
    const options = {
        key: fs.readFileSync('./private.key'),
        cert: fs.readFileSync('./certificate.crt')
    }
    
    https.createServer(options, app).listen(port, () => {
        console.log(`RUNNING PROGRAM ON PORT ${port}`);
    });
}else{
    app.listen(port, () => {
        console.log(`RUNNING PROGRAM ON PORT ${port}`);
    })
}    