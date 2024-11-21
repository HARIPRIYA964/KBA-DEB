import express,{json} from 'express';
import { adminrouter } from './Router/adminroute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = process.env.Port

const app = express()
app.use(json())
app.use('/',adminrouter)
app.use(cookieParser())

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})
