import express, { json } from 'express';
import { adminroute } from '../CERTIAPP/Routes/adminroute.js';



const app = express();
app.use(json())
app.use('/', adminroute)
const port = 8001;

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})