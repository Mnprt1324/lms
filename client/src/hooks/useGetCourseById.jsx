import { functionToGetCourse } from "@/API/api";
import { setSingleCourse } from "@/features/courseSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useGetCourseById = (courseId) => {
  const dispatch=useDispatch();
  const { data, isError, isPending } = useQuery({
    queryKey: [courseId],
    queryFn: () => functionToGetCourse(courseId),
     staleTime:1 * 60 * 1000
  });
  if(!isPending){
    dispatch(setSingleCourse(data?.data?.course))
  }

  return { isPending, isError };
};
