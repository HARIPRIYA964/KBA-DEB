import express,{json} from 'express';
import { adminrouter } from './Router/adminroute.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const port = process.env.Port

const app = express()
app.use(json())
app.use(cors({
  origin:'http://127.0.0.1:3000',     
  credentials : true
}))
app.use('/',adminrouter)
app.use(cookieParser())

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})
