const express=require('express')
const app=express()
const port=8000
//use express router
app.use("/",require("./routes/index"));
app.set('view engine','ejs');
app.use('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('tehre is a error',err)
    }
    console.log("server is up with the port",port)
})