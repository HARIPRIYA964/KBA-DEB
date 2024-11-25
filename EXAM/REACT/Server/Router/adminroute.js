import Router from 'express'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
// import vertifyToken from '../Middleware/authMiddileware';
import dotenv from 'dotenv'

dotenv.config();
const secretkey = process.env.Secretkey

const adminrouter=Router();

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    email:String,
    password:String,
    userType:String

})
const User = mongoose.model("userDetails",userSchema)


const bookingSchema= new mongoose.Schema({
    roomno:{type:String,unique:true},
    name:String,
    checkindt:String,
    checkoutdt:String
})
const Booking=mongoose.model('Booking-Details',bookingSchema)

mongoose.connect("mongodb://localhost:27017/Hotel_Booking")

adminrouter.post('/signup',async(req,res)=>{
    try{
        const {username,email,password,userType}=req.body
        const newPassword=await bcrypt.hash(password,10)
        const existingUser = await User.findOne({username:username})
        if (existingUser){
            return res.status(400).json({message:"Username already exists"})
        }

        else{
            const newuser = new User({
                username:username,
                email:email,
                password:newPassword,
                userType:userType
            })
            await newuser.save()
            res.status(201).json({message:"User created successfully"})
        }

    }
    catch(err){
        console.log(err)
    }
})
adminrouter.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body
        const existingUser = await User.findOne({username:username})
        if(!existingUser){
            res.status(400).json({message:"Invalid username or password"})
        }
        else{
            const isValidPassword = await bcrypt.compare(password,existingUser.password)
            if(isValidPassword){
                const token = jwt.sign({username:existingUser.username,userType:existingUser.userType},secretkey,{expiresIn:'1h'})
                res.cookie('Token',token,{
                    httpOnly:true,
                })
                res.status(200).json({message:"Login Successfull"})
            }
            else{
                res.status(400).json({message:"Invalid username or password"})
            }
        }
    }
    catch(error){
        res.status(500).json(error)
    }

})


adminrouter.post('/addbooking',async(req,res)=>{
    try {
        if (req.userType == "admin") {
            const {roomno,name,checkindt,checkoutdt}=req.body
        console.log(name)
        const result= await Booking.findOne({roomno:roomno})
        if(result){
            return res.status(400).json({message:"This room is Booked,try another one!!"})
        }else{
            const newBooking=new Booking({
                roomno:roomno,
                name:name,
                checkindt:checkindt,
                checkoutdt:checkoutdt
            })
            await newBooking.save();
            return res.status(200).json({message:"Booking was Successfull"})
        }
    } 
    } catch (error) {
        console.log("Internal server Error")
        return res.status(500).json({message:"Internal server error"})
    }
})
        
       

adminrouter.get('/getbooking',async(req,res)=>{
    try {
        const search= req.query.checkindt
        const result=await Booking.findOne({checkindt:search})
        if(!result){
            res.status(400).json({message:"No booking in that day"})
        }else{
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Internal server Error")
        return res.status(500).json({message:"Internal server error"})  
    }
})


export{adminrouter}
    









