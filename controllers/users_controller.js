const User = require('../models/user');
const path=require('path')
const fs=require('fs')

module.exports.profile = async function(req, res){
    try{
        let user= await User.findById(req.params.id)
        return res.render('user_profile', {
                title: 'User Profile',
                profile_user:user
            })
    }
    catch(err){
        console.log('error',err)
    }
   
}
module.exports.update= async function(req,res){
    try{
        if(req.user.id==req.params.id){
            let user=await User.findByIdAndUpdate(req.params.id,req.body)
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('multer',err)}
                user.name=req.body.name
                user.email=req.body.email
                if(req.file){
                    if(user.avatar){
                        fs.unlink(path.join(__dirname,'..',user.avatar),function(err){
                            if(err){
                                req.flash('error',err)
                                return res.redirect('/')
                            }
                        })
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename
                }
                user.save()
                return res.redirect('back')

            })
           
           
        }
        else{
            req.flash('error','unauthorized')
            return res.status(401).send('Unauthorized')
        }
    }
    catch(err){
        req.flash('error',err)
        console.log('error',err)
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create =async function(req, res){
    try{
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    let user=await User.findOne({email: req.body.email})
        
        if (!user){
        let user=await User.create(req.body)
        return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('errpr')
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','logged In successfully')
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log("error")
        }
    req.flash('success','logged out successfully')
    return res.redirect('/');
    })
}