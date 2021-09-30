const express=require('express')
const cors=require('cors')
const {connectDB}=require('../config/database')

class Server{
  constructor(){
    this.app=express() //Instance of Express
    this.port=process.env.PORT //Define PORT from .ENV FILE
    this.connectMongoDB() //Execute DB connection
    this.middlewares() //Execute middlewares functions
    this.routes() //Execute routes definition 
  }

  async connectMongoDB(){
    await connectDB() //Connect to MONGO DB
    
  }

  middlewares(){
    this.app.use(cors()) //Probably use cors to limit REST
    this.app.use(express.json()) //Accept json data in request
    this.app.use(express.static('public')) //Define the entry point for the view
  }

  routes(){ //Routes definitions for end-points
    this.app.use('/api/users', require('../routes/users')) //Define a route end-point
    this.app.use('/auth', require('../routes/auth')) //Define a route end-point
  }

  listen(){ //Run the server on defined port
    this.app.listen(this.port,()=>{
      console.log(`Server running in port ${this.port}`)
    })
  }

}

module.exports=Server