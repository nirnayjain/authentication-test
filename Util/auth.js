const jwt=require('jsonwebtoken')
const User=require("../Models/user")
const bcrypt=require('bcrypt')
module.exports={
 signup :async (req, res) => {

  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.name
  ) {
    return res.status(400).send({
      message: "Required fields missing",
    });
  }
  const user = await User.findOne({ email: req.body.email })
  if(user)
return res.status(400).send({ status: "failed", message:"Email is already in use" });
else{
    const salt=await bcrypt.genSalt(10)
     const hashedpassword=await bcrypt.hash(req.body.password,salt)
      const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    })
  try {
    const result = await user.save()
    return res.status(201).send({ status: "ok", message:"User Successfully created",data:result});
  }
   catch (e) {
    return res.status(500).send({message: e.message});
  }
}
},

login :async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Email and password required" });
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.status(400).send({ message: "Invalid Email or Password" });
  }
try {
    const match=await bcrypt.compare(req.body.password,user.password)
    if (!match) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
   const token=jwt.sign({_id:user.id,name:user.name,email:user.email,password:user.password},process.env.TOKEN_SECRET)
        res.header('auth_token',token).send(token)
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
}
}



