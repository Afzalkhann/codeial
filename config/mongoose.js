const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/codeial_devlopment');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongo db"))


db.once('open',function(){
    console.log("mongo db is connected")
})

module.exports=db