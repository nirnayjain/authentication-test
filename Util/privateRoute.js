
const jwt=require('jsonwebtoken')
module.exports=function(req,res,next){
    if (!req.headers.authorization) {
    return res.status(401).send({message:"User not authorized"});
  }
    let token = req.headers.authorization.split("Bearer ")[1];
    if(!token) return res.status(401).send('Access Denied')
    try{
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified
        next();
    }
    catch(err)
    {
        res.status(400).send("Invalid Token")
    }
}