const {Schema, model}=require('mongoose')

const SchemaRoles=Schema({
  role:{
    type:String,
    require: [true, 'The name of the role is required']
  }
})

module.exports=model('Role', SchemaRoles)