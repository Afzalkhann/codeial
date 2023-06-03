const user=require('../models/user')
const friendship=require('../models/friendship')

module.exports.create=async function(req,res){
    try{
        
        let existingFriend=await friendship.findOne({
            fromUser:req.query.fromUser,
            toUser:req.query.toUser
        })
        let existingFriendT=await friendship.findOne({
            fromUser:req.query.toUser,
            toUser:req.query.fromUser
        })
        
        let User=await user.findById(req.query.fromUser)
        let User1=await user.findById(req.query.toUser)
        if(existingFriend || existingFriendT){
            req.flash('error','user is existing friend')
            return res.redirect('back')
        }


        else{
            let friend=await friendship.create({
                fromUser:req.query.fromUser,
                toUser:req.query.toUser
            })
            User.friends.push(req.query.toUser)
            User.save()
            User1.friends.push(req.query.fromUser)
            User1.save()
            req.flash('success','friendship created')
            return res.redirect('back')
        }
  

    }catch(err){
        console.log('error',err)
        req.flash('error','internal server error')
        return res.redirect('back')
    }
}

module.exports.destroy=async function(req,res){
    try{
        await friendship.deleteOne({
            fromUser:req.query.fromUser,
            toUser:req.query.toUser
        })
        await friendship.deleteOne({
            fromUser:req.query.toUser,
            toUser:req.query.fromUser
        })
        let User=await user.findById(req.query.fromUser)
        let User1=await user.findById(req.query.toUser)
        User.friends.pull(req.query.toUser)
        User.save()
        User1.friends.pull(req.query.fromUser)
        User1.save()
        req.flash('success','Friendship broken')
        return res.redirect('back')


    }catch(err){
        console.log('error',err)
        req.flash('error','internal server error');
        return res.redirect('back')
    }
}