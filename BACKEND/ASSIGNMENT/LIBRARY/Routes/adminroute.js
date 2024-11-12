import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authenticate } from "../MiddleWare/auth.js";

dotenv.config();
const adminroute = Router()
const secretkey = process.env.Secretkey

const userSchema = new mongoose.Schema({
    fname : String,
    email : String,
    username : {type:String,unique:true},
    password : String,
    role : String

})
const User = mongoose.model("userdetails",userSchema)

const librarySchema = new mongoose.Schema({
    bookName:String,
    bookId:{type:String,unique:true},
    bookType:String,
    description:String,
    price:String
})
const Library = mongoose.model("Bookdetails",librarySchema)

mongoose.connect("mongodb://localhost:27017/LIBRARY")


adminroute.post('/signup',async(req,res)=>{
    try{
        const {Fname,Email,Username,Password,Role}=req.body;   
        if (!Username) {
            return res.status(400).json({ message: "Username is required" });
          }
          const existinguser=await User.findOne({username:Username})
    if(existinguser){
        res.status(400).json({message:"User Already exist"})
    }else{
        const newp=await bcrypt.hash(Password,10)
        const newUser=new User({
            fname:Fname,
            email:Email,
            username:Username,
            password:newp,
            role:Role
        })
        await newUser.save();
        res.status(201).json({message:"account created successfully"})
    }
    }
    catch (error) {
        res.status(500).json(error) 
        console.log(error)  
    }
})

adminroute.post('/login',async(req,res)=>{
    try {
     const {Username,Password}=req.body
 const result=await User.findOne({username:Username})
     console.log(result)
 
     if(!result){ 
         res.status(404).json({message:"User not found"})
     }else{
         const valid =await bcrypt.compare(Password,result.password)
         console.log(valid)
 
         if(valid){
             const token =jwt.sign({Username:result.username,Role:result.role},secretkey,{expiresIn:"1 h"})
             res.cookie('Token',token,{ httpOnly:true })
             res.status(200).json({token})
             console.log(token)
         }
     }
    } catch (error) {
     res.status(500).json({ message: 'Internal Server Error' });
 
     
    }
 });

adminroute.post('/addbook',authenticate,async(req,res)=>{
    if(req.Role == 'Admin'){
        const{
            BookName,
            BookId,
            BookType,
            Description,
            Price } = req.body
            try{
                const existingBook = await Library.findOne({bookId:BookId})
                if(existingBook){
                    res.status(400).json({message: 'Book Already present!'})
                }
                else{
                    const newBook = new Library({
                        bookName : BookName,
                        bookId : BookId,
                        bookType : BookType,
                        description : Description,
                        price : parseInt(Price)
                    });
                    await newBook.save()
                    return res.status(200).json({message: "Book added Successfully!"})
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

adminroute.get('/getbook',async(req,res)=>{
    try{
        const search = req.query.Id;
        const result = await Library.findOne({BookId:search});
        if(result){
            res.status(200).json({message: result})
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
 
adminroute.put('/updatebook',authenticate,async(req,res)=>{
    try{
        const{
            newBookName,
            BookId,
            newBookType,
            newDescription,
            newPrice
        }=req.body
        const existingBook = await Library.findOne({bookId:BookId})
        if(!existingBook){
            return res.status(404).json({message: "admin update book details",existingBook})
        }
        if(req.Role === 'Admin'){
            console.log('Admin login Successfully!')

            existingBook.bookName = newBookName || existingBook.bookName;
            existingBook.bookType = newBookType || existingBook.bookType;
            existingBook.description = newDescription || existingBook.description;
            existingBook.price = newPrice || existingBook.price;

            await existingBook.save()
            res.status(200).json({message: "Book Update successfully !",existingBook});
        }
        else{
            console.log("inavlid credential")
        }

    }
    catch(error){
        
    }
})

adminroute.delete('/deletebook',authenticate,async(req,res)=>{

    const result = req.query.BookId
    const del = await Library.deleteOne({bookId:result})
    if(result){
        res.status(200).json({message: "The book is removed!"})
        console.log("The book is removed!")
    }
  
})

adminroute.get('/logout', (req, res) => {
    res.clearCookie('Token'); // 'authToken' is the cookie name
    res.status(200).json({ message: 'Logout successful' });
})


export {adminroute}