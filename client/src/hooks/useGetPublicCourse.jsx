import { functionToGetPublishCourses } from "@/API/api"
import { setPublicCourse } from "@/features/courseSlice";
import { useQuery } from "@tanstack/react-query"
import { useDispatch } from "react-redux"

export const useGetPublicCourse = () => {
    const dispatch=useDispatch();
    const {data, isPending,isError} =useQuery({
    queryKey:["co"],
    queryFn:functionToGetPublishCourses,
    staleTime:1 * 60 * 1000
 })
 if(!isPending){
  dispatch(setPublicCourse(data?.data.courses))
 }
 return {isPending,isError};
}
