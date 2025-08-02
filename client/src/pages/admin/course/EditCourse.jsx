import { NavLink, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { CourseTaab } from "./CourseTaab";
import { useGetCourseById } from "@/hooks/useGetCourseById";
import { Button } from "@/components/ui/button";
import { LoaderA } from "@/components/LoaderA";
export const EditCourse = () => {
  const { courseId } = useParams();
  const { isPending, isError } = useGetCourseById(courseId);
  const course = useSelector((state) => state.course.singleCourse);
  const navigate = useNavigate();
  if (!isError) {
    navigate(1);
  }

  if (isPending) return <LoaderA/>;
  
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
          <h1 className="hidden md:block  font-bold text-xl">
            Let's add lectures, add some basic details for your new lecture
          </h1>
        </div>
        <NavLink to={`/admin/course/lecture/${courseId}`}>
          <Button className="text-blue-600 hover:text-blue-600" variant="link">
            Go to lectures page
          </Button>
        </NavLink>
      </div>
        <h1 className=" mb-5 md:hidden font-bold text-xl">
            Let's add lectures, add some basic details for your new lecture
          </h1>
      <CourseTaab course={course} />
    </div>
  );
};
