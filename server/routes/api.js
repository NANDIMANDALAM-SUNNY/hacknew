var express = require('express');
var router = express.Router();
const questionSchema = require('../model/Question')
const { postQuestion, postAnswer, allQuestions, singleQuestion, addComments } = require('../controllers/Api');
const { update } = require('../model/users');
const users = require('../model/users');
const { validate } = require('../middleware/middleware');
/* GET home page. */

router.get('/', function(req, res,) {
  res.send("Hello World! from  backend");
});

// posting a new question
router.post('/question',postQuestion)

// posting a new answer
router.post('/answer',validate,postAnswer)

// posting a new comment
router.post('/comment',validate,addComments)

// getting all the questins information
router.get('/allquestions',allQuestions )

// getting particula id question
router.get("/question/:id",singleQuestion);



router.post('/question/votes/:id',async(req,res)=>{
  try {
   
    const checkUserVotes = await questionSchema.findOne({votes:req.body.user})
    console.log(checkUserVotes)
    console.log(req.body.user)
    if(checkUserVotes == null) {
      const updateWithVoteforUser = await users.updateOne({_id:req.body.user },{$inc: {votes:1}});
      const updateWithVote = await questionSchema.updateOne({  _id:req.params.id },{$push: {votes:req.body.user}});
      console.log(updateWithVote.votes)
    // res.send({
    //   data: [updateWithVoteforUser,updateWithVote],
    //   message: "Voted Added"
    // })
  
  }
  else{
    // res.send({
    //   message: "Already Voted for this question",
    // })
    console.log("already Voted for this question")
  }
  } catch (error) {
   res.send({
     statusCode:500,
       message:"Error in adding comment",
       data:error
   })
  }
})



module.exports = router;
