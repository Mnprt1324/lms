const FeedBack = require("../models/feedback.model");


module.exports.createFeedback = async (req, res) => {
    try {
        console.log(req.body.data);
        const { feedBackText, rating } = req.body.data;
        const newFeedback = new FeedBack({
            userId: req.user,
            feedBackText,
            rating
        })
        await newFeedback.save();
        return res.status(200).json({ message: "feedback sent", newFeedback });
    } catch (error) {
        console.log("CreateFeedBack", error);
        res.status(500).json({ message: "internal server error" });
    }
}

module.exports.getAllFeedback = async (req, res) => {
    try {
        const allFeedBack = await FeedBack.find().populate({
            path:"userId",
            select:"name avatar"
        });
        if (!allFeedBack) {
            return res.status(404).json({ message: "feedback not found" });
        }
        return res.status(200).json({ allFeedBack, message: "feedBack fetch" })
    } catch (error) {
        console.log("CreateFeedBack", error);
        res.status(500).json({ message: "internal server error" });
    }
}