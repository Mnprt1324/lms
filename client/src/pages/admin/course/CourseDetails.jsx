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
import { PaymentDemo } from "@/pages/PaymentDemo";
import { useMakePayment } from "../../../../hooks/useMakePayment";
import { useState } from "react";
import { set } from "zod";
export const CourseDetails = () => {
  const { courseId } = useParams();

  const handlePayment = useMakePayment(courseId);
  const { isPending, isError } = useGetCourseById(courseId);
  const course = useSelector((state) => state.course.singleCourse);

  if (isPending)
    return (
      <>
        <h1>loading</h1>
      </>
    );
  console.log(course);
  return (
    <div className="flex  items-center flex-col">
      <div className=" h-100 flex items-center justify-center  bg-gradient-to-r from-blue-500 to bg-green-600">
        <div className="h-100 w-[85%] px-20 py-10 flex gap-5 ">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-5xl w-[500px]">
              {course?.courseTitle}
            </h1>
            <p className="w-[550px]">{course?.subTitle}</p>
            <div className="flex items-center gap-5">
              <Button className="bg-slate-900 w-25">Get Started</Button>
              <p>
                <Badge>0 </Badge> Students enroll
              </p>
            </div>
          </div>
          <div className="bg-amber-100 rounded-3xl">
            <img
              src={course?.courseThumbnail}
              className="object-contain rounded-3xl"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="h-100 w-[85%] px-20 py-10 mb-28 flex gap-10 ">
        <div className="">
          <div className="mb-5">
            <Card className="w-[700px] h-100 bg-zinc-100 ">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Descrption</h1>
                </CardTitle>
              </CardHeader>
              <CardContent>{course?.description}</CardContent>
              <CardFooter>
                <p>@createdBy {course?.creater?.name || "no User"} </p>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card className="w-[700px] bg-zinc-100 mb-5">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Course content</h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {course.lectures.map((lecture, index) => (
                    <div
                      key={lecture._id}
                      className="bg-slate-300 h-14 flex items-center gap-6 px-4 rounded-lg"
                    >
                      <div>
                        <FaRegCirclePlay className="text-xl" />
                      </div>
                      <div className="font-bold">{lecture.lectureTitle}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mb-10">
            <Card className=" bg-zinc-100 ">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Instructor</h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=" flex items-center gap-5">
                  <div>
                    <Avatar className="w-32 h-32">
                      <AvatarImage
                        src={
                          course.creator.avatar ||
                          "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="">
                    <p className="font-bold text-lg">
                      {course?.creator?.name.toUpperCase() || "No mane"}
                    </p>
                    <p className="font-medium">{"Advance Educator"}</p>
                    <p className="text-sm">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Iusto
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div>
          <Card className="w-2xs bg-zinc-100 ">
            <CardHeader>
              <CardTitle>
                <h1 className="text-2xl">₹{course.coursePrice}</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Button
                  className="w-full mb-5"
                  onClick={(e) => handlePayment()}
                >
                  Buy Now
                </Button>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Enrolled</p>
                    <p className="bg-green-100 text-green-500 px-8 rounded-2xl">
                      {course.enrolledStudents.length}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Lectures</p>
                    <p className="bg-green-100 text-green-500 px-8 rounded-2xl">
                      {course.lectures.length}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">Skill level</p>
                    <p className="bg-green-100 text-green-500 px-8 rounded-2xl">
                      {course.courseLevel}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="mt-10">
            <Card className="w-auto bg-zinc-100 ">
              <CardHeader>
                <CardTitle>
                  <h1 className="text-2xl">Lecture Video</h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReactPlayer
                  src={course?.lectures[0]?.videoUrl}
                  controls={true}
                  config={{
                    youtube: {
                      color: "white",
                    },
                  }}
                />
              </CardContent>
              <CardFooter>
                <p>@createdBy {course?.creater?.name || "no User"} </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
