import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { functionToGetCourse } from "@/API/api";
import { setSingleCourse } from "@/features/courseSlice";

export const useGetCourseById = (courseId) => {
  const dispatch = useDispatch();

  const { data, isError, isPending } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => functionToGetCourse(courseId),
    staleTime: 3 * 60 * 1000, 
    enabled: !!courseId, 
  });

  useEffect(() => {
    if (data?.data?.course) {
      dispatch(setSingleCourse(data.data.course));
    }
  }, [data, dispatch]);

  return { isPending, isError };
};
