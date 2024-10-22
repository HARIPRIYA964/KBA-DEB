import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {authenticate } from '../MiddleWare/auth.js';

const adminroute =  Router();
const user = new Map()
const secretkey = "hii";

adminroute.get('/',(req,res)=>{       
res.send("Hello World")

})


adminroute.post('/signup',async(req,res)=>{ 
    try{

    const data = req.body;
    const { FirstName,
        LastName,
        UserName,
        Password,
        Role} = data;
       
        if(user.has(UserName)){
           res.status(400).json({message: "already Exist"})
        }   
        else{
        const newP = await bcrypt.hash(Password,10); 
      

        user.set(UserName,{
            FirstName,LastName,Password:newP,Role
        });
       
        
        console.log(user.get(UserName));
        res.status(201).json({message : "Data saved!"});
        }    
    }
    catch(error){
        res.status(500).json(error);
    }
    
});

adminroute.post('/login',async(req,res)=>{
    
    const {UserName,Password} = req.body;
    const result = user.get(UserName)
   
    if(!result){
        res.status(400).json({message:"User not found"})

    }
    else{
        const valid = await bcrypt.compare(Password,result.Password)
        console.log(valid);
        if(valid){
           const token = jwt.sign({UserName : UserName, Role : result.Role},secretkey,{expiresIn : '1h'})
           res.cookie('authToken',token,{
            httpOnly : true
             });
             console.log(token);
             res.status(201).json({token})
           
        }
        
    }

});

adminroute.post('/addcourse', authenticate ,(req,res)=>{
    res.status(201).json({message: 'Hello'})
    console.log(req.UserName);
    console.log(req.Role);
    
    const add = new Map()
    if(req.Role == 'admin'){
        console.log('Admin login success!')
        try{
            const addcourse = req.body
            const {
                CourseName,
                CourseId,
                CourseType,
                Description,
                Price } = addcourse
        
                // console.log({CourseName,CourseId,CourseType,Description,Price});
                if(add.has(CourseId)){
                    res.status(400).json({message: 'Already Exists!'})
                }
                else{
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

adminroute.post('/update',authenticate ,(req,res)=>{
    if(req.Role == 'admin'){
        console.log('Admin login success!')
        try{
            const updateCourse = req.body
            const {
                newCourseName,
                CourseId,
                newCourseType,
                newDescription,
                newPrice} = updateCourse

                // console.log(CourseId,{newCourseName,newCourseType,newDescription,newPrice})
                if(updateCourse.has(CourseId)){
                    const update = updateCourse.get(CourseId);
                    update.CourseName = newCourseName || update.CourseName;
                    update.CourseType = newCourseType || update.CourseType;
                    update.Description = newDescription || update.Description;
                    update.Price = newPrice || update.Price;
                    update.set(CourseId,update);
                    console.log(`Update Course : ${update}`)
                }
                else{
                    console.log("not founded")
                }

        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log("invalid credential")
    }
    

})





export {adminroute};