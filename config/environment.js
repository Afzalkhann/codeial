const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'somthing',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'afzalkhann76@gmail.com',
            pass:'pzeruftpggisspej'
        }
    },
    google_clientID:'156014284450-c2sd3kt9kvdp5tf74lh3mqnbq6b1pn7r.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_screate:'codeal',
}



const production={
    name:'production',
    asset_path:'/assets',
    session_cookie_key:process.env.codial_session_cookie_key,
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'afzalkhann76@gmail.com',
            pass:'pzeruftpggisspej'
        }
    },
    google_clientID:'156014284450-c2sd3kt9kvdp5tf74lh3mqnbq6b1pn7r.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_screate:'codeal',
}

module.exports=development