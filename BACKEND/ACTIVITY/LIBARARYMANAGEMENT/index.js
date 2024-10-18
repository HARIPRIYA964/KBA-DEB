import express,{json} from 'express'; 
import bcrypt from 'bcrypt';

const app = express();
app.use(json())

const port = 8000;
const user = new Map()

app.post('/signup',async(req,res)=>{
    const data = req.body;
     const {
        FirstName,
        LastName,
        UserName,
        Password,
        Role} = data;
        if(user.has(UserName)){
            res.status(400).json({messsage:'already exist!'})
        }
        else{
            const newp = await bcrypt.hash(Password,10);
            user.set(UserName,{FirstName,LastName,Password:newp,Role})
            console.log(user.get(UserName));
            res.status(201).json({messsage :'Data saved!'})
        }


        
})


