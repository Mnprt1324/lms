
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderA } from "@/components/LoaderA";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, CirclePlay } from "lucide-react";
import { useGetCourseProgress } from "@/hooks/useGetCourseProgress";
import { useCreateCommnet } from "@/hooks/useCreateCommnet";
import { useMarkIsComplete } from "@/hooks/useMarkIsComplete";
import { useUpdateProgress } from "@/hooks/useUpdateProgress";



export const CourseProgress = () => {
  const { courseId } = useParams();
  const { isPending, refetch } = useGetCourseProgress(courseId);
  const { mutate, isLoading } = useCreateCommnet();
  const { ToggleComplete } = useMarkIsComplete();
  const { updateProgress } = useUpdateProgress();
  const courseProgress = useSelector((state) => state.course?.CourseProgress);
  const { courseDetails } = courseProgress;

  const [currentLecture, setCurrentLecture] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (courseDetails?.lectures?.length) {
      setCurrentLecture(courseDetails.lectures[0]);
    }
  }, [courseDetails]);
 useEffect(()=>{
   if(!isPending){
    console.log(courseProgress)
    setIsComplete(courseProgress.completed)
  }
 },[isPending]);
  
  useEffect(() => {
    if (!isLoading) {
      refetch();
    }
  }, [isLoading]);

  useEffect(() => {
    setIsComplete(courseProgress.completed ?? false);
  }, [courseProgress]);

  const handleAddComment = () => {
    mutate(
      { lectureId: currentLecture._id, comment: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          refetch(); // optional to get updated comments
        },
      }
    );
  };

  const handleToggleMark = () => {
    const nextState = !isComplete;
    setIsComplete(nextState);
    console.log("enter");
    ToggleComplete({ courseId, isComplete: nextState });
  };

  const handleOnPlay = () => {
    updateProgress({ courseId, lectureId: currentLecture._id });
  };

  const handleOnEnded = () => {
    ToggleComplete(
      { courseId, lectureId: currentLecture._id },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const hasViewedLecture = (lectureId) => {
    return courseProgress?.progress?.some(
      (item) => item.viewed === true
    );
  };

  if (isPending || !currentLecture) return <LoaderA />;

  return (
    <div className="p-3">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Video & Details */}
        <div className="w-full  lg:w-[65%]">
          <ReactPlayer
            src={currentLecture.videoUrl}
            controls
            onPlay={handleOnPlay}
            // onEnded={handleOnEnded}
            width="100%"
            height="400px"
            className="rounded bg-black overflow-hidden"
          />

          {/* Lecture & Course Titles */}
          <div className="ml-3 mt-4 mb-2">
            <h1 className="font-bold text-xl">{courseDetails.courseTitle}</h1>
            <p className="text-gray-700 text-base">
              {currentLecture.lectureTitle}
            </p>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center ml-3 gap-4 mb-4">
            <Avatar className="w-[55px] h-[55px]">
              <AvatarImage
                src={
                  courseProgress.courseDetails.creator.avatar ||
                  "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">
                {courseProgress.courseDetails.creator.name}
              </p>
              <p className="text-sm text-gray-600">Instructor</p>
            </div>
          </div>

          {/* Description Box (Collapsible) */}
          <div className="ml-3 mb-5">
            <Collapsible className="border rounded-md ">
              <CollapsibleTrigger className="w-full px-4 py-2 text-left font-semibold border-b bg-white rounded-t-md">
                Course Description
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3 text-sm text-gray-700">
                {courseDetails.description ||
                  "No description provided for this course."}
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Comments Section */}
          <div className="shadow rounded-lg px-4 py-4 ml-3">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>

            {/* Comment Input */}
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <Button onClick={handleAddComment}>Post</Button>
            </div>

            {/* Comment List */}
            <div className="space-y-3 overflow-x-hidden h-52 ov">
              {currentLecture.comments.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet.</p>
              ) : (
                currentLecture.comments.map((c) => (
                  <div key={c._id} className="border-b pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage
                          src={c.userId?.avatar || "https://github.com/shadcn.png"}
                        />
                        <AvatarFallback>
                          {c.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-sm capitalize">
                        {c.userId?.name || "Unknown"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-800 ml-12 mt-1">
                      {c.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Lecture List */}
        
        <div className="w-full lg:w-[35%] border rounded-lg p-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold mx-0 my-auto">All Lectures</h2>
            <Button
              variant={isComplete ? "outline" : ""}
              onClick={handleToggleMark}
            >
              {isComplete ? "Completed" : "Mark as Completed"}
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {courseDetails?.lectures?.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() => setCurrentLecture(lecture)}
                className={`cursor-pointer px-4 py-2 rounded-md border transition ${
                  currentLecture._id === lecture._id
                    ? "bg-gray-100 border-gray-400"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                  {hasViewedLecture(lecture._id) || isComplete ? (
                      <CircleCheckBig className="text-green-500 text-sm" />
                    ) : (
                      <CirclePlay className="text-gray-700" />
                    )}
                    <p>{lecture.lectureTitle}</p>
                  </div>
                  {hasViewedLecture(lecture._id)||isComplete && (
                    <Badge className="bg-green-500">Complete</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
