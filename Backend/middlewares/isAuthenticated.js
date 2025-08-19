import jwt from "jsonwebtoken";

const isAuthenticated = async(req,res,next) =>{
    try {
        console.log(req.cookies);
    const token=req.cookies.token;
    console.log("Token received:", token);
if(!token){
     return res.status(200).json({
                message:"User not Authenticated",
                 success:false
            });
}
const decode = await jwt.verify(token,process.env.SECRET_KEY);
console.log("Decoded token:", decode);
if(!decode){
       return res.status(401).json({
                message:"Invalid Token",
                 success:false
            });
}
req.id=decode.userId; // Assuming the decoded token contains userId
console.log("Decoded user ID:", req.id);
next();
    } catch (error) {
        console.log(error);
    }

}

export default isAuthenticated;
