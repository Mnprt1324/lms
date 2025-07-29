import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useCheckPaymentVerify } from "../../../hooks/useCheckPaymentVerify";

export const CourseCard = ({ course }) => {
  const {isPending,verifyPayment}= useCheckPaymentVerify(course._id);
  const handleOnClick=(e)=>{
    if(!isPending){
      verifyPayment();
    }

  }
  return (
      <Card className="overflow-hidden rounded pt-0 dark:bg-gray-800  bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 " onClick={handleOnClick}>
        <div className="relative">
          <img
            src={
              course.courseThumbnail ||
              "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
            }
            alt="Course Thumbnail"
            className="w-full h-48 object-fit"
          />
        </div>
        <CardContent>
          <h1 className="hover:underline font-medium text-lg mb-2 truncate ">
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

              <p className="text-sm font-medium capitalize">{course?.creator?.name}</p>
            </div>
            <Badge className="w-fit bg-white border-gray-400   text-black text-xs">
              {course?.courseLevel}
            </Badge>
          </div>
        </CardContent>
<Separator />
       <CardFooter className="">
          <p className="text-lg  font-medium ">
            ₹{course.coursePrice}
          </p>
        </CardFooter>
      </Card>
  );
};
