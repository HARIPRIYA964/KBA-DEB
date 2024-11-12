import express, { json } from 'express';
import { adminroute } from './Routes/adminroute.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config()
const port = process.env.Port;

const app = express();
app.use(json())
app.use(cookieParser());
app.use('/',adminroute);


app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})

