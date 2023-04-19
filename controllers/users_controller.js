const User = require('../models/user');


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
            return res.redirect('back')
           
        }
        else{
            return res.status(401).send('Unauthorized')
        }
    }
    catch(err){
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
    req.flash('success','logged in successfully')
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