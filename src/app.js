
const express= require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app=express();
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt");

app.use(express.json());


app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        //////////////////// now you need to encryt the password//////////////
       const  {firstName,lastName,emailId,password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);
        const user = new User({firstName,lastName,emailId,password:passwordHash}); // Create a new user
        await user.save(); // Save the user to the database
        res.status(201).send("User added successfully!");
    } catch (err) {
            res.status(400).send("nnn"+err.message);
        
    }
});

app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user =await User.findOne({emailId:emailId});
        if(!user) {
            throw new Error("user does not exist");
        }
        console.log(user.password);
        console.log(password);
        const isPasswordValid = await bcrypt.compare(password, user.password,);
         console.log(isPasswordValid);
        if(isPasswordValid){
            res.send("login succesfully happend")
        }else{
            throw new Error("login is unsuccesfull");
        }
    }
    catch(err){
        res.status(400).send("error  "+err.message);
    }
})

//get user by email
app.get("/user",async (req,res)=>{
   const useremail=req.body.emailId;
   console.log(useremail);
   try{
       const user=await User.find({emailId:useremail});
       if (!user || []) {
        return res.status(404).send("User not found, try another email.");
    } 

    res.status(200).send(user);
   }
   catch(err){
       res.status(400).send("something went wrong");
   }
});



//to get all users from feed
app.get("/feed",async (req,res)=>{
    try{
        const user=await User.find({});
        res.send(user);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
 });



//to update the update  use patch method
app.patch("/user", async (req,res)=>{
    id=req.body._id;
    console.log(id);

    const data=req.body;
    try{
        const ALLOWED_UPDATES=["userId","photourl","about","gender","age","skills"];
        const isupdatesAllowed=Objects.keys(data).includes((k)=>
    ALLOWED_UPDATES.includes(k)
    )
    if(!isupdatesAllowed){
        res.status(400).send("updates aare not allowed");
    }
        
        await User.findByIdAndUpdate(id, { 
            firstName: "jason bourne" },{ new: true })
          res.send("updated successsfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

connectDB().then(()=>{
    console.log("databse has succesfully connected");
    app.listen(3000,()=>{
        console.log("server started and listening to the user requests at port 3000 ");
    });
    
})
.catch((err)=>{
    console.log("database has not succesfully connected");
});




