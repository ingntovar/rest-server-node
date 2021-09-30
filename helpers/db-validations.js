
const Role=require('../models/Roles')
const User=require('../models/Users')


const validateRoleDb=async(role='')=>{
  
  const roleExits=await Role.findOne({role})
  if(!roleExits){
    throw new Error(`The role ${role} is not available`)
  }
}


const validateUniqueEmail=async(email='')=>{

  const emailExists=await User.findOne({email})
  if(emailExists){
    throw new Error('The email is already in use')
  }
}

const theIdExists=async(id='')=>{

  const userIdExists=await User.findById(id)
  if(!userIdExists){
    throw new Error('The user with this id does not exist')
  }
}

module.exports={
  validateRoleDb,
  validateUniqueEmail,
  theIdExists
}