var express = require('express');
var router = express.Router();
const { validate} = require('../middleware/middleware');
const { Register,login ,question,profile} = require('../controllers/Users');



router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// register user
 router.post('/signup',Register)
//login user
router.post('/login', login)


// get all users data
// router.get('/allusers' , async (req,res)=>{

//  const user = await users.find()
//  console.log(user)
//  if(user){
//    res.send({
//      statusCode:200,
//      data:user
//    })
//  }
//  else{
//    res.send({
//      message:"Unauthrized"
//    })
//  }
// })


// user profile
 router.get('/:profile' ,profile)



//questions posted by user
 router.get('/question/:id',question)






// router.get('/confirm-account/:vtoken',verifyAccount)  //forgot Mail

// router.post('/forgotpassword',forgot_password)  //forgot Mail
// router.get('/resetpassword/:id/:token',verifyPassword)
// router.post('/newpassword/:id/:token',newPassword)







module.exports = router;
