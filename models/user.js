const mongoose = require('mongoose');
const multer=require('multer')
const path=require('path')

const AVATAR_PATH=path.join('/uploads/users/avatars')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type:String
    }
    ,
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ]

}, {
    timestamps: true
});
let storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename:function(req,file,cb){
        console.log(file.fieldname)
        cb(null,file.fieldname+'-'+Date.now())
    }
})

userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar')
userSchema.statics.avatarPath=AVATAR_PATH
const User = mongoose.model('User', userSchema);

module.exports = User;