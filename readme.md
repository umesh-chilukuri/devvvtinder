
//first you need to get the express  from downloads or system 

const express= require('express');
//now you need to grt the instance of this 
const app=express();

app.use("/test",(req,res)=>{
    res.send("helllo from the test");
});/////this will work only for route test
///////////////// these are the request handlers

app.use((req,res)=>{
    res.send("helllo from the server");
})//////by default whatever request we get we get same the above response as result
/////default request should  be at last


app.listen(3000,()=>{
    console.log("server started and listening to the user requests at port 3000 ");
});