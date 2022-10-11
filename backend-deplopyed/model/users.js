const mongoose = require('mongoose');
const validator = require('validator')   //validation of schema
let users = new mongoose.Schema( //creating the schema
    { 
        name:{
            type:"string",
            required:true
        },
        email:{
            type:"string",
            required:true,
            lowercase:true,
            unique:true,
            validate:(value)=>{
                return validator.isEmail(value)
            }
        },
        password:{
            type:"string",
            required:true
        },  
        createdAt:{
            type:Date,
            default:Date.now(),
            expireAfterSeconds: 30 
        },
        verified:{
            type:"Boolean",
            default:'false'
        },
        verificationToken:{
            type:"string",
            default:""
        },
        token:{
            type:"string",
            default:"",
        },
        votes:{
            type:"number",
            default:0
        }
    }
)

module.exports = mongoose.model("users", users);