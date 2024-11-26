import express,{json} from 'express';
import dotenv from 'dotenv';
import { adminRoute } from './route/adminroute.js';

dotenv.config();
const port=process.env.Port;

const app= express();
app.use(json());
app.use('/',adminRoute)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})


