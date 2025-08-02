const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    feedBackText: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    }
})

const FeedBack = mongoose.model("feedback", feedbackSchema);
module.exports = FeedBack;