import express,{json} from 'express'; 
import { adminroute } from '../../ASSIGNMENT/LIBARARYMANAGEMENT/Routes/adminroutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const port = process.env.Port;

dotenv.config();
const app = express();

app.use(cors({
    origin:'http://127.0.0.1:5500',      // or // 'http://127.0.0.1:5000'
    credentials : true
}))
app.use(json())
app.use(cookieParser());
app.use('/',adminroute)



app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})