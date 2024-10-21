
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



order of writhing codes does matter in backend in creating request handlers
order of routes matter


there are diff http methods
by default whatever you write in the url in of get type
you cannot make post request via url
for testing the api browser is not the right choice so we need a software called postman
in postman you create a workspace
then create a blank collection



app.use   or .use method   is applicable to ll the http methods
where as   app.get   or app.post only applicable to that particular methods

"/ab?c"   then here b is optional
"/ab+c"    then there can any number of b    /abbbbbbbbbbbbc
"/ab*c"     means there can be anything between ab and c   "/abumeshc"



explore query params and dynamic params



if we are not sending any response in postman it will go to loop

you can have multiple request handlers
but you need to keep next as next()  function



express handlingrequest function order (  err   request   responese   next)
if you write err then it should in the last

/////////////////////////////////////////////////never ttrust req.body//////////////////////////////////////////




jwt
contains special information
1 header    2.payload   3.verify signature(to validate token)

json web token  pakage    we have sign and verify