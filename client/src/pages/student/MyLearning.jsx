import { useSelector } from "react-redux";
import { CourseCard } from "./CourseCard";

export const MyLearning = () => {
  const isLoading = false;
   const user = useSelector((state) => state.auth.user);
   console.log(user)
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="text-2xl font-bold"> MyLearning</h1>
      <div className="my-5">{isLoading ? <MyLearningSkeleton /> :(
       <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
         {
         user.enrollCourses.map((course,index)=>(
            <CourseCard course={course} key={course._id}/>
         ))
         }   
       </div>
      )}</div>
    </div>
  );
};

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
