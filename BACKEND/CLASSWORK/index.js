import express,{json} from 'express'; //express file is  importing 
import bcrypt from 'bcrypt';


const app = express();
app.use(json())

const port = 3000;
const user = new Map()
//listen cheyyumpol 2 para kodukkanam 
//1.port a(ath port aanu work akunnath)
//2.ethenkillum oru function here using arrow function
//app -instance of with api
app.get('/',(req,res)=>{       //req -request
                              // res -response
    res.send("Hello World")

})


app.post('/signup',async(req,res)=>{ //for line 34 and b/w async and await
    try{
    console.log("Hii");
    const data = req.body;
    // console.log(data.FirstName)
    //const fname =data.FirstName
    const { FirstName,
        LastName,
        UserName,
        Password,
        Role} = data;
        console.log(FirstName);
        if(user.has(UserName)){
           res.status(400).json({message: "already Exist"})
        }   
        else{
            //await -bcrypt need to wait for the above statement execute . after the prit the password as bcrypt line21
        const newP = await bcrypt.hash(Password,10);  //used for security of password they show the exact  password
        console.log(newP);

        user.set(UserName,{
            FirstName,LastName,Password:newP,Role
        });
       
        
        console.log(user.get(UserName));
       // res.status(201).send("Data saved!");   //status code setting
       res.status(201).json({message : "Data saved!"});
        }    
    }
    catch(error){
        
    }
    
})

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`)
})