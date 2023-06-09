const passport=require('passport')
const JWTStrategy=require('passport-jwt').Strategy
const ExtractJWT=require('passport-jwt').ExtractJwt
const env=require('./environment')
const user=require('../models/user')

let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:env.jwt_screate
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    user.findByID(jwtPayload._id,function(err,user){
        if(err){console.log('error in finding user'); return}
        if(user){
            return done(null,user)
        }
        else{
            return done(null,false)
        }
    })
}))

module.exports=passport