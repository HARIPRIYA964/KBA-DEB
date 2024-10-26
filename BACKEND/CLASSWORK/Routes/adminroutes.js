import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {authenticate } from '../MiddleWare/auth.js';
import dotenv from 'dotenv';

dotenv.config()
const adminroute =  Router();
const user = new Map()
const secretkey = process.env.Secretkey;

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
    try{
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

const add = new Map()

adminroute.post('/addcourse', authenticate ,(req,res)=>{
    res.status(201).json({message: 'Hello'})
    console.log(req.UserName);
    console.log(req.Role);
    
    
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


//using params
// adminroute.get('/getCourse/:Id',(req,res)=>{
//     console.log(req.params.Id);
//     let result = req.params.Id
//     if(add.has(result)){
//         console.log(add.get(result));
        
//     }
//  })
 
 //using Query
 adminroute.get('/getcourse', (req,res)=>{
    // console.log(req.query.CourseId);
    let result = req.query.CourseId
    if(add.has(result)){
        console.log(add.get(result))
    }
    
 })
 


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

adminroute.get('/deleteCourse',(req,res)=>{
    if(req.Role == 'admin'){
        console.log('Admin login success!')
        
    let result = req.query.CourseId
    if(add.has(result)){
        // console.log(add.get(result))
        add.delete(result)
        console.log("The result is removed!");
        }
    else{
        console.log("Error: no items foundes!");
        
    }
    }


});


adminroute.get('/viewUser',authenticate,(req,res)=>{
    try{
        const user = req.Role;
        res.json({user});
    }
    catch{
        res.status(404).json({message: 'user not authorized'})
    }
})



adminroute.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.send('logout successfully');
    console.log('logout successfully');
})


export {adminroute};