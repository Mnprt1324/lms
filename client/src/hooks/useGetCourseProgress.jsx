import { functionTogetCoursesProgress } from "@/API/api";
import { setCourseProgress } from "@/features/courseSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useGetCourseProgress = (courseId) => {
  const dispatch = useDispatch();
  const { data, isError, isPending ,refetch } = useQuery({
    queryKey: [courseId],
    queryFn: () => functionTogetCoursesProgress(courseId),
   staleTime:1 * 60 * 1000
  });
useEffect(() => {
    if (data?.data?.data) {
      dispatch(setCourseProgress(data.data.data));
    }
  }, [data, dispatch]);


  return { isError, isPending,refetch };
};
