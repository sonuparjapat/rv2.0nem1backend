const express=require("express")
const { userpostModel } = require("../Model/UserPostModel")

const userPostRouter=express.Router()



userPostRouter.get("/",async(req,res)=>{
    const {authorId}=req.body
    console.log(req.body)
try{
    const data=await userpostModel.find({"authorId":authorId})
res.status(200).json({msg:data})}catch(err){
    res.status(400).json({msg:"something going wrong"})
}
}
)
userPostRouter.post("/employees",async(req,res)=>{
    const {firsname,lastname,email,department,salary}=req.body
    // console.log(req.body)
    try{
        const data=new userpostModel(req.body)
        data.save()
        res.status(200).json({msg:"Employee Added Successfully"})
    }catch(err){
        res(400).json({msg:"something going wrong"})
    }

})
userPostRouter.get("/employess/:id",async(req,res)=>{
const {authorId}=req.body
const {id}=req.params

try{
    const data=await userpostModel.findOne({"_id":id})
    res.status(200).json({"msg":data})
}catch(err){
    res.status(400).json({msg:"something going wrong"})
}


})
userPostRouter.delete("/delete/:id",async(req,res)=>{
const {id}=req.params
const data=await userpostModel.findOne({"_id":id})
if(data){
    try{
        if(data.authorId!==req.body.authorId){
        res.status(400).json({msg:"YOU ARE NOT AUTHORISED TO DO THIS"})
    }else{
        await userpostModel.findOneAndDelete({"_id":id})
        res.status(200).json({msg:`Item deleted with id:- ${id}`})
    }}catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
}else{
    res.status(400).json({msg:"No data found with this id"})
}

})
userPostRouter.patch("/patch/:id",async(req,res)=>{
const {id}=req.params
const {authorId}=req.body
const data=await userpostModel.findOne({"_id":id})
try{
    if(data.authorId!==authorId){
        res.status(400).json({msg:"You are not authorized to do this"})
    }else{
        await userpostModel.findOneAndUpdate({"_id":id},req.body)
        res.status(200).json({"msg":`Item with id:-${id} updated successfully`})
    }
}catch(err){
    res.status(400).json({msg:"something going wrong"})
}
})
userPostRouter.put("/put/:id",async(req,res)=>{
    const {id}=req.params
    const {authorId}=req.body
    const data=await userpostModel.findOne({"_id":id})
    try{
        if(data.authorId!==authorId){
            res.status(400).json({msg:"You are not authorized to do this"})
        }else{
            await userpostModel.findOneAndUpdate({"_id":id},req.body)
            res.status(200).json({"msg":`Item with id:-${id} updated successfully`})
        }
    }catch(err){
        res.status(400).json({msg:"something going wrong"})
    }
    })
module.exports={userPostRouter}