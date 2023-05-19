const user=require('../models/user')
const friendship=require('../models/friendship')

module.exports.create=async function(req,res){
    try{
        console.log('reached here')
        
        let existingFriend=await friendship.findOne({
            fromUser:req.query.fromUser,
            toUser:req.query.toUser
        })
        let existingFriendT=await friendship.findOne({
            fromUser:req.query.toUser,
            toUser:req.query.fromUser
        })
        
        let User=await user.findById(req.query.fromUser)
        if(existingFriend || existingFriendT){
            req.flash('error','user is existing friend')
            res.redirect('back')
        }


        else{
            let friend=await friendship.create({
                fromUser:req.query.fromUser,
                toUser:req.query.toUser
            })
            console.log(req.query.toUser)
            User.friends.push(req.query.toUser)
            User.save()
            req.flash('success','friendship created')
            res.redirect('back')
        }
        

    }catch(err){
        console.log('error',err)
        req.flash('error','internal server error')
        res.redirect('back')
    }
}

