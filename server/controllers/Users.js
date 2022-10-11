const questionSchema = require('../model/Question');
const  users  = require('../model/users');
const {hashPassword,hashCompare,createToken} = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const {registerMail} = require('../uitls/utils')




const Register =async (req,res)=>{
    try {
        let user = await users.find({email:req.body.email})
        if(user.length){
          res.send({
            statusCode:400,
            message:"User Already Exists"
          })
        }
        else{
          let hashedPassword = await hashPassword(req.body.password)
          req.body.password = hashedPassword
          const payload={email:req.body.email}
          const vtoken = jwt.sign(payload,'verification')
          await users.create(req.body)
          const data = await  users.updateOne({email:req.body.email},{$set:{verificationToken:vtoken}});
          if(data){
            registerMail(req.body.name,req.body.email,vtoken)
           res.send({
             statusCode:200,
             message:"Success"
           })
           }
          }
      }
      catch (error) {
       console.log(error)
       res.send({
        statusCode:500,
          message:"Error"
       }) 
      }
}





const login = async (req,res)=>{
  try {
    let user = await users.findOne({email:req.body.email})
    console.log(user._id)
    if(user.email !== null){
      let compare = await hashCompare(req.body.password,user.password)
      console.log(compare)
        if(!compare) return res.status(400).json("Invalid Credentials")
           const jwttoken = await createToken(user.email,user._id)
             res.send({
               statusCode:400,
               message:"Logged in Succesfully ",
               data:jwttoken
               })
        }
    else{
      res.send({
        statusCode:400,
        message:"User Does Not exists"
      })
    }
  } catch (error) {
   console.log(error)
   res.send({
    statusCode:500,
      message:"Message"
   }) 
  }
}


const question = async (req,res) => {
  try {
    const questionsPosted = await questionSchema.find({user:req.params.id})
    res.send({
      statusCode:200,
      data:questionsPosted
    })
  } catch (err) {
    res.status(400).send({
      message: "Question not found",
    });
  }
}


const profile = async (req,res) => {
  let user = await users.findById({_id:req.params.profile})
  if(user){
    res.send({
      statusCode:200,
      data:user
    })
  }
  else{
    res.send({
      message:"Unauthrized"
    })
  }
}




module.exports ={Register,login,question,profile}