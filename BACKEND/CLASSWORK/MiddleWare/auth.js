import jwt from 'jsonwebtoken';

const secretkey = "hii";

const authenticate =(req,res,next)=>{
   const cookies = req.headers.cookie;
    // req.cookie
    console.log(cookies);
    const cookie =cookies.split(';');
    for (let cooki of cookie){
        const [name,token] = cooki.trim().split('=');
        if (name == 'authToken'){
           const verified = jwt.verify(token,secretkey)
           console.log(verified);
           console.log(verified.UserName);
           req.UserName = verified.UserName;
           req.Role = verified.Role;
           break;

        }
        

    }
    next();
}
export {authenticate}