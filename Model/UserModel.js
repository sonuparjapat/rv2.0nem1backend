const mongoose=require("mongoose")
require('dotenv').config()
const connection =mongoose.connect(process.env.MongoUrl)

const schema=mongoose.Schema({
  
    "email":{type:String,required:true},
    "password":{type:String,required:true}
})

const usermodel=mongoose.model("justpractice",schema)
module.exports={connection,usermodel}