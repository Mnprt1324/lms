import { functionToGetProfile } from "@/API/api";
import { userLoggedIn } from "@/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Cookie } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetUserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = Cookies.get("token");

  const { isError, data, isSuccess, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: functionToGetProfile, 
    retry: false
  });

  useEffect(() => {
    if (isSuccess && data && !user) {
      dispatch(userLoggedIn(data.user));
    }
  }, [isSuccess, data, user, dispatch]); 

  return { isError, data, isSuccess, isPending };
};
