import { Router } from "express";
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../MiddleWare/auth.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()
const adminroute = Router();
// const user = new Map();
const Secretkey = process.env.Secretkey;

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:{type:String,unique:true}
}) 
const User = mongoose.model('Userdetails',userSchema);
const CourseSchema = new mongoose.Schema({
    courseName : String,
    courseId : {type : String,unique:true},
    courseType : String,
    description : String,
    price :String

})
 
adminroute.post('/signup',async(req,res)=>{
    try{
        
        const {
            FirstName,
            LastName,
            UserName,
            Password,
            Role} = req.body
            const newPassword =await bcrypt.hash(Password,10)

            const existingUser = await User.findOne({userName : UserName})

            if (existingUser){
                res.status(400).json({message : "already exists"})
            }
            else{
                const newUser = new User({
                    firstName:FirstName,
                    lastName:LastName,
                    userName:UserName,
                    password:newPassword,
                    role:Role
        
                }); 
            
        await newUser.save();
        res.status(201).json({message : "User registered successfully!"});
        }    
            
  
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
            const token = jwt.sign({UserName : UserName, Role: result.Role}, Secretkey, {expiresIn : '1h'})
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
// const certificate = new Map()
adminroute.post('/issueCertificate',authenticate,(req,res)=>{
    if(req.Role == 'Admin'){
        console.log('Admin login Successfully!')

        try{
            
           const {
                selectCourse,
                certificateId,
                candidateName,
                selectGrade,
                issueDate
             } = req.body
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


adminroute.get('/getCertificate/:certificateId',(req,res)=>{
    console.log(req.params.certificateId);
    let result = req.params.certificateId
    try{
        if(certificate.has(result)){
            console.log(certificate.get(result));
            res.status(200).json({message: "success"})
        }
        else{
            res.status(401).json("id not exist")
            console.log("id not exist")
        }
    }
    catch(error){
        res.status(500).json(error)
    }
})


adminroute.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.send('logout successfully');
    console.log('logout successfully');
})




export {adminroute}
