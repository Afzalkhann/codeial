module.exports.index=function(req,res){
    return res.json(200,{
        message:"vs posts api",
        posts:['a','b','c']

    })
}