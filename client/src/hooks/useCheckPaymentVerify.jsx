import { functionToVerifyPayment } from "@/API/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCheckPaymentVerify = (courseId) => {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: ["hello"],
    mutationFn: () => functionToVerifyPayment(courseId),
    onSuccess: (data) => {
      if (data.data.success) {
        navigate(`/course/${courseId}/progress`);
      } else {
        navigate(`/course/${courseId}`);
      }
    },
    onError: (error) => {
        if(error.status===403){
          navigate("/login")
        }else{
          toast.error(error.response.data.message || "something went wrong");
        }
    },
  });

  return { isPending, verifyPayment: mutate };
};
