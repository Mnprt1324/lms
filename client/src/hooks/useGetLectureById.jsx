import { functionToGetLecture } from "@/API/api"
import { useQuery } from "@tanstack/react-query"

export const useGetLectureById = (lectureId) => {
  const {data,isPending,isError}=useQuery({
    queryKey:["lectureId"],
    queryFn:()=> functionToGetLecture(lectureId),
  })
  return {lecture:data?.data.lecture,isPending,isError}
}
