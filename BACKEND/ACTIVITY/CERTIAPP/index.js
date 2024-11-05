import express, { json } from 'express';
import { adminroute } from '../CERTIAPP/Routes/adminroute.js';
import dotenv from 'dotenv';


dotenv.config()
const app = express();
app.use(json())
app.use('/', adminroute)
const port = process.env.Port;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})