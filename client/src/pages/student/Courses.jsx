import { Skeleton } from "@/components/ui/skeleton";
import { CourseCard } from "./CourseCard";
import { useGetPublicCourse } from "@/hooks/useGetPublicCourse";
import { useSelector } from "react-redux";
export const Courses = () => {
  const {isError,isPending}= useGetPublicCourse();
  const Allcourses=useSelector((state)=>state.course.allPublicCourse)
  console.log(isError)
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 flex-col">
        <h1 className=" text-3xl font-medium ">Our Courses</h1>
         <div className="w-[120px] h-1 bg-blue-500 rounded-full"></div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isPending
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : Allcourses?.map((course, index) => <CourseCard key={index} course={course} />)}
        </div>
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
