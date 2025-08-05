import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRegCirclePlay } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LoaderA } from "@/components/LoaderA";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Lock, LockKeyhole } from "lucide-react";
import { useGetCourseById } from "@/hooks/useGetCourseById";
import { useMakePayment } from "@/hooks/useMakePayment";

export const CourseDetails = () => {
  const { courseId } = useParams();
  const { isPending, error } = useGetCourseById(courseId);
  const course = useSelector((state) => state.course.singleCourse);
  const handlePayment = useMakePayment(courseId);

  console.log(course);
  if (isPending||!course) return <LoaderA />;
  if (error) return <div>Error loading course data</div>;

  return (
    <div className="flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-16 px-6 md:px-20 relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {course?.courseTitle}
            </h1>
            <p className="text-lg md:text-xl">{course?.subTitle}</p>
            <div className="flex gap-4 items-center">
              <Button className="bg-slate-900 hover:bg-slate-800 transition-colors duration-200">
                Get Started
              </Button>
              <p className="flex items-center gap-1 text-lg">
                <Button variant={"outline"} className={"text-black"}>
                  {" "}
                  {course?.enrolledStudents?.length || 0} Students
                </Button>
                {/* <Badge>{course?.enrolledStudents?.length || 0 }  Students</Badge> */}
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src={course?.courseThumbnail}
              className="w-full object-cover max-h-80 md:max-h-[400px] rounded-2xl transition-transform duration-300 hover:scale-105"
              alt="Course Thumbnail"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-7xl px-3 md:px-20 py-12 grid lg:grid-cols-3  gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8 order-2">
          {/* Course Content */}
          <Card className="shadow-md rounded-lg border-t-4 border-blue-50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Course Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures?.length === 0 ? (
                <p className="text-center text-gray-500 text-sm">
                  No lectures available.
                </p>
              ) : (
                <>
                  {course?.lectures?.map((lecture) => (
                    <div
                      key={lecture._id}
                      className="border-1 border-gray-300 hover:bg-slate-100 rounded-lg p-4 flex items-center gap-4 cursor-pointer transition-colors duration-300 
                  sm:flex-row sm:p-2 sm:gap-2 lg:flex-row lg:p-4 lg:gap-4"
                    >
                      {lecture.isPreviewFree ? (
                        <FaRegCirclePlay className="text-xl" />
                      ) : (
                        <LockKeyhole className="text-sm" />
                      )}
                      <span className="font-semibold text-sm sm:text-base ">
                        {lecture?.lectureTitle}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <div className="mb-5">
            <Collapsible
              open={true}
              className="border rounded-md shadow-lg transition-all ease-in-out duration-300"
            >
              <CollapsibleTrigger className="w-full px-4 py-2 text-left font-semibold border-b  bg-white rounded-t-md hover:bg-slate-100">
                Course Description
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3 text-sm bg-white text-gray-700">
                {course?.description ||
                  "No description provided for this course."}
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Instructor Info */}
          <Card className="shadow-lg pt-2 gap-2 rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg p-0 font-semibold">
                Instructor
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6 ">
              <Avatar className="w-20 h-20 hover:scale-105 transition-transform duration-300">
                <AvatarImage
                  src={
                    course?.creator?.avatar || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">
                  {course?.creator?.name?.toUpperCase()}
                </p>
                <p className="font-medium text-sm">Advanced Educator</p>
                <p className="text-sm  text-gray-600">
                  Passionate about helping students achieve their goals.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="order-1  space-y-8">
          <Card className="shadow-lg pt-2 gap-2 rounded-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Enroll Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center ">
              <div className="w-full flex justify-center items-center">
                <ReactPlayer
                  src={course?.lectures?.[0]?.videoUrl || ""}
                  controls={true}
                  width="100%"
                  height="180px"
                />
              </div>
              <h1 className="text-2xl  text-left  mt-4">
                ₹{course?.coursePrice}
              </h1>
              <Button
                className="w-full mb-5 py-3 bg-gray-900 hover:bg-gray-800 cursor-pointer text-white transition-colors duration-300 rounded-lg"
                onClick={() => handlePayment()}
              >
                Buy Now
              </Button>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Enrolled</span>
                  <span className="bg-slate-200 text-gray-700 px-3 py-1 rounded-full">
                    {course?.enrolledStudents?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Lectures</span>
                  <span className="bg-slate-200 text-gray-700 px-3 py-1 rounded-full">
                    {course?.lectures?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Skill Level</span>
                  <span className="bg-slate-200 text-gray-700 px-3 py-1 rounded-full">
                    {course?.courseLevel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="hidden md:visible shadow-lg bg-white border md:flex flex-col  gap-3 p-3 rounded-lg">
            <div className="font-semibold">Enrolled students</div>
            <div className="flex gap-10 w-full justify-around">
              <div>
                <Avatar className="w-20 h-20 hover:scale-105 transition-transform duration-300">
                  <AvatarImage src={"https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-center">jashan</p>
              </div>
              <div>
                <Avatar className="w-20 h-20 hover:scale-105 transition-transform duration-300">
                  <AvatarImage
                    src={
                      course?.creator?.avatar || "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-center">Abdul</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
