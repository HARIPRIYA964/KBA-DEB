adminrouter.post('/issuecerti',authenticate,async(req,res)=>{
    try {
        const {Course,Certiid,Name,Grade,Issuedt}=req.body

        if(req.Role == 'admin'){
            console.log("Admin Logged in Successful")

            const existingcerti=await Certi.findOne({certiid:Certiid})
            if(existingcerti){
                console.log("Certificate Already issued!!")
                return res.status(400).json({message:"Certificate issued already"})
            }
            //creating new certi
            const  newCerti=new Certi({
                course:Course,
                certiid:Certiid,
                name:Name,
                grade:Grade,
                issuedt:Issuedt
            })
            
                await newCerti.save();
                console.log("Certificate Issued Successfully")
                return res.status(200).json({message:"Certificate Issued Successfully"})
         }else {
            console.log("You dont have Permission")
            return res.status(400).json({message:"You dont have Permission"})                
            }       
         } catch (error) {
            console.error(error.message);
            res.status(500).json({message: "Internal Server Error" }) 
         }   
})
adminrouter.get('/getcerti',async (req, res) => {
    // console.log(req.query.Courseid)  
    try {
        const search = req.query.CertiId
        console.log(search);

        const result= await Certi.findOne({certiid:search})
        if(result){
            res.status(200).send(result)
        }else{
            res.status(400).json({message:"No Issued Certificate!"})
        }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' })     
    }
  })


adminrouter.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.send('logout successfully');
    console.log('logout successfully');
})