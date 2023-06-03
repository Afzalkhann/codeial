const mongoose = require('mongoose');
const env=require('../config/environment')
//mongoose.connect(`mongodb://localhost/${env.db}`);
mongoose.connect(`mongodb+srv://khan12:MPAAqGAkaLg4S5pT@cluster0.au0ns60.mongodb.net/${env.db}`, {
    useNewUrlParser: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;