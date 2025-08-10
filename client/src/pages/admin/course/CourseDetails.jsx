import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FaRegCirclePlay,
  FaStar,
  FaRegStar,
  FaClock,
  FaUsers,
  FaLanguage,
  FaBookmark,
  FaRegBookmark,
  FaShare,
} from "react-icons/fa6";
import ReactPlayer from "react-player";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderA } from "@/components/LoaderA";
import {
  LockKeyhole,
  Play,
  BookOpen,
  Trophy,
  Globe,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useGetCourseById } from "@/hooks/useGetCourseById";
import { useMakePayment } from "@/hooks/useMakePayment";
import { useState, useEffect } from "react";
import { FaStarHalfAlt } from "react-icons/fa";

export const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isPending, error } = useGetCourseById(courseId);
  const course = useSelector((state) => state.course.singleCourse);
  const user = useSelector((state) => state.auth.user);
  const handlePayment = useMakePayment(courseId);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (course && user) {
      const enrolled = course.enrolledStudents?.some(
        (student) => student._id === user._id
      );
      setIsEnrolled(enrolled);
      // Check if course is bookmarked
      setIsBookmarked(user.bookmarkedCourses?.includes(courseId));
    }
  }, [course, user, courseId]);

  if (isPending || !course) return <LoaderA />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/courses")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const renderStarRating = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  const calculateCourseDuration = () => {
    const totalMinutes =
      course?.lectures?.reduce((total, lecture) => {
        return total + (lecture.duration || 10); // Default 10 mins if no duration
      }, 0) || 0;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add your bookmark logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.courseTitle,
        text: course.subTitle,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  const freeLectures =
    course?.lectures?.filter((lecture) => lecture.isPreviewFree) || [];
  const totalLectures = course?.lectures?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => navigate("/courses")}
              className="hover:text-blue-600 transition-colors"
            >
              Courses
            </button>
            <span>/</span>
            <button
              onClick={() => navigate(`/category/${course.category}`)}
              className="hover:text-blue-600 transition-colors"
            >
              {course.category}
            </button>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">
              {course.courseTitle}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {course.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {course.courseLevel}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {course.courseTitle}
              </h1>

              <p className="text-xl opacity-90 leading-relaxed">
                {course.subTitle}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStarRating(4.5)}
                  </div>
                  <span className="font-medium">4.5 (1,234 reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="w-4 h-4" />
                  <span>{course.enrolledStudents?.length || 0} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  <span>{calculateCourseDuration()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {isEnrolled ? (
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => navigate(`/course-progress/${courseId}`)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => handlePayment()}
                  >
                    Enroll Now - ₹{course.coursePrice}
                  </Button>
                )}

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={handleBookmark}
                >
                  {isBookmarked ? (
                    <FaBookmark className="w-4 h-4 mr-2" />
                  ) : (
                    <FaRegBookmark className="w-4 h-4 mr-2" />
                  )}
                  {isBookmarked ? "Saved" : "Save"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={handleShare}
                >
                  <FaShare className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Right Content - Video Preview */}
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/20">
                {course.lectures?.[0]?.videoUrl ? (
                  <ReactPlayer
                    url={course.lectures[0].videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    light={course.courseThumbnail}
                    playIcon={
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    }
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              {freeLectures.length > 0 && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {freeLectures.length} Free Preview
                  {freeLectures.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className=" max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="bg-white  dark:bg-gray-800 rounded-xl shadow-sm border">
              <div className="flex border-b">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "curriculum", label: "Curriculum" },
                  { id: "instructor", label: "Instructor" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink px-2 py-4 md:px-6 md:py-4 font-medium transition-colors whitespace-nowrap truncate ${
                      activeTab === tab.id
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-600 hover:text-blue-600 dark:text-gray-400"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        What you'll learn
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          "Master the fundamentals of the subject",
                          "Build practical, real-world projects",
                          "Understand advanced concepts and techniques",
                          "Get prepared for industry challenges",
                          "Learn best practices and methodologies",
                          "Develop problem-solving skills",
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                        Course Description
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {course.description ||
                          "This comprehensive course is designed to take you from beginner to advanced level. You'll learn through hands-on projects, real-world examples, and expert guidance."}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                      <div className="text-center">
                        <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FaLanguage className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Language
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          English
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Trophy className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Certificate
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upon completion
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Globe className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Access
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Lifetime
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "curriculum" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Course Content
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {totalLectures} lectures • {calculateCourseDuration()}
                      </div>
                    </div>

                    {course.lectures?.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No lectures available yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {course.lectures?.map((lecture, index) => (
                          <div
                            key={lecture._id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {lecture.isPreviewFree ? (
                                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                                    <FaRegCirclePlay className="w-5 h-5 text-green-600" />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                    <LockKeyhole className="w-4 h-4 text-gray-500" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {index + 1}. {lecture.lectureTitle}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {lecture.isPreviewFree
                                    ? "Free Preview"
                                    : "Premium Content"}
                                </p>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {lecture.duration || 10}min
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "instructor" && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={course.creator?.avatar} />
                        <AvatarFallback className="text-2xl">
                          {course.creator?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {course.creator?.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                          Senior Instructor & Industry Expert
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Passionate educator with years of industry experience.
                          Dedicated to helping students achieve their learning
                          goals through practical, hands-on instruction and
                          real-world projects.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          50+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Courses
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          10k+
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Students
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          4.8
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Rating
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 pb-6 border-b">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                          4.5
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          {renderStarRating(4.5)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          1,234 reviews
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-sm w-3">{star}</span>
                            <FaStar className="w-4 h-4 text-yellow-400" />
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{
                                  width: `${
                                    star === 5
                                      ? 70
                                      : star === 4
                                      ? 20
                                      : star === 3
                                      ? 7
                                      : star === 2
                                      ? 2
                                      : 1
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-10">
                              {star === 5
                                ? "70%"
                                : star === 4
                                ? "20%"
                                : star === 3
                                ? "7%"
                                : star === 2
                                ? "2%"
                                : "1%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage
                                src={`https://images.unsplash.com/photo-147209964${
                                  review + 5785
                                }-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format`}
                              />
                              <AvatarFallback>U{review}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  Student {review}
                                </span>
                                <div className="flex items-center">
                                  {renderStarRating(5)}
                                </div>
                                <span className="text-sm text-gray-500">
                                  2 days ago
                                </span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300">
                                This course exceeded my expectations! The
                                instructor explains complex concepts in a very
                                clear and understandable way. Highly recommended
                                for anyone looking to master this subject.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹{course.coursePrice}
                  </div>
                  {course.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      ₹{course.originalPrice}
                    </div>
                  )}
                </div>

                {isEnrolled ? (
                  <Button
                    className="w-full mb-4 bg-green-600 hover:bg-green-700"
                    onClick={() => navigate(`/course-progress/${courseId}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                ) : (
                  <Button
                    className="w-full mb-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handlePayment()}
                  >
                    Enroll Now
                  </Button>
                )}

                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                  30-day money-back guarantee
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <FaUsers className="w-4 h-4" />
                      Enrolled
                    </span>
                    <Badge variant="secondary">
                      {course.enrolledStudents?.length || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Lectures
                    </span>
                    <Badge variant="secondary">{totalLectures}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <FaClock className="w-4 h-4" />
                      Duration
                    </span>
                    <Badge variant="secondary">
                      {calculateCourseDuration()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Level
                    </span>
                    <Badge variant="secondary">{course.courseLevel}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Students */}
            {course.enrolledStudents?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.enrolledStudents
                      .slice(0, 5)
                      .map((student, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={
                                student.avatar ||
                                `https://images.unsplash.com/photo-147209964${
                                  index + 5785
                                }-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format`
                              }
                            />
                            <AvatarFallback>
                              {student.name?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {student.name || `Student ${index + 1}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              Enrolled recently
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
