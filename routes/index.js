const express=require('express');

const router=express.Router()
const home_cont=require('../controllers/home_controller')
router.get('/',home_cont.home);
router.use('/user',require('./user'))
router.use('/posts',require('./posts'))

module.exports=router;
