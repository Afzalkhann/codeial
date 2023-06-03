const nodemailer=require('../config/nodemailer')


//another methon of exporting any method
exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
   // console.log('inside comment mailer',comment)
    nodemailer.transporter.sendMail({
        from:'abc.com',
        to:comment.user.email,
        subject:"New comment Published",
        html:htmlString
    },(err,info)=>{
        if(err){console.log('error in publishing the comment',err);return}
        //console.log('message sent',info);
        return
    
    })
}