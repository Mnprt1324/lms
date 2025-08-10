import { functionToSignup } from "@/API/api";
import { useMutation } from "@tanstack/react-query";

export const useUserSignUp = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationFn: functionToSignup,
    onSuccess: (data) => {
      if (!data.data.error) {
        toast.success(data.data.message);
      }
    },
    onError: (error) => {
      toast.error(
        error?.response.data.message || error.response.data.errors[0]
      );
    },
  });
  return { signMutation: mutate, isError, isPending };
};
