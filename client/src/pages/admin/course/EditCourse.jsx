import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGetCourseById } from "../../../../hooks/useGetCourseById";
import { useSelector } from "react-redux";
import { CourseTaab } from "./CourseTaab";
export const EditCourse = () => {
  const { courseId } = useParams();
  const {isPending,isError} = useGetCourseById(courseId);
   const course=useSelector((state)=>state.course.singleCourse)
   const navigate = useNavigate();
  if(!isError){
     navigate(1)
  }

  if(isPending){
    return <><h1>Loading</h1></>
  }
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-5 items-center">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="font-bold text-xl">
            Let's add lectures, add some basic details for your new lecture
          </h1>
        </div>
        <NavLink to={`/admin/course/lecture/${courseId}`}>
          <Button className="hover:text-blue-600" variant="link">
            Go to lectures page
          </Button>
        </NavLink>
      </div>
      <CourseTaab course={course} />
    </div>
  );
};
