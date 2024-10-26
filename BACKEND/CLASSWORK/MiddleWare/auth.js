import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretkey = process.env.Secretkey;

const authenticate =(req,res,next)=>{
   const cookies = req.headers.cookie;
    // req.cookie
    if (!cookies) {
        console.log('No cookies found');
    }
    console.log(cookies);
    const cookie =cookies.split(';');
    for (let cooki of cookie){
        const [name,token] = cooki.trim().split('=');
        if (name == 'try'){
           const verified = jwt.verify(token,secretkey)
           console.log(verified);
           console.log(verified.UserName);
           req.UserName = verified.UserName;
           req.Role = verified.Role;
           console.log(req.Role)
           break;

        }
        

    }
    next();
}
export {authenticate}