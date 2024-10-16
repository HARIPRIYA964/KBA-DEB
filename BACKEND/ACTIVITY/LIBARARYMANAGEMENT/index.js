import express from 'express'; //express file is  importing 

const app = express();
const port = 8000;
//listen cheyyumpol 2 para kodukkanam 
//1.port a(ath port aanu work akunnath)
//2.ethenkillum oru function here using arrow function
app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})