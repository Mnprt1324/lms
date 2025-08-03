import { useRazorpay } from "react-razorpay";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { functionToCreateOrder, functionToPayUpdateStatus } from "@/API/api";

export const useMakePayment = (courseId) => {
  const { Razorpay } = useRazorpay();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // 1. Create order from backend
      const res = await functionToCreateOrder(courseId);
      const newPurchase=res.data.newPurchase;
      const order = res.data.order;

      if (!order?.id) {
          toast.error("something went wrong");
        return;
      }

      // 2. Razorpay options
      const options = {
        key: import.meta.env.VITE_RZP_SERET,
        amount: order.amount,
        currency: order.currency,
        name: "Test App",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (res) => {
          try {
            const response=await functionToPayUpdateStatus({...res,newPurchase});
            if(response.data.message){
              toast.success(response.data.message);
            }
            navigate(`/course/${courseId}/progress`);
            // const resp = await functionToVerifyPayment({...res,newPurchase});
          } catch (error) {
           toast.error(error?.response.data.message || "something went wrong");
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
       toast.error(error?.response.data.message || "something went wrong");
    }
  };

  return handlePayment;
};
