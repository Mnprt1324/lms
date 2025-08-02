import { functionTogetFiltredCourse } from "@/API/api"
import { setFilteredCourse } from "@/features/courseSlice"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { data } from "react-router-dom"

export const useGetFilteredCourse = () => {
    const dispatch=useDispatch()
 const {mutate,isError,isPending,}=useMutation({
    mutationFn:functionTogetFiltredCourse,
    onSuccess:(data)=>{
     dispatch(setFilteredCourse(data.data?.courses || []));
    },
    onError:(error)=>{
    console.log(error)
    }
  })

 return {mutate,isError,isPending}
}
