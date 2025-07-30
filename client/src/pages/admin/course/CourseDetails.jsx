import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCourseById } from "../../../../hooks/useGetCourseById";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaRegCirclePlay } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMakePayment } from "../../../../hooks/useMakePayment";
import { LoaderA } from "@/components/LoaderA";

export const CourseDetails = () => {
  const { courseId } = useParams();
  const { isPending } = useGetCourseById(courseId);
  const course = useSelector((state) => state.course.singleCourse);
  const handlePayment = useMakePayment(courseId);

  if (isPending) return <LoaderA />;

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              {course?.courseTitle}
            </h1>
            <p className="text-lg">{course?.subTitle}</p>
            <div className="flex gap-4 items-center">
              <Button className="bg-slate-900">Get Started</Button>
              <p>
                <Badge>{course?.enrolledStudents?.length || 0}</Badge> Students
              </p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src={course?.courseThumbnail}
              className="w-full object-cover max-h-80"
              alt="Course Thumbnail"
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-7xl px-6 md:px-20 py-12 grid lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card className="bg-zinc-100">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>{course?.description}</CardContent>
            <CardFooter>
              <p>@createdBy {course?.creator?.name || "Unknown"}</p>
            </CardFooter>
          </Card>

          {/* Course Content */}
          <Card className="bg-zinc-100">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.map((lecture) => (
                <div
                  key={lecture._id}
                  className="bg-slate-300 h-14 flex items-center gap-4 px-4 rounded-lg"
                >
                  <FaRegCirclePlay className="text-xl" />
                  <span className="font-semibold">{lecture.lectureTitle}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Instructor Info */}
          <Card className="bg-zinc-100">
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-5">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={course?.creator?.avatar || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">
                  {course?.creator?.name?.toUpperCase() || "No Name"}
                </p>
                <p className="font-medium">Advance Educator</p>
                <p className="text-sm text-gray-600">
                  Passionate about helping students achieve their goals.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="bg-zinc-100">
            <CardHeader>
              <CardTitle>
                <h1 className="text-2xl">₹{course?.coursePrice}</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-5" onClick={() => handlePayment()}>
                Buy Now
              </Button>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold">Enrolled</span>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    {course?.enrolledStudents?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Lectures</span>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    {course?.lectures?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Skill Level</span>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    {course?.courseLevel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Video */}
          {course?.lectures?.length > 0 && (
            <Card className="bg-zinc-100">
              <CardHeader>
                <CardTitle>Lecture Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ReactPlayer
                  url={course?.lectures[0]?.videoUrl}
                  controls={true}
                  width="100%"
                  height="200px"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};
