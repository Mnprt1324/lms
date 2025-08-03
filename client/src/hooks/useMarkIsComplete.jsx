import { functionToMarkCompelete } from "@/API/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useMarkIsComplete = () => {
  const {mutate,isError,isPending}=useMutation({
   mutationFn:functionToMarkCompelete,
   onSuccess:(data)=>{
    if(data.data.message){
      toast.success(data.data.message)
    }
   },
   onError:(error)=>{
    
    toast.success(error?.response.data.message||"something went wrong")
  
   }
  })
  return {ToggleComplete:mutate,isError,isFecthing:isPending}
}
