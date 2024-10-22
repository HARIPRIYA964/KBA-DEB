import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const adminroute = Router();
const user = new Map()
const secretkey = "hii"

adminroute.post('/signup',async(req,res)=>{
    try{
        const data = req.body;
        const {
            FirstName,
            LastName,
            UserName,
            Password,
            Role } = data

            if(user.has(UserName)){
                res.status(400).json({message: "already exists"})
            }
            else{
                const newP = await bcrypt.hash(Password,10)
                user.set(UserName,{FirstName,LastName,Password:newP,Role});
            }
            console.log(user.get(UserName));
            res.status(201).json({message: "Data saved!"})
        }
        catch(error){
            res.status(500).json(error);

        }
    
});

adminroute.post('/login', async(req,res)=>{
    const {UserName, Password} = req.body;
    const result = user.get(UserName)

    if(!result){
        res.status(400).json({message: "User Not found!"})
    }
    else{
        const valid =await bcrypt.compare(Password,result.Password)
        console.log(valid);
        if(valid){
            const token =  jwt.sign({UserName:UserName, Role: result.Role},secretkey,{expiresIn: '1h'})
            res.cookie('authToken',token,{
                httpOnly : true
            });
            console.log(token);
            res.status(201).json({token})
        }
    }
})

export {adminroute}

