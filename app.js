
require('dotenv').config()

const Server=require('./models/Server')


console.clear()

const server=new Server()

server.listen()



