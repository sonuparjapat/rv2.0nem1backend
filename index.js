const express=require('express')
const cors=require("cors")
const { connection } = require('./Model/UserModel')
const { userRouter } = require('./Controls/Userpost')
const { auth } = require('./Authentication')
const { userPostRouter } = require('./Controls/userAllPosts')
const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use(auth)
app.use("/userpost",userPostRouter)
app.listen(8080,async()=>{
    try{
        await connection
        console.log("connected to mongodb")

    }catch(err){
        console.log(err)
    }
    console.log("port is running on 8080")
})