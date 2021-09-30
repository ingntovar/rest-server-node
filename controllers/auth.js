const {response}=require('express')
const User=require('../models/Users')
const bcryptjs=require('bcryptjs')
const {generateJWT}=require('../helpers/JWT')

const authLogin=async(req,res=response)=>{

  const {email, password}=req.body

  try {
    
    //Verify if the email exists
    const user=await User.findOne({email})
    if(!user){
      res.status(400).json({
        msg:"The user or password are not correct, please verify your data"
      })
    }
    //Verify if the user is active
    if(!user.status){
      res.status(400).json({
        msg: "The user or password are not correct, please verify your data"
      })
    }

    //Compare if password matches
    const validPassword=bcryptjs.compareSync(password,user.password)
    if(!validPassword){
      res.status(400).json({
        msg:"The user or password are not correct, please verify your data"
      })
    }

    //Generate JWT
    const token=await generateJWT(user.id)

    res.json({
      msg: "Login done!",
      user,
      token
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg:'There was a server error in auth process'
    })
    
  }
  
}




module.exports={
  authLogin
}