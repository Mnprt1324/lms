const Razorpay = require("razorpay");
const Course = require("../models/course.model");
const CoursePurchase = require("../models/purchaseCourse")
const crypto = require("crypto");
module.exports.createOrder = async (req, res) => {
    try {

        const userId = req.user;
        const { courseId } = req.body;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: true, message: "no Course Found" });
        }
        const amount = course.coursePrice;

        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending",
            paymentId: "a"
        })
        await newPurchase.save();
        const razorpay = new Razorpay({
            key_id: process.env.rzp_Api_Key,
            key_secret: process.env.rzp_key_secret
        })

        const options = {
            amount: amount * 100, // Razorpay uses paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };;
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(404).json({ error: true, message: "error while payment" })
        }
       
        newPurchase.paymentId = order.id;
        await newPurchase.save();
        return res.status(200).json({ error: false, message: "payment Order scussfull", order, newPurchase: newPurchase._id })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error", error: true })
    }
}


module.exports.updatePurchaseCourse = async (req, res) => {
    try {
        const { newPurchase, razorpay_payment_id,razorpay_signature, razorpay_order_id } = req.body.data;
    
        let CoursePur = await CoursePurchase.findById(newPurchase);
        if (!CoursePur) {
            return res.status(404).json({ success:false,message: "No Course Purchase found" });
        }
        CoursePur.orderId=razorpay_order_id
        CoursePur.paymentId = razorpay_payment_id;
        CoursePur.paymentSignature=razorpay_signature
        CoursePur.status = "completed"
        await CoursePur.save();
        return res.status(200).json({ message: "Payment Done" });
    } catch (error) {
        console.log("updatePurchase", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.verifyPayment = async (req, res) => {
    try {
         const {courseId}=req.params;
         const userId=req.user;
         const purchaseCours=await CoursePurchase.findOne({courseId});
         if(!purchaseCours){
            return res.status(200).json({success:false,message:"no purchase Course found"})
         }
        // const sign = razorpay_order_id + "|" + razorpay_payment_id;
        // const expectedSign = crypto
        //     .createHmac("sha256", process.env.rzp_key_secret)
        //     .update(sign.toString())
        //     .digest("hex");

        // if (expectedSign !== razorpay_signature) {
        //     res.status(400).json({ success: false, message: "Payment verification failed" });
        // }
        res.status(200).json({ success: true, message: "Payment verified" });
    } catch (error) {
        console.log("verifyPayment", error)
        return res.status(500).json({ message: "Internal server error" });
    }
};
