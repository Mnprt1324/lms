import { functionTogetCourses } from '@/API/api';
import { userCoures } from '@/features/courseSlice';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

export const useGetCourse = () => {
    const dispatch=useDispatch();
 const { data, isError, isPending } = useQuery({
    queryKey: ["course"],
    queryFn: functionTogetCourses,
  });
 
if(!isPending){
    dispatch(userCoures(data?.data.courses))
}
return {isPending,isError};
}
