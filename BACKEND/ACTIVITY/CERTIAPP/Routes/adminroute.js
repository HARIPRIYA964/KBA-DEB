import { Router } from "express";
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../MiddleWare/auth.js";

const adminroute = Router();
const user = new Map();
const secretkey = 'hii';

 
 
adminroute.post('/signup',async(req,res)=>{
    try{
        const data = req.body;
        const {
            FirstName,
            LastName,
            UserName,
            Password,
            Role} = data

            if (user.has(UserName)){
                res.status(400).json({message : "already exists"})
            }
            else{
                const newP = await bcrypt.hash(Password,10)
                user.set(UserName,{FirstName,LastName,Password:newP,Role});
            }
            console.log(user.get(UserName));
            res.status(201).json({message: "Data Saved!"})
    }
    catch(error){
        res.status(500).json(error);
    }
});


adminroute.post('/login', async(req,res)=>{
    const {UserName, Password} = req.body;
    const result = user.get(UserName);
   
    
   
    if(!result){
        res.status(400).json({message: "User not found!"})
    }
    else{
        const valid =await bcrypt.compare(Password,result.Password)
        console.log(valid);
        if(valid){
            const token = jwt.sign({UserName : UserName, Role: result.Role}, secretkey, {expiresIn : '1h'})
            res.cookie('authToken', token,{
                httpOnly : true
            });
            console.log(token);
            res.status(201).json({token})
          
            
        }else{
            return res.status(401).json({ message: "Invalid credentials!" });
        }
    }
});
const certificate = new Map()
adminroute.post('/issueCertificate',authenticate,(req,res)=>{
    if(req.Role == 'Admin'){
        console.log('Admin login Successfully!')

        try{
            const course = req.body
           const {
                selectCourse,
                certificateId,
                candidateName,
                selectGrade,
                issueDate
             } = course
             if(certificate.has(certificateId)){
                res.status(400).json({message: "Already Exists!"})
             }
             else{
                certificate.set(certificateId,{selectCourse,candidateName,selectGrade,issueDate})
                console.log(certificate.get(certificateId))
                
             }
        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log('Invalid credential')
    }
});

adminroute.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.send('logout successfully');
    console.log('logout successfully');
})




export {adminroute}
