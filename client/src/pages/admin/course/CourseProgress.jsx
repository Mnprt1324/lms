import { Button } from "@/components/ui/button";
import { useGetCourseProgress } from "../../../../hooks/useGetCourseProgress";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoaderA } from "@/components/LoaderA";

// Example props: pass from parent or fetch via Redux or query
const dummyCourse = {
  title: "Full Stack Web Development",
  lectures: [
    {
      _id: "1",
      title: "Introduction to Web Dev",
      videoUrl:
        "https://stream.mux.com/maVbJv2GSYNRgS02kPXOOGdJMWGU1mkA019ZUjYE7VU7k.m3u8",
    },
    {
      _id: "2",
      title: "HTML Basics",
      videoUrl: "https://stream.mux.com/anotherMuxId.m3u8",
    },
    {
      _id: "3",
      title: "CSS Styling",
      videoUrl: "https://stream.mux.com/thirdMuxId.m3u8",
    },
  ],
};

export const CourseProgress = () => {
  const [currentLecture, setCurrentLecture] = useState(dummyCourse.lectures[0]);
  const { courseId } = useParams();
  const { isPending, isError } = useGetCourseProgress(courseId);
  const courseProgress = useSelector((state) => state.course.CourseProgress);
const {courseDetails}=courseProgress
console.log(currentLecture);
  // console.log(courseProgress);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[75%] flex items-center justify-between py-5">
        <h1 className="font-bold text-3xl">{courseDetails?.courseTitle}</h1>
        <Button>Complete</Button>
      </div>

      <div className="flex items-center justify-between w-[75%] bg-re">
        <div className="flex items-start justify-between w-full  ">
          {/* Video Player Section */}
          <div className="shadow-2xl rounded-xl p-5">
            <div className="w-[700px] h-[400px]">
              <ReactPlayer
                src={currentLecture.videoUrl}
                controls
                width="100%"
                height="100%"
              />
            </div>
            <div className="mt-3 font-semibold text-lg">
              {currentLecture.lectureTitle}
            </div>
          </div>
          {/* Lecture List */}
          <div className="shadow-2xl p-5 w-[450px] ml-5">
            <h1 className="font-bold text-2xl mb-3">Course Lectures</h1>
            <div className="flex flex-col gap-5">
              {courseDetails?.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`cursor-pointer font-bold py-3 px-5 shadow-lg rounded-lg border ${
                    currentLecture._id === lecture._id
                      ? "bg-green-200 border-green-500"
                      : "border-green-300"
                  }`}
                >
                  {lecture.lectureTitle}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
