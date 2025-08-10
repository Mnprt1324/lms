import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderA } from "@/components/LoaderA";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  CircleCheckBig, 
  CirclePlay, 
  Clock, 
  Users, 
  MessageCircle,
  ChevronDown 
} from "lucide-react";
import { useGetCourseProgress } from "@/hooks/useGetCourseProgress";
import { useCreateCommnet } from "@/hooks/useCreateCommnet";
import { useMarkIsComplete } from "@/hooks/useMarkIsComplete";
import { useUpdateProgress } from "@/hooks/useUpdateProgress";

export const CourseProgress = () => {
  const { courseId } = useParams();
  const { isPending, refetch, error } = useGetCourseProgress(courseId);
  const { mutate: createComment, isLoading: isCommentLoading } = useCreateCommnet();
  const { ToggleComplete, isLoading: isToggleLoading } = useMarkIsComplete();
  const { updateProgress } = useUpdateProgress();

  const courseProgress = useSelector((state) => state.course?.CourseProgress);
  const { courseDetails } = courseProgress || {};

  // State management
  const [currentLecture, setCurrentLecture] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Memoized values
  const completedLecturesCount = useMemo(() => {
    if (!courseProgress?.progress) return 0;
    return courseProgress.progress.filter(item => item.viewed).length;
  }, [courseProgress?.progress]);

  const totalLectures = courseDetails?.lectures?.length || 0;
  const progressPercentage = totalLectures > 0 ? (completedLecturesCount / totalLectures) * 100 : 0;

  // Initialize current lecture
  useEffect(() => {
    if (courseDetails?.lectures?.length && !currentLecture) {
      // Find first uncompleted lecture or default to first
      const uncompletedLecture = courseDetails.lectures.find(lecture => 
        !hasViewedLecture(lecture._id)
      );
      setCurrentLecture(uncompletedLecture || courseDetails.lectures[0]);
    }
  }, [courseDetails, currentLecture]);

  // Update completion status
  useEffect(() => {
    if (!isPending) {
      setIsComplete(courseProgress?.completed ?? false);
    }
  }, [isPending, courseProgress?.completed]);

  // Refetch after comment creation
  useEffect(() => {
    if (!isCommentLoading) {
      refetch();
    }
  }, [isCommentLoading, refetch]);

  // Optimized event handlers
  const handleAddComment = useCallback(() => {
    if (!commentText.trim() || !currentLecture?._id) return;
    
    createComment(
      { lectureId: currentLecture._id, comment: commentText.trim() },
      {
        onSuccess: () => {
          setCommentText("");
          refetch();
        },
        onError: (error) => {
          console.error('Failed to add comment:', error);
        }
      }
    );
  }, [commentText, currentLecture?._id, createComment, refetch]);

  const handleToggleMark = useCallback(() => {
    const nextState = !isComplete;
    setIsComplete(nextState);
    ToggleComplete({ courseId, isComplete: nextState });
  }, [isComplete, courseId, ToggleComplete]);

  const handleOnPlay = useCallback(() => {
    if (currentLecture?._id) {
      updateProgress({ courseId, lectureId: currentLecture._id });
    }
  }, [courseId, currentLecture?._id, updateProgress]);

  const handleOnEnded = useCallback(() => {
    if (currentLecture?._id) {
      ToggleComplete(
        { courseId, lectureId: currentLecture._id },
        {
          onSuccess: () => refetch(),
        }
      );
    }
  }, [courseId, currentLecture?._id, ToggleComplete, refetch]);

  const handleLectureSelect = useCallback((lecture) => {
    setCurrentLecture(lecture);
    setVideoError(false);
  }, []);

  const hasViewedLecture = useCallback((lectureId) => {
    return courseProgress?.progress?.some(
      (item) => item.lectureId === lectureId && item.viewed
    );
  }, [courseProgress?.progress]);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  // Loading state
  if (isPending) return <LoaderA />;

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6">
          <CardContent className="text-center">
            <p className="text-red-500 font-medium">Failed to load course progress</p>
            <Button onClick={refetch} className="mt-4">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-6">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold">{courseDetails?.courseTitle}</h1>
            <Badge variant={isComplete ? "default" : "secondary"} className="text-sm">
              {isComplete ? "Completed" : `${completedLecturesCount}/${totalLectures} lectures`}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% complete</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Video & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <Card>
            <CardContent className="p-0">
              {videoError ? (
                <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                  <p className="text-white">Failed to load video</p>
                </div>
              ) : (
                <ReactPlayer
                  url={currentLecture?.videoUrl}
                  controls
                  onPlay={handleOnPlay}
                  onEnded={handleOnEnded}
                  onError={handleVideoError}
                  width="100%"
                  height="400px"
                  className="rounded-t-lg overflow-hidden"
                />
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {currentLecture?.lectureTitle || "Select a lecture"}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {currentLecture?.duration || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{currentLecture?.comments?.length || 0} comments</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructor Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={courseDetails?.creator?.avatar || "https://github.com/shadcn.png"}
                    alt={courseDetails?.creator?.name}
                  />
                  <AvatarFallback>
                    {courseDetails?.creator?.name?.charAt(0)?.toUpperCase() || "I"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">
                    {courseDetails?.creator?.name || "Instructor"}
                  </h3>
                  <p className="text-gray-600">Course Instructor</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {courseDetails?.creator?.bio || "Experienced educator"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Description */}
          <Card>
            <Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
              <CollapsibleTrigger className="w-full p-4 text-left font-semibold border-b hover:bg-gray-50 transition-colors flex items-center justify-between">
                Course Description
                <ChevronDown className={`w-4 h-4 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 text-gray-700 leading-relaxed">
                  {courseDetails?.description || "No description provided for this course."}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Comments</h3>
              </div>

              {/* Comment Input */}
              <div className="mb-6">
                <Textarea
                  placeholder="Share your thoughts about this lecture..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {commentText.length}/500 characters
                  </span>
                  <Button 
                    onClick={handleAddComment} 
                    disabled={!commentText.trim() || isCommentLoading}
                    size="sm"
                  >
                    {isCommentLoading ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {currentLecture?.comments?.length > 0 ? (
                  currentLecture.comments.map((comment) => (
                    <div key={comment._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage
                            src={comment.userId?.avatar || "https://github.com/shadcn.png"}
                            alt={comment.userId?.name}
                          />
                          <AvatarFallback>
                            {comment.userId?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm capitalize mb-1">
                            {comment.userId?.name || "Anonymous"}
                          </p>
                          <p className="text-sm text-gray-800 break-words">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Lecture List */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Course Content</h2>
                <Button
                  variant={isComplete ? "outline" : "default"}
                  onClick={handleToggleMark}
                  disabled={totalLectures === 0 || isToggleLoading}
                  size="sm"
                >
                  {isToggleLoading ? "Updating..." : isComplete ? "Completed" : "Mark Complete"}
                </Button>
              </div>
              
              <div className="space-y-2">
                {totalLectures === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-medium">No lectures available</p>
                  </div>
                ) : (
                  courseDetails.lectures.map((lecture, index) => (
                    <div
                      key={lecture._id}
                      onClick={() => handleLectureSelect(lecture)}
                      className={`cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                        currentLecture?._id === lecture._id
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "hover:bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {hasViewedLecture(lecture._id) || isComplete ? (
                            <CircleCheckBig className="w-5 h-5 text-green-500" />
                          ) : (
                            <CirclePlay className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {index + 1}. {lecture.lectureTitle}
                          </p>
                          {lecture.duration && (
                            <p className="text-xs text-gray-500 mt-1">
                              {lecture.duration}
                            </p>
                          )}
                        </div>
                        {(hasViewedLecture(lecture._id) || isComplete) && (
                          <Badge size="sm" className="bg-green-100 text-green-800 text-xs">
                            Done
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};