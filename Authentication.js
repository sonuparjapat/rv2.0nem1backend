const jwt=require("jsonwebtoken")
const auth=async(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
       try{
        jwt.verify(token.split(" ")[1], 'masai', function(err, decoded) {
            if(decoded){
               req.body.authorId=decoded.authorId
                next()
            }else{
                res.status(400).json({msg:"Token expired/Wrong token ,please login again"})
            }
      
          });
       }catch(err){
        res.status("400").json({msg:"something going wrong"})
       } 
    }else{
        res.status(400).json({msg:"Please login first"})
    }
}
module.exports={auth}