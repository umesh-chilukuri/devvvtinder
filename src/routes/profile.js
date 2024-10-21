const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth")








//profile api
profileRouter.get("/profile",userAuth,async (req,res)=>{
   
       
    console.log("hello "+req.user.firstName);
    res.send("hello "+req.user.firstName);
})







module.exports=profileRouter;