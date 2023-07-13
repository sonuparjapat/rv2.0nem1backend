const express=require('express')
const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    "firstname":String,
    "lastname":String,
    "email":String,
    "department":{type:String, enum : ['Tech',"Marketing","Operations"]},
    "salary":Number,
    "authorId":String

})
const userpostModel=mongoose.model("userpostmodel",userSchema)
module.exports={userpostModel}