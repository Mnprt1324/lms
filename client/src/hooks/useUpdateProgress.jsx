import { functionTogetUpdatePrgress } from "@/API/api";
import { useMutation } from "@tanstack/react-query";
export const useUpdateProgress = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: functionTogetUpdatePrgress,
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error(error.response.data.message || "something went wrong");
    },
  });
  return { updateProgress: mutate };
};
