import express,{json} from 'express'; 
import { adminroute } from '../../ASSIGNMENT/LIBARARYMANAGEMENT/Routes/adminroutes.js'

const app = express();
app.use(json())
app.use('/',adminroute)

const port = 8000;


app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})