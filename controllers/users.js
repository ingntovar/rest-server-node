const {response}=require('express')
const bcryptjs=require('bcryptjs')
const User=require('../models/Users')

const usersGet=async(req,res=response)=>{
  const query={status:true} //Find if the query is true
  const {limit=5, from=0}=req.query //It recieves limit and 'from' from the endpoint
  
  const [totalUsersFound,users]=await Promise.all([
    
    User.countDocuments(query), //Count if the query is true
    User.find(query) //All the users, but limitations below 
    .skip(Number(from))  //Skip initiate from the document number='from'
    .limit(Number(limit)) //Limit the number of registers response to 'limit'
  ])
    
  res.json({
    totalUsersFound,
    users
  })
}


const usersPost=async (req,res=response)=>{
  const {name, password, email, role}=req.body //extract the values
  let user=await new User({name, password, email, role}) 
  //New object, new document by using a new instance of the Schema Users
  //Encrypt password
  const salt=bcryptjs.genSaltSync()
  user.password=bcryptjs.hashSync(password, salt)
  
  await user.save() //After making validations and encrypting the password, finally it saves the document
  
  res.json({
    user
  })
}

const usersPut=async(req, res)=>{
  
  const {id}=req.params //Extract the segment (required parameter) id ir order to update it
  const {_id, password, google, ...rest}=req.body
  //Above is a way to filter _id, password, google and use the 'rest' of the object send it
  
  if(password){ //Again encrypting the password for security porposes
    const salt=bcryptjs.genSaltSync()
    rest.password=bcryptjs.hashSync(password, salt)
  }
  //Do not forget _id and id is the same value for MONGO DB

  const user=await User.findByIdAndUpdate(id, rest) //Receives the id and the data we want to update
  //Above we update the user data, but again, jus with the 'rest' data filtered

  res.json({
    user,
    id
  })
}


const usersDelete=async (req,res=response)=>{

  const id= req.params.id
  // const uidCurrent=req.currentUser
  // const user=await User.findByIdAndDelete(id) //Delete permanently
  const user= await User.findByIdAndUpdate(id, {status:false})
  res.status(200).json(user)

}

module.exports={
  usersGet,
  usersPost,
  usersPut,
  usersDelete
}