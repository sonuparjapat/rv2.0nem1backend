const express=require("express")
var jwt=require("jsonwebtoken")

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { usermodel } = require("../Model/UserModel")
const userRouter=express.Router()
userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body

    const data=await usermodel.findOne({"email":email})
    if(!data){
        try{
            bcrypt.hash(password,5, async(err, hash)=> {
                const data=new usermodel({email,password:hash})
              await data.save()
res.status(200).json({msg:"REGISTERED SUCCESSFULLY"})
            });
        }catch(err){
            res.status(400).json({msg:"something going wrong"})
        }
    }else{
        res.status(400).json({msg:"Already Registered User"})
    }

})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const data=await usermodel.findOne({"email":email})
    if(data){
        try{
            bcrypt.compare(password,data.password, function(err, result) {
               if(result){
                var token = jwt.sign({authorId:data._id }, 'masai', { expiresIn: 60 * 60 });
                res.status(200).json({msg:"LOGIN SUCCESSFULLY","token":token,"useremail":data.email})
               }else{
                res.status(400).json({msg:"Password Mismatch"})
               }
            });

        }catch(err){
            res.status(400).json({msg:"something going wrong"})
        }
    }else{
        res.status(400).json({msg:"!!No data found with this email"})
    }
})
module.exports={userRouter}