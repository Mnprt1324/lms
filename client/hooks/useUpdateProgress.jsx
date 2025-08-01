import { functionTogetUpdatePrgress } from "@/API/api"
import { useMutation } from "@tanstack/react-query"
export const useUpdateProgress = () => {
 const {mutate,isError,isPending} = useMutation({
  mutationFn:functionTogetUpdatePrgress,
  onSuccess:(data)=>{
    console.log(data);
  },
  onError:(error)=>{
    console.log(error)
  }
 })
 return {updateProgress:mutate}
}
