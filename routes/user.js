
const express=require('express')
const router=express.Router()
const passport=require('passport')

const user_controller=require('../controllers/user_controller');
router.get('/profile',user_controller.profile)
router.get('/sign-in',user_controller.signIn)
router.get('/sign-up',user_controller.signUp)
router.post('/create',user_controller.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),user_controller.createSession);
module.exports=router;
