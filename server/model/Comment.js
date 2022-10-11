const mongoose = require('mongoose');
const shortId = require('shortId')



const commentSchema = new mongoose.Schema( 
    { 
        question_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questions",
          },
          comment: String,
          created_at: {
            type: Date,
            default: Date.now(),
          },
          user: mongoose.Schema.Types.ObjectId,
    }
)

module.exports = mongoose.model("Comments", commentSchema);