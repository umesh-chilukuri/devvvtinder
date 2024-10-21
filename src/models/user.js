const { default: mongoose } = require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken")


const userSchema=mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId: {
        type: String,
        required: [true, "Email is required"],
        unique: true, // Ensure uniqueness
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        },
    },
    password:{
        type:String,
        required:true,
        maxlength: 100


    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String
    },

},{timestamps:true});

userSchema.methods.getJWT=async function (){
    const user=this;
    const token = jwt.sign({ _id: user._id }, "DEVTINDER@770");
      console.log("Generated JWT Token:", token);

      return token;
}
const User=mongoose.model("User",userSchema);

module.exports=User;