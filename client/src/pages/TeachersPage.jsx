import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accodian } from "./home/Accodian";
import { Feedback } from "./home/Feedback";
import { FaStar, FaStarHalf, FaGraduationCap, FaUsers, FaBookOpen } from "react-icons/fa6";
import { useGetInstructor } from "@/hooks/useGetInstructor";
import { LoaderA } from "@/components/LoaderA";

export const TeachersPage = () => {
  const { isPending, error, instructor } = useGetInstructor();

  if (isPending) return <LoaderA />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message || "Failed to load instructors"}
          </p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our Expert Instructors
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Learn from industry professionals who are passionate about sharing their knowledge 
            and helping you achieve your goals.
          </p>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {instructor && instructor.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Teaching Excellence
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {instructor.length} experienced instructor{instructor.length !== 1 ? 's' : ''} 
                  ready to guide your learning journey
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {instructor.map((ins, index) => (
                  <InstructorCard key={ins._id || index} instructor={ins} />
                ))}
              </div>
            </>
          ) : (
            <EmptyInstructorsState />
          )}
        </div>
      </section>

      {/* Additional Sections */}
      <Accodian />
      <Feedback />
    </div>
  );
};

// Individual instructor card component
const InstructorCard = ({ instructor }) => {
  const {
    name,
    avatar,
    bio,
    rating = 4.0,
    totalStudents = 0,
    totalCourses = 0,
    expertise = [],
    _id
  } = instructor;

  return (
    <article className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col">
      {/* Avatar and Basic Info */}
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar className="w-24 h-24 mb-4 ring-4 ring-blue-100 dark:ring-blue-900 group-hover:ring-blue-200 dark:group-hover:ring-blue-800 transition-all">
          <AvatarImage src={avatar} alt={`${name}'s profile picture`} />
          <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={rating} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({rating?.toFixed(1) || "New"})
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <FaUsers className="text-blue-500" />
            <span>{formatNumber(totalStudents)} students</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBookOpen className="text-green-500" />
            <span>{totalCourses} courses</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="flex-grow mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
          {bio || "Experienced instructor passionate about teaching and helping students achieve their learning goals."}
        </p>
      </div>

      {/* Expertise Tags */}
      {expertise && expertise.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {expertise.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
            {expertise.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                +{expertise.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <button 
        className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        onClick={() => handleViewProfile(_id)}
      >
        View Profile
      </button>
    </article>
  );
};

// Star rating component
const StarRating = ({ rating = 0, maxStars = 5 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalf key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300 dark:text-gray-600" />);
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
};

// Empty state component
const EmptyInstructorsState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
      <FaGraduationCap className="w-12 h-12 text-gray-400" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      No Instructors Found
    </h2>
    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
      We're currently building our team of expert instructors. Check back soon for amazing teachers!
    </p>
  </div>
);

// Utility functions
const getInitials = (name) => {
  if (!name) return "IN";
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num?.toString() || "0";
};

const handleViewProfile = (instructorId) => {
  if (instructorId) {
    // Navigate to instructor profile
    window.location.href = `/instructor/${instructorId}`;
  }
};