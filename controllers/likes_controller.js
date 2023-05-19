const Post=require('../models/post')
const Comment=require('../models/comment')
const Like=require('../models/likes')



module.exports.toggleLike= async function(req,res){
    try{
        //likes/toggle/?id=abcd/&typr=Post
        
        let likable
        let deleted=false

        if(req.query.type=='Post'){
            likable=await Post.findById(req.query.id).populate('likes')
        }else{
            likable=await Comment.findById(req.query.id).populate('likes')
        }
        

        let existingLike= await Like.findOne({
            user:req.user._id,
            likable:req.query.id,
            onModel:req.query.type

        })
        // console.log('likable',likable)
        // console.log('existing like',existingLike)
        if(existingLike){
            likable.likes.pull(existingLike._id)
            likable.save()
            existingLike.remove()
            deleted=true
        }else{
            console.log(req.query.id)
            let newLike=await Like.create({
                user:req.user._id,  
                likable:req.query.id,
                onModel:req.query.type
            })
            likable.likes.push(newLike._id)
            likable.save()
        }
        return res.redirect('back')



    }catch(err){
        console.log(err)
    return res.json(500,{
            message:'internal server error'
        })
    
    }
}