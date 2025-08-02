import { functionToGetFeedBack } from "@/API/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllFeedBack = () => {
  const { isPending, data } = useQuery({
    queryKey: ["feedback"],
    queryFn: functionToGetFeedBack,
    retry:false
  });
  return { isPending, data };
};
