import { functionToCreateCommnet } from "@/API/api";
import { useMutation } from "@tanstack/react-query";
export const useCreateCommnet = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: functionToCreateCommnet,
    onSuccess: (data) => {
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { mutate, isError, isLoading:isPending };
};
