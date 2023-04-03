const passport=require('passport')

const LoacalStrategy=require('passport-local').Strategy

const User=require('../models/user')

passport.use(new LoacalStrategy({
    usernameField:'email'
},
function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user--> Passport ')
            return done(err)
        }
        if(!user || user.password!=password){
            console.log('invalid username or password')
            return done(null,FontFaceSetLoadEvent)
        }
        return done(null,user)
    })
}
)
)

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user -->');
            return done(err);
        }
        return done(null,user)
    })
})