import { NavLink, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { CourseTab } from "./courseTab";
;


export const EditCourse = () => {
  const {courseId}=useParams();

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
      Let's add lectures, add some basic details for your new lecture
        </h1>
        <NavLink to={`/admin/course/lecture/${courseId}`}>
          <Button className="hover:text-blue-600" variant="link">
            Go to lectures page
          </Button>
        </NavLink>
      </div>
      <CourseTab/>
    </div>
  );
};
