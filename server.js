const express=require('express')
const mongoose=require('mongoose')
const app=express()
const {signup,login}=require('./Util/auth')
const protect=require('./Util/privateRoute')
const home=require('./Util/home')
require('dotenv').config()
const mongooseConnect=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log("MongoDB  connected")
    }
    catch(error)
    {
        console.log(error)
    }
}
mongooseConnect()
app.use(express.json())
app.get("/",(req,res)=>{
res.send("Hello")
})
app.get("/home",protect,home)
app.post("/signup",signup)
app.post("/login",login)

const PORT = process.env.PORT || 8080
app.listen(PORT  ,console.log(`Server running  on port ${PORT}`))