import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCheckPaymentVerify } from "@/hooks/useCheckPaymentVerify";
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export const CourseCard = ({ course }) => {
  const { isPending, verifyPayment } = useCheckPaymentVerify(course._id);
  const handleOnClick = () => {
    if (!isPending) {
      verifyPayment();
    }
  };

  return (
    <Card
      className="  pt-0 gap-5 overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow hover:shadow-xl hover:scale-[1.01] transition-all duration-200 cursor-pointer w-full max-w-[370px] mx-auto"
      onClick={handleOnClick}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={
            course.courseThumbnail ||
            "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          }
          alt="Course Thumbnail"
          className="w-full h-36 object-cover"
        />
      </div>

      {/* Content */}
      <CardContent className=" flex flex-col gap-2">
        <h1 className="hover:underline font-medium text-sm line-clamp-2 truncate">
          {course.courseTitle}
        </h1>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={course.creator?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 dark:text-gray-300 capitalize">
              {course?.creator?.name || "Instructor"}
            </span>
          </div>

          <Badge variant="outline" className="text-[10px] capitalize">
            {course?.courseLevel || "Beginner"}
          </Badge>
        </div>
      </CardContent>

      <Separator />
      <CardFooter className="flex items-center justify-between">
        <div>
          <p className="text-base font-medium text-gray-800 dark:text-white">
            ₹{course.coursePrice}
          </p>
          <p className="flex  gap-1 text-md text-gray-500 text-sm dark:text-gray-400">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-gray-400" />
          </p>
        </div>
        <div>
          <Button >View</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
