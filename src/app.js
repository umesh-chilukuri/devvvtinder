
//first you need to get the express  from downloads or system 

const express= require('express');
//now you need to grt the instance of this 
const app=express();

/*
app.get("/user",(req,res)=>{
    console.log("data has been sended");
    res.send("have you get the data");

})
    */


//for sending multiple responses
/*
app.post("/user",(req,res)=>{
    /////lets assume the data has been sended to db now you need to send response that data succesfully inserted
    console.log("data has been sended");
    res.send(" data succesfully inserted");
    
},
(req,res)=>{
    console.log("data has been sended");
    res.send(" this is second response");
    
})
    */
app.use("/user",(req,res,next)=>{
    /////lets assume the data has been sended to db now you need to send response that data succesfully inserted
    console.log("data has been sended");
    res.send(" data succesfully inserted");
    next();//by this function it goes to next call back function
    /////// if you not written next()  then next requesthandler will not get printed
    
},
(req,res)=>{
    console.log("data has been sended");
    res.send(" this is second response");
    
})///only one response canbe send  in above second response  will not get printed and throw a error


app.use("/test/:userid",(req,res)=>{
    console.log(req.params);
    res.send("helllo from the test");
});/////this will work only for route test
////////    /test/anything this request handler will be hadled
///////////////// these are the request handlers

app.use((req,res)=>{
    res.send("helllo from the server");
})//////by default whatever request we get we get same the above response as result
/////default request should  be at last


app.listen(3000,()=>{
    console.log("server started and listening to the user requests at port 3000 ");
});