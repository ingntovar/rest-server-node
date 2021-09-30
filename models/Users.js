const {Schema, model}=require('mongoose')


const UserSchema=Schema({
  name:{
    type: String,
    required:[true, 'The name is obligatory']
  },
  email:{
    type: String,
    required:[true, 'The email is obligatory'],
    unique: true

  },
  password:{
    type: String,
    required:[true, 'The password is obligatory']

  },
  img:{
    type: String,

  },
  role:{
    type: String,
    required: true,
    // enum:['ADMIN_ROLE', 'USER_ROLE']
  },
  status:{
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean
  }

})

UserSchema.methods.toJSON=function(){
  const {__v,password, _id,...userData}=this.toObject()
  userData.uid=_id
  return userData
}

module.exports=model('User', UserSchema)