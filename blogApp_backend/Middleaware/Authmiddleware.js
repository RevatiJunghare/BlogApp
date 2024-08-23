var jwt = require('jsonwebtoken');

const Authmiddleware = (req,res,next)=>{
    const token = req.headers.authorization
    // console.log(req)
    try{
        jwt.verify(token, 'blog', function(err, decoded) {
            //  console.log("decodedToken",decoded)
            if(decoded){
                req.decodedToken=decoded  //variable decodedToken is created inside request and we can use this variable 
                                          //inside any api(before hitting any api)

                // console.log("decodedToken",decoded?.user?.user_id)
                //console.log("decodedToken",decoded)
                next()
            }else{
                res.status(400).send({"message":"error in token decoding"})
            }
          })
    }catch(err){
        res.status(400).send({"message":"error in token"})
    }
}


module.exports={
    Authmiddleware
}