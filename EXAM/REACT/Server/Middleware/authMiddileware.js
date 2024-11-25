import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const secretkey = process.env.Secretkey;

function vertifyToken(req,res,next) {
    const token = req.cookies.token
    if(!token) return res.status(401).json({msg:"Access denied. No token"})
        try {
    const decoded = jwt.verify(token,secretkey)
    req.userType = decoded
    next()
    }
    catch(err) {
        res.status(403).json({msg:"Invalid token"})
    }
}
export default vertifyToken;  //export the function to use in other files