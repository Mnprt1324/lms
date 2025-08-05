import { functionToLogin } from "@/API/api";
import { userLoggedIn } from "@/features/userSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLoginUser = (loginForm) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isError,
    isPending,
    mutate: loginMutation,
  } = useMutation({
    mutationFn: functionToLogin,
    onSuccess: (res) => {
      const { error, user, message, token } = res.data;
      if (!error) {
        dispatch(userLoggedIn(user));
        if (token) {
          localStorage.setItem("token", token);
        }
        navigate("/");
        toast.success(message);
        loginForm.reset();
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.errors[0]);
      console.error("Login Error:", error);
    },
  });
  return { loginMutation, isError, isPending };
};
