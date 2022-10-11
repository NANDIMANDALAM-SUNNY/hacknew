const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema( //creating the schema
    { 
        title: String,
        body: String,
        tags: [],
        created_at: {
            type: Date,
            default: Date.now(),
        },
        user: mongoose.Schema.Types.ObjectId,
        comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments",
        },
        votes:[
           { type: "String",
            unique: true,}
        ],
        views:{
            type:Number,
            default:0,
        }
    }
)
module.exports = mongoose.model("Questions", questionSchema);
