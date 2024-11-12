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

//create course schema
const CourseSchema = new mongoose.Schema({
    courseName : String,
    courseId : {type : String,unique:true},
    courseType : String,
    description : String,
    price :String

})
//create course model
const Course = mongoose.model('courses',CourseSchema)

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

adminroute.post('/addcourse', authenticate ,async(req,res)=>{
    // res.status(201).json({message: 'Hello'})
    console.log(req.UserName);
    console.log(req.Role);
    
    
    if(req.Role == 'admin'){
        console.log('Admin login success!')
        const {
            CourseName,
            CourseId,
            CourseType,
            Description,
            Price
        } = req.body
        console.log(req.body)
        try{
            const existingCourse = await Course.findOne({courseId : CourseId })
            
            if(existingCourse){
                res.status(400).json({message: 'Course Already present!'})
            }
            else{
                const newCourse= new Course({
                    courseName : CourseName,
                    courseId : CourseId,
                    courseType : CourseType,
                    description : Description,
                    price :parseInt(Price)
                });
                await newCourse.save()
                return res.status(200).json({message:"Coures addedd successfullly"})
            }
        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log('You dont have permission')
    }    
});


//using params
adminroute.get('/getcourse',async(req,res)=>{
    try {
        //
        const search = req.query.Id;
        const result = await Course.findOne({courseId:search});
        if(result){
            res.status(200).json({message:result})
        }else{
            res.status(401).json("id not exist")
            console.log("id not exist")
        }
    }
    catch (error) {
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
 


adminroute.put('/update',authenticate ,async(req,res)=>{
    
        try{
           
            const {
                newCourseName,
                CourseId,
                newCourseType,
                newDescription,
                newPrice} = req.body
                const existingCourse = await Course.findOne({courseId : CourseId})

                // console.log(CourseId,{newCourseName,newCourseType,newDescription,newPrice})
                if(!existingCourse){
                    return res.status(404).json({message: "admin update course",existingCourse})
                }
                if(req.Role === 'admin'){
                    console.log('Admin login success!')
                    
                    existingCourse.courseName = newCourseName || existingCourse.courseName;
                    existingCourse.courseType = newCourseType || existingCourse.courseType;
                    existingCourse.description = newDescription || existingCourse.description;
                    existingCourse.price = newPrice || existingCourse.price;
                

                    await existingCourse.save()
                
                    res.status(200).json({message: "Course Update successfully",existingCourse});

                }
                else{
                    console.log("invalid credential")
                }
                
              

        }
        catch(error){
            res.status(500).json(error);
        }    

});

adminroute.delete('/deleteCourse',authenticate,async(req,res)=>{
    
        
    const result = req.query.Id
    const del = await Course.deleteOne({courseId : result})
    if(result){
        res.status(200).json({message: "The Course is removed!"})
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
        const viewallcourse = await Course.find()       

        if(viewallcourse){         
            
        res.send(Array.from(viewallcourse.entries()))
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