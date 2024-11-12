import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const Secretkey =process.env.Secretkey;

const authenticate = (req,res,next)=>{
    const cookies = req.headers.cookie;
        console.log(cookies);
        if (!cookies) {
            console.log('No cookies found');
        }
    const cookieArray = cookies.split(';');
        for(let cookie of cookieArray){
        const [name,token] = cookie.trim().split('=');
        if(name == 'Library'){           
   
            try {
                const verified = jwt.verify(token,Secretkey)
                 console.log(verified);
                 req.Email = verified.Email;
                 req.Role = verified.Role;
                //  console.log(verified.userName);
                break;

            } catch (error) {
                console.log(error)
            }
            

        }
    }
      next()   
           
    }
    

export {authenticate}