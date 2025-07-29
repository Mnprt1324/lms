import { functionToVerifyPayment } from "@/API/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCheckPaymentVerify = (courseId) => {
  const navigate = useNavigate();
  const {isPending,mutate} = useMutation({
    mutationKey: ["hello"],
    mutationFn: () => functionToVerifyPayment(courseId),
    onSuccess: (data) => {
      if (data.data.success) {
          navigate(`/course/${courseId}/progress`);
        console.log("navigation");
      }else {
         navigate(`/course/${courseId}`);
      }
    },
    onError: (error) => {
      console.log(error.data.success);
    },
  });

  return { isPending,verifyPayment:mutate };
};
