import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {authenticate } from '../MiddleWare/auth.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config()
const adminroute =  Router();
// const user = new Map()
const secretkey = process.env.Secretkey;
//collection file decleration
//Define User Schema
const userSchema = new mongoose.Schema(
    {
    firstName:String,
    lastName:String,
    userName:{type:String,unique:true},
    password:String,
    role:String
})
//create Model
const User = mongoose.model('Userdetails',userSchema);

mongoose.connect('mongodb://localhost:27017/KBA-Courses')

adminroute.get('/',(req,res)=>{       
res.send("Hello World")


})


adminroute.post('/signup',async(req,res)=>{ 
    try{

  
    const { FirstName,
        LastName,
        UserName,
        Password,
        Role} = req.body;
        const newPassword =await bcrypt.hash(Password,10)
        console.log(newPassword);

        const existingUser = await User.findOne({userName : UserName})
        if(existingUser){
           res.status(400).json({message: "already Exist"})
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

adminroute.post('/login',async(req,res)=>{
    try{
    const {UserName,Password} = req.body;
    const result = await User.findOne({userName:UserName})
    console.log(result);
   
    if(!result){
        res.status(400).json({message:"User not found"})

    }
    else{
        console.log(Password)
        console.log(result.password);
        const valid = await bcrypt.compare(Password,result.password)
        console.log(valid);
        if(valid){
           const token = jwt.sign({UserName : UserName, Role : result.role},secretkey,{expiresIn : '1h'})
           res.cookie('try',token,{ httpOnly : true  });
             console.log("login");
             res.status(201).json({token})
           
        }
        
    }
}
catch(error)
{
    console.log('error')
}
});

// const add = new Map()

adminroute.post('/addcourse', authenticate ,(req,res)=>{
    // res.status(201).json({message: 'Hello'})
    console.log(req.UserName);
    console.log(req.Role);
    
    
    if(req.Role == 'admin'){
        console.log('Admin login success!')
        try{
            const data = req.body
            const {
                CourseName,
                CourseId,
                CourseType,
                Description,
                Price } = data
        
                // console.log({CourseName,CourseId,CourseType,Description,Price});
                if(add.has(CourseId)){
                    res.status(400).json({message: 'Already Exists!'})
                }
                else{
                    res.status(201).json({message: 'Added successfully'})
                    add.set(CourseId,{CourseName,CourseType,Description,Price});
                    console.log(add.get(CourseId));
                }
        
         
            }
            catch(error){
                res.status(500).json(error);
            }
        }
        else{
            console.log('Invalid credentials!')
        }    
});


//using params
adminroute.get('/getCourse/:Id',(req,res)=>{

 console.log(req.params.Id);
    let result = req.params.Id
try {
    
    if(add.has(result)){
        console.log(add.get(result));
    res.status(200).json({message:"success"})
    }else{
        res.status(401).json("id not exist")
        console.log("id not exist")
    }

} catch (error) {
    res.status(500).json(error)
}


})
        
    

 
 //using Query
//  adminroute.get('/getcourse/:id', (req,res)=>{
//     // console.log(req.query.CourseId);
// 
//     let result = req.query.CourseName
//     if(add.has(result)){
//         console.log(add.get(result))
//     }
    
//  })
 


adminroute.put('/update',authenticate ,(req,res)=>{
    if(req.Role == 'admin'){
        console.log('Admin login success!')
        try{
           
            const {
                newCourseName,
                CourseId,
                newCourseType,
                newDescription,
                newPrice} = req.body

                // console.log(CourseId,{newCourseName,newCourseType,newDescription,newPrice})
                if(add.has(CourseId)){
                    const update = add.get(CourseId);
                    update.CourseName = newCourseName || update.CourseName;
                    update.CourseType = newCourseType || update.CourseType;
                    update.Description = newDescription || update.Description;
                    update.Price = newPrice || update.Price;
                    add.set(CourseId,update);
                    console.log(add.get(CourseId));
                    res.status(200).json({message: "Course Update successfully"})

                }
              

        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log("invalid credential")
    }
    

});

adminroute.delete('/deleteCourse',authenticate,(req,res)=>{
    
        
    let result = req.query.CourseId
    if(add.has(result)){
        console.log(add.delete(result))
        add.delete(result)
        console.log("The Course is removed!");
        }


});


adminroute.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.Role;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

adminroute.get('/viewCourse', async(req,res)=>{
    try{
        console.log(add.size);

        if(add.size!=0){
           
            
        res.send(Array.from(add.entries()))
    }
else{
    res.status(404).json({message:'Not Found'});
}}
    catch{
        res.status(404).json({message:"Internal error"})
    }
})


adminroute.get('/logout', (req, res) => {
    res.clearCookie('authToken'); // 'authToken' is the cookie name
    res.status(200).json({ message: 'Logout successful' });
})


export {adminroute};