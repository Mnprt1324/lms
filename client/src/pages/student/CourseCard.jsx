import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const CourseCard = () => {
  return (
    <Card className="overflow-hidden rounded-lg pt-0 dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="Course Thumbnail"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
         <h1 className="hover:underline font-bold text-lg mb-2 truncate">
           next.js compelete course
        </h1>
        <div className="flex justify-between  items-center gap-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>MP</AvatarFallback>
            </Avatar>

            <p className="text-sm font-medium">Manpreet</p>
          </div>
          <Badge className="w-fit bg-blue-600 text-white text-xs">Medium</Badge>
        </div>
      </CardContent>

      <CardFooter>
        <p className="text-lg  font-bold text-gray-800">₹499</p>
      </CardFooter>
    </Card>
  );
};
