const express=require("express")
const authRouter=express.Router();
const {validateSignUpData}=require("../utils/validation")
const bcrypt=require("bcrypt");
const User = require('../models/user');





authRouter.post("/signup", async (req, res) => {
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

  authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout",async(req,res)=>{
    //const {umeshtoken}=req.cookies
    res.cookie('umeshtoken',null,{expires:new Date(Date.now())});
    res.send("log out succes fully")
})

module.exports=authRouter;