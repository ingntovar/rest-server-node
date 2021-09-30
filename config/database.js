const mongoose=require('mongoose')


const connectDB=async()=>{
  try {
    
    await mongoose.connect(process.env.MONGODB_CNN)
    console.log('Successfully connected to the DB')

  } catch (error) {
    console.log(error)
    throw new Error('Something wrong connecting to the DB')
  }
}

module.exports={
  connectDB
}