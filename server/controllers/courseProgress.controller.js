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
            paymentId:"a"
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
        return res.status(200).json({ error: false, message: "payment Order scussfull", order,newPurchase })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error", error: true })
    }
}



module.exports.verifyPayment = (req, res) => {
    const {data} =req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature }=data;
    console.log(req.body);
  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.rzp_key_secret)
    .update(sign.toString())
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
