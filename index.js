const express=require('express')
const app=express()
const port=8000
const expressLayouts=require('express-ejs-layouts')


app.use(express.static('./assets'))
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(expressLayouts)
//use express router
app.use("/",require("./routes"));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('tehre is a error',err)
    }
    console.log("server is up with the port",port)
})