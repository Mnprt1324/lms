import { functionTogetAllInstructor } from "@/API/api";
import { useQuery } from "@tanstack/react-query";

export const useGetInstructor = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["instructor"],
    queryFn: functionTogetAllInstructor,
    retry:false
  });
  return { isPending, error, instructor:data?.data.instructor };
};
