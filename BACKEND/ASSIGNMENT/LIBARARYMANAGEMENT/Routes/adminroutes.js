import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from '../MiddleWare/auth.js';
import dotenv from 'dotenv';

dotenv.config()
const adminroute = Router();
const user = new Map()
const secretkey = process.env.Secretkey;

adminroute.post('/signup',async(req,res)=>{
    try{
        const data = req.body;
        const {
            FirstName,
            Email,
            Password,
            Role } = data

            if(user.has(Email)){
                res.status(400).json({message: "already exists"})
            }
            else{
                const newP = await bcrypt.hash(Password,10)
                user.set(Email,{FirstName,Password:newP,Role});
            }
            console.log(user.get(Email));
            res.status(201).json({message: "Data saved!"})
        }
        catch(error){
            res.status(500).json(error);

        }
    
});

adminroute.post('/login', async(req,res)=>{
    const {Email, Password} = req.body;
    const result = user.get(Email)

    if(!result){
        res.status(400).json({message: "User Not found!"})
    }
    else{
        const valid =await bcrypt.compare(Password,result.Password)
        console.log(valid);
        if(valid){
            const token =  jwt.sign({Email:Email, Role: result.Role},secretkey,{expiresIn: '1h'})
            res.cookie('Library',token,{
                httpOnly : true
            });
            console.log(token);
            res.status(201).json({token})
        }
    }
});

//Create Add Book
 const add = new Map()
 adminroute.post('/addbook',authenticate,(req,res)=>{
    console.log(req.UserName);
    console.log(req.Role)
    if(req.Role =='Admin'){
        console.log('Admin Login success')
        try{
        const {
            BookName,
            BookId,
            BookType,
            Description,
            Price
        }=req.body
        if (add.has(BookId)){
            res.status(400).json({message: 'Already Exists!'})
        }
        else{
            res.status(201).json({message: "Added successfully"})
            add.set(BookId,{BookName,BookType,Description,Price});
            console.log(add.get(BookId));
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

 //Update Book
 //............................................................
 adminroute.put('/updatebook',authenticate,(req,res)=>{
    if(req.Role == 'Admin'){
        try{
            const{
                newBookName,
                BookId,
                newBookType,
                newDescription,
                newPrice 
            }=req.body
            if(add.has(BookId)){
                const update=add.get(BookId);
                update.BookName = newBookName || update.BookName;
                update.BookType = newBookType || update.BookType;
                update.Description = newDescription || update.Description;
                update.Price = newPrice || update.Price;
                add.set(BookId,update);
                console.log(add.get(BookId));
                res.status(200).json({message: "Book Update successfully"})
            }
        }
        catch(error){
            res.status(500).json(error);
        }
    }
    else{
        console.log("Invalid Credential!")
    }
 });

 adminroute.get('/getbook',async(req,res)=>{
    // console.log(req.query.Courseid) //maping method
    
    try {
        const result=req.query.BookId
        
        if(add.has(result)){
            console.log(add.get(result)) 
            res.status(200).json({message: (add.get(result))  })
        
        } 
        else{
            res.status(400).json({message:'No such Book'})
            // console.log("No such course")
        }
        
    } catch (error) {
        res.status(500).json({message:'Internal server error'})     

    }
    
    
   })

 adminroute.delete('/deletebook',authenticate,(req,res)=>{
    let result = req.query.BookId
    if(add.has(result)){
    console.log(add.delete(result))
    add.delete(result)
    console.log("The Course is removed!");
    }
    
    });


    adminroute.get('/viewuser',authenticate,(req,res)=>{
        try{
        const user=req.Role;
        res.json({user});}
        catch{
            res.status(404).json({message:'user not authorized'});
        }
    })
    

adminroute.get('/logout', authenticate, (req, res) => {
        try {
            if (req.Role) {
                res.clearCookie('Libarary');
                res.status(200).json({ message: "Logout successfull" });
            } else {
                res.status(404).json({ message: "No user found!" })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" })
        }
    
    });

export {adminroute}

