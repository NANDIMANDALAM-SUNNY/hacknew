var express = require('express');
var router = express.Router();
const answerSchema = require('../model/Answer');
const commentSchema = require('../model/Comment');
const questionschema = require('../model/Question')
const mongoose = require('mongoose');
/* GET home page. */

router.get('/', function(req, res,) {
  res.send("Hello World! from  backend");
});





// router.post('/signup',async (req,res)=>{
// try {
//   await questionschema.create(req.body)
  
// }
// catch (error) {
//  console.log(error)
//  res.send({
//   statusCode:500,
//     message:"Error"
//  }) 
// }
//  })




// router.post('/api/question',async(req,res)=>{
// try {
//   const question = await questionschema.create(req.body)
//   res.send({
//     statusCode:200,
//         message:"Success",
//         data:question
//   })
// } catch (error) {
//   res.send({
//     statusCode:500,
//       message:"Error in adding question",
//       data:error
//   })
// }  
// })

// router.post('/api/answer',async(req,res)=>{
// try {
//   const answer = await answerSchema.create(req.body)
//   res.send({
//     statusCode:200,
//         message:"Success",
//         data:answer
//   })
// } catch (error) {
//   res.send({
//     statusCode:500,
//       message:"Error in adding answer",
//       data:error
//   })
// }
// })


// router.post('/api/comment/:id',async(req,res)=>{
//   try {
//     const comment = await commentSchema.create(req.body)
//   res.send({
//     statusCode:200,
//         message:"Success",
//         data:comment
//   })
//   } catch (error) {
//     res.send({
//       statusCode:500,
//         message:"Error in adding comment",
//         data:error
//     })
//   }  
// })



// router.get('/api/allquestions',async function (req, res) {
//   try {
//     questionschema.aggregate([
//       {
//         $lookup: {
//           from: "comments",
//           let: { question_id: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: ["$question_id", "$$question_id"],
//                 },
//               },
//             },
//             {
//               $project: {
//                 _id: 1,
//                 // user_id: 1,
//                 comment: 1,
//                 created_at: 1,
//                 // question_id: 1,
//               },
//             },
//           ],
//           as: "comments",
//         },
//       },
//       {
//         $lookup: {
//           from: "answers",
//           let: { question_id: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: ["$question_id", "$$question_id"],
//                 },
//               },
//             },
//             {
//               $project: {
//                 _id: 1,
//                 user_id: 1,
//                 answer: 1,
//                 created_at: 1,
//                 // question_id: 1,
//                 // created_at: 1,
//               },
//             },
//           ],
//           as: "answerDetails",
//         },
//       },
//       // {
//       //   $unwind: {
//       //     path: "$answerDetails",
//       //     preserveNullAndEmptyArrays: true,
//       //   },
//       // },
//       {
//         $project: {
//           __v: 0,
//           // _id: "$_id",
//           // answerDetails: { $first: "$answerDetails" },
//         },
//       },
//     ]) .exec()
//     .then((questionDetails) => {
//       res.status(200).send(questionDetails);
//     })

//   } catch (error) {
//     res.send({
//       statusCode:500,
//         message:"Error in Fetching questions",
//         data:error
//     })
//   }
// })




// router.get("/api/question/:id", async (req, res) => {
//   try {
//     // const question = await QuestionDB.findOne({ _id: req.params.id });
//     // res.status(200).send(question);
//     questionschema.aggregate([
//       {
//         $match: { _id: mongoose.Types.ObjectId(req.params.id) },
//       },
//       {
//         $lookup: {
//           from: "answers",
//           let: { question_id: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: ["$question_id", "$$question_id"],
//                 },
//               },
//             },
//             {
//               $project: {
//                 _id: 1,
//                 user: 1,
//                 answer: 1,
//                 // created_at: 1,
//                 question_id: 1,
//                 created_at: 1,
//               },
//             },
//           ],
//           as: "answerDetails",
//         },
//       },
//       {
//         $lookup: {
//           from: "comments",
//           let: { question_id: "$_id" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $eq: ["$question_id", "$$question_id"],
//                 },
//               },
//             },
//             {
//               $project: {
//                 _id: 1,
//                 question_id: 1,
//                 user: 1,
//                 comment: 1,
//                 // created_at: 1,
//                 // question_id: 1,
//                 created_at: 1,
//               },
//             },
//           ],
//           as: "comments",
//         },
//       },
//       // {
//       //   $unwind: {
//       //     path: "$answerDetails",
//       //     preserveNullAndEmptyArrays: true,
//       //   },
//       // },
//       {
//         $project: {
//           __v: 0,
//           // _id: "$_id",
//           // answerDetails: { $first: "$answerDetails" },
//         },
//       },
//     ])
//       .exec()
//       .then((questionDetails) => {
//         res.status(200).send(questionDetails);
//       })
//       .catch((e) => {
//         console.log("Error: ", e);
//         res.status(400).send(error);
//       });
//   } catch (err) {
//     res.status(400).send({
//       message: "Question not found",
//     });
//   }
// });


module.exports = router;
