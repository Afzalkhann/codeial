const express=require('express')
const postApi=require('../../../controllers/api/v1/posts_api')
const router=express.Router()

router.get('/',postApi.index)
router.delete('/:id',postApi.destroy)

module.exports=router