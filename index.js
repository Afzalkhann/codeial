const express=require('express')
const env=require('./config/environment')
const cookieParser=require('cookie-parser')
const app=express()
const port=8000
const expressLayouts=require('express-ejs-layouts')
const db=require('./config/mongoose')
const session=require('express-session')
const passport=require('passport')
const passportLocal=require('./config/passport-local-strategy')
const passportJWT=require('./config/passport-JWT-strategy')
const MongoStore=require('connect-mongo')(session)
const sassMiddleware=require('node-sass-middleware')
const flash=require('connect-flash')
const custMware=require('./config/middleware')
const passportGoogle=require('./config/passport-google-oauth2-strategy')
const chatServer=require('http').Server(app)
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer)
const path=require('path')
chatServer.listen(5000)
console.log('chatserver listning to port 5000')
const Noty = require('noty');
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
    debug:true,
    outputStyle:"extended",
    prefix:'/css'
}))
app.use(express.urlencoded()).use('/uploads',express.static(__dirname+'/uploads'))
app.use(cookieParser())
app.use(express.static(env.asset_path))

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(expressLayouts)
//use express router

app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'codeial',
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log("error in connecting to DB", err)
        }
    )
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(custMware.setFlash)
app.use('/',require('./routes/'))

app.listen(port,function(err){
    if(err){
        console.log('tehre is a error',err)
    }
    console.log("server is up with the port",port)
})