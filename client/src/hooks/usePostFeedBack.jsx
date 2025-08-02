import { functionToPostFeedBack } from "@/API/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostFeedBack = () => {
  const { isError, isPending, mutate,isSuccess } = useMutation({
    mutationFn: functionToPostFeedBack,
    onSuccess: (data) => {
      console.log(data);
      if (data.data.message) {
        toast.success(data.data.message);
      }
    },
    onError: (err) => {
      console.log(err);
      toast.error(error?.data.data.message || "something went Wrong");
    },
  });
  return { isError, isPending, mutate,isSuccess };
};
