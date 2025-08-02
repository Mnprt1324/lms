import { functionTogetCoursesProgress } from "@/API/api";
import { setCourseProgress } from "@/features/courseSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useGetCourseProgress = (courseId) => {
  const dispatch = useDispatch();
  const { data, isError, isPending ,refetch } = useQuery({
    queryKey: [courseId],
    queryFn: () => functionTogetCoursesProgress(courseId),
   staleTime:1 * 60 * 1000
  });
  if (!isPending) {
    dispatch(setCourseProgress(data?.data?.data));
  }

  return { data, isError, isPending,refetch };
};
