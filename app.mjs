import express from 'express'
import database from './config/database.mjs';
import router from './routes/api/userRoute.mjs';
import cors from 'cors'

const app = express()
let statusdb = 'unknown';

app.use(cors());
app.use(express.json())
database
    .sync({force:true})
    .then(() => {
        statusdb = `success`
        console.log('connected')
    })
    .catch((err) => {
        statusdb = `error ${err.message}`
        console.log(err.message)
    })

app.get('/', (req, res) => {
    res.send(statusdb)
})

app.use(router)
app.listen(3000, () => {
    console.log("RUNNING PROGRAM ON PORT 3000");
})