const mongoose = require('mongoose');
const shortId = require('shortId')



const answerSchema = new mongoose.Schema( 
    { 
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions",
          },
          answer: String,
          created_at: {
            type: Date,
            default: Date.now(),
          },
          user: mongoose.Schema.Types.ObjectId,
          comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
          },
    }
)
module.exports = mongoose.model("Answers", answerSchema);