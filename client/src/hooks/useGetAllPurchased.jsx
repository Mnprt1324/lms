import { funcTOGetAllPurchasedCourse } from "@/API/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPurchased = () => {
  const { data, isError, isPending } = useQuery({
    queryKey: ["purchased"],
    queryFn: funcTOGetAllPurchasedCourse,
    retry:false
  });

  return  { data:data?.data.purchasedCourse, isError, isPending }
};
