const User=require('../models/user')
module.exports.profile=function(req,res){
    return res.render('userS',{
        title:'User'
    })
}
//render the sign up page
module.exports.signUp=function(req,res){
    res.render('user_sign_up',{
        title:'Codeial | User Sign up'
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    res.render('user_sign_in',{
        title:'Codeial | User Sign in'
    })
}
//get the data from sign up
module.exports.create=function(req,res){
    console.log(req.body)
    if(req.body.password!=req.body.conPassword){
        return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user', err);
            return
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating a user')
                    return
                }
                return res.redirect('/user/sign-in')

            })
        }
        else{
            return res.redirect('back')
        }
    })

}

module.exports.createSession=function(req,res){
    return res.redirect('/')
}