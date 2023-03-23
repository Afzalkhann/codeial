const express=require('express');
const home_controller = require('../controllers/home_controller');
const router=express.Router()
const home_cont=require('../controllers/home_controller')
router.get('/',home_cont.home);

module.exports=router;
