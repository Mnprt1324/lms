import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";

export const CourseCard = ({ course }) => {
  return (
    <NavLink to={`/course/${course._id}`}>
      <Card className="overflow-hidden rounded-lg pt-0 dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={
              course.courseThumbnail ||
              "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
            }
            alt="Course Thumbnail"
            className="w-full h-48 object-fit rounded-t-lg"
          />
        </div>
        <CardContent>
          <h1 className="hover:underline font-bold text-lg mb-2 truncate">
            {course.courseTitle}
          </h1>
          <div className="flex justify-between  items-center gap-3">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={
                    course.creator?.avatar || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>MP</AvatarFallback>
              </Avatar>

              <p className="text-sm font-medium">{course?.creator?.name}</p>
            </div>
            <Badge className="w-fit bg-blue-600 text-white text-xs">
              {course?.courseLevel}
            </Badge>
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-lg  font-bold text-gray-800">
            ₹{course.coursePrice}
          </p>
        </CardFooter>
      </Card>
    </NavLink>
  );
};
