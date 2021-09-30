const { response, request } = require("express");


const isRole = (...roles) => {

  
  return (req=request, res=response, next) => {
    const currentRole=req.currentUser.role
    if (!roles.includes(currentRole) ) {
        
      return res.status(401).json({ 
        msg:"Sorry, you don't have the permissions to do this"
      })
    }

    next()
  }
}

module.exports={
  isRole
}