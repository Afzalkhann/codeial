const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const Like=require('../models/likes')

const commentsMailer=require('../mailer/comment_mailer')
const commentMailWorker=require('../workers/comment_email_worker');
 

module.exports.create = async function(req, res){
    try{
        let post=await Post.findById(req.body.post)
        if(post){
        let comment=await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
    
        
        post.comments.push(comment);
        post.save();
        comment=await comment.populate('user','name email').execPopulate()
        //commentMailer.newComment(comment)
        let job=queue.create('emails',comment).save(function(err){
            if(err){console.log('error in creating queue',err);return}
            console.log(job.id)
        })
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    comment:comment
                },
                message: "Comment created!"
            });
        }
        req.flash('success','comment posted')
        res.redirect('/');
               
        }
    }   
    catch(err){
        req.flash('error',err)
        res.redirect('/');
    }
      
}

module.exports.destroy= async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id)
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            let post=Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
            await Like.deleteMany({likable:comment._id,onModel:'Comment'})
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:'Post deleted'
                })
            }


            req.flash('success','comment deleted')
            return res.redirect('back')
            }
        else{
            req.flash('error',err)
            return res.redirect('back')
        }
    }catch(err){
        console.log('error in deleting comment',err)
        req.flash('error',err)
        return res.redirect('back')
    }
}
