const mongoose = require("mongoose");

const coursePurchaseSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, amount: {
        type: Number,
        required: true
    }, status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }, paymentId: {
        type: String,
        required: true
    },
    orderId:{
        type:String,
    },
    paymentSignature:{
        type:String,
    }
}, { timestamps: true })

const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema);

module.exports = CoursePurchase;