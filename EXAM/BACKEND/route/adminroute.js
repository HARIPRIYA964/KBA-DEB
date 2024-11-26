import {Router} from 'express';
import mongoose from 'mongoose';

const adminRoute=Router()

const BookingSchema=new mongoose.Schema({
    seatno:{type:String,unique:true},
    name:{type:String,unique:true},
    moviename:{type:String,unique:true},
    date:{type:String,unique:true}
})

const Booking=mongoose.model('bookingDetails',BookingSchema)

mongoose.connect('mongodb://localhost:27017/Movie-Booking')

adminRoute.post('/addbooking',async(req,res)=>{
    try{
    const {Seatno,Name,Moviename,Date}=req.body
    const existingBooking = await Booking.findMany({moviename : Moviename });
    if (existingBooking) {
        return res.status(400).json({ message: "Seat already booked" });
    }
    else{
        const newbooking=new Booking({
            seatno:Seatno,
            name:Name,
            moviename:Moviename,
            date:Date
        })
        await newbooking.save();
        res.json({message:"Booking Successfull"})
    }
}
catch(err){
    console.log(err)
}
})

adminRoute.put('/update',async(req,res)=>{
    try{
    const {newSeatno,newName,Moviename,newDate}=req.body
    const result=await Booking.findOne({moviename:Moviename});
    if(!result){
        return res.status(400).json({message:"No booking found"})
    }
    else{
        result.seatno=newSeatno || result.seatno;
        result.name=newName || result.name;
        result.date=newDate || result.date;
    }
    await result.save()
    res.json({result})
}
catch(err){
    console.log(err)
}
})

adminRoute.get('/getbooking',async(req,res)=>{
    const search=await req.query.Moviename
    const result=await Booking.findOne({moviename:search})
    if(!result){
        return res.status(400).json({message:"No booking found"})
    }
    else{
        res.status(201).json(result)
    }
})

adminRoute.delete('/delete',async(req,res)=>{
    const search=await req.query.Moviename
    const result=await Booking.deleteOne({moviename:search})
    if(!result){
        return res.status(400).json({message:"No booking found"})
    }
    else{
        res.status(201).json({message:"Booking deleted successfully"})
    }
})

adminRoute.get('/viewallbooking',async(req,res)=>{
    const result=await Booking.find()
    if(!result){
        return res.status(400).json({message:"No booking found"})
    }
    else{
        res.status(201).json(result)
    }
})

export {adminRoute}