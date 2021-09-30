const jwt=require('jsonwebtoken')
const { request, response } = require("express")
const User=require('../models/Users')

const validateJWT = async (req=request, res=response, next) => {
  const token=req.header('x-token')

  if(!token){
    return res.status(401).json({
      msg:"The request does not contain the required token"
    })
  }

  try {
    
    const {uid}=jwt.verify(token, process.env.SECRETKEY)

    const currentUser=await User.findById(uid)

    if(!currentUser){ //If user does not exist
      return res.status(401).json({
        msg:"Non valid token"
      })
    }

    if(!currentUser.status){
      return res.status(401).json({
        msg:"Non valid token"
      })
    }
    
    req.currentUser=currentUser
    
    next()

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      msg:"Not valid token provided"
    })
  }
  
}
 
module.exports ={

  validateJWT
} 