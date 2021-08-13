
const router=require('express').Router()
const verify=require('./privateRoute')
const Home=(req,res)=>{
    res.send({message:"Success"})
    }

module.exports=Home