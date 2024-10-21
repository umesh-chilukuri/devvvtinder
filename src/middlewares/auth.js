const jwt=require('jsonwebtoken');
const User = require('../models/user');



const userAuth= async(req,res,next)=>{

    try{
    //read token from cookies
     const {umeshtoken}=req.cookies;
     if(!umeshtoken){
            throw new Error("token is not valid")
        }

const  decodeObj=await jwt.verify(umeshtoken,"DEVTINDER@770")
const { _id }=decodeObj;
const user=await User.findById(_id);
if(!user){
    throw new Error("user not found");
}

////now we need to send the user data to the api which ever dooing that
////that can be done by attaching the the user data to the request
req.user=user;

next();
}
catch(err){
    res.status(400).send("error occured due to  "+err.message);
}
}
;


module.exports={userAuth,};