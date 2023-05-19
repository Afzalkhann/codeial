const passport=require('passport')
const googleStrategy=require('passport-google-oauth').OAuth2Strategy
const crypto=require('crypto')
const User=require('../models/user')

passport.use(new googleStrategy({
        clientID:'156014284450-c2sd3kt9kvdp5tf74lh3mqnbq6b1pn7r.apps.googleusercontent.com',
        clientSecret:'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',
        callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google-pass',err);return}
            if(user){
                return done(null,user)
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0],
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('error in google-pass',err);return};
                    return done(null,user)
                }
                
                
                )
            }
        })
    }

))