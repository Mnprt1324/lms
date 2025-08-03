import { functionToCreateCommnet } from "@/API/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateCommnet = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: functionToCreateCommnet,
    onSuccess: (data) => {

    },
    onError: (error) => {
        toast.error(error.response.data.message || "something went wrong");
    },
  });
  return { mutate, isError, isLoading:isPending };
};
