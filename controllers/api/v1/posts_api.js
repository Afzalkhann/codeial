const Post = require('../../../models/post');
const comment =require('../../../models/comment')
module.exports.index= async function(req,res){
    
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        return res.json(200,{
            message:'List of posts',
            posts:posts
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id)
            //.id means converting the object id into string
        if(post.user==req.user.id){
            post.remove();

            await comment.deleteMany({post:req.params.id})
            
            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:"Post deleted"

            //     })
            // }

           // req.flash('success','Post Deleted')
            return res.json(200,{
                message:'posts and related comments are delted successfully'
            })
        }
        else{
            return res.json(401,{
                message:'you cannot delete this post'
            })

        }
    }catch(err){
       // req.flash('error',err)
       console.log(err)
        return res.json(500,{
            message:'internal srver error'    
        })
    }
}