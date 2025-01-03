import express,{json} from 'express';
import { adminrouter } from './ROUTER/adminrouter.js';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
 
dotenv.config();
const app=express();
app.use(cors({
    origin:'http://127.0.0.1:5500', //http//:127.0.0.1:8000
    credentials: true

}))
app.use(json());
app.use(cookieParser());
app.use('/',adminrouter)//redirect cheyyam

const port=process.env.Port

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
