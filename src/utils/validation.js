
const validator=require("validator");


const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;

    if(!firstName||!lastName||""){
        throw new Error("name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("emsil is not valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password is not valid");
    }
}


module.exports={
    validateSignUpData,
}