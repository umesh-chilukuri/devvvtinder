
const express= require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app=express();
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
      // Validate the request data
      validateSignUpData(req);
  
      // Destructure the input fields
      const { firstName, lastName, emailId, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ emailId });
      if (existingUser) {
        return res.status(400).send("User with this email already exists");
      }
  
      // Encrypt the password using bcrypt
      const passwordHash = await bcrypt.hash(password, 10);
      console.log("Hashed Password:", passwordHash); // Debug log
  
      // Create a new user instance
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      // Save the user to the database
      await user.save();
  
      // Send success response
      res.status(201).send("User added successfully!");
    } catch (err) {
      console.error("Signup Error:", err.message); // Log the error
      res.status(400).send("Error: " + err.message);
    }
  });


 
  
  app.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      // Find the user by emailId
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("User does not exist");
      }
  
      console.log("Stored Password Hash:", user.password);
      console.log("Entered Password:", password);
  
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password Valid:", isPasswordValid);
  
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
  
      // Create a JWT token with user ID as payload
      const token=await user.getJWT();
  
      // Set the token in a cookie
      res.cookie("umeshtoken", token, { httpOnly: true, secure: true });
  
      // Send success response
      res.send("Login successfully happened");
    } catch (err) {
      console.error("Login Error:", err.message); // Log the error for debugging
      res.status(400).send("Error: " + err.message);
    }
  });
  


//profile api
app.get("/profile",userAuth,async (req,res)=>{
   
       
        console.log("hello "+req.user.firstName);
        res.send("hello "+req.user.firstName);
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




