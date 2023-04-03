const express=require('express')
const cookieParser=require('cookie-parser')
const app=express()
const port=8000
const expressLayouts=require('express-ejs-layouts')
const db=require('./config/mongoose')
const passport=require('passport')
const passportLocal=require('./config/passport-local-strat')
const session=require('express-session')
app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.static('./assets'))
app.use('/',require('./routes/'))

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(session({
    name:'codeial',
    secret:'somthing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}))
app.use(passport.initialize());
app.use(passport.session());

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