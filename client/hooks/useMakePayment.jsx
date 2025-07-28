import { useRazorpay } from "react-razorpay";
import { functionToCreateOrder, functionToVerifyPayment } from "../src/API/api";
import { toast } from "sonner";

export const useMakePayment = (courseId) => {
  const { Razorpay } = useRazorpay();

  const handlePayment = async () => {
    try {
      // 1. Create order from backend
      const res = await functionToCreateOrder(courseId);
      const order = res.data.order;

      if (!order?.id) {
        console.error("Invalid order object", order);
        return;
      }

      // 2. Razorpay options
      const options = {
        key: "rzp_test_n4AxeVBg1w6Rqk",
        amount: order.amount,
        currency: order.currency,
        name: "Test App",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (res) => {
          try {
            const resp = await functionToVerifyPayment(res);
           toast.success(resp.data.message);
          } catch (error) {
            console.log(error);
          }
        },
        prefill: {
          name: "Manpreet",
          email: "manpreet@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 3. open Razorpay
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  return handlePayment;
};
