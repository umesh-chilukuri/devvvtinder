const mongoose=require("mongoose");

const connectDB= async ()=>{

await mongoose.connect
("mongodb+srv://umeshchandra:F2HsedfgeXrerKjY@cluster0.jm51x.mongodb.net/devtinder");

}

module.exports=connectDB;