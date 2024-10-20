const { default: mongoose } = require("mongoose");
const validator=require("validator");


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
        lowercase:true,
        minlength:3,


    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String
    },

},{timestamps:true});


const User=mongoose.model("User",userSchema);

module.exports=User;