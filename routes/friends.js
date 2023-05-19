const express = require('express');

const router = express.Router();
const friendshipController=require('../controllers/friends_controller');

router.get('/add',friendshipController.create)
router.get('/destroy',friendshipController.destroy)


module.exports=router