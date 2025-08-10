import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetInstructor } from "@/hooks/useGetInstructor";
import { FaStar, FaChalkboardTeacher, FaUsers, FaMedal } from "react-icons/fa";
import { useState } from "react";

// Loading skeleton component
const InstructorSkeleton = () => (
  <div className="flex flex-col items-center bg-white dark:bg-gray-900 border rounded-xl shadow-lg p-6 gap-4 text-center animate-pulse">
    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
    </div>
    <div className="space-y-2 w-full">
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
    <div className="flex justify-between w-full mt-2">
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
    </div>
  </div>
);

// Rating component
const StarRating = ({ rating = 0, totalStars = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: totalStars }, (_, i) => (
          <FaStar 
            key={i}
            className={`w-3.5 h-3.5 transition-colors ${
              i < Math.floor(rating) 
                ? "text-yellow-400" 
                : i < rating 
                ? "text-yellow-300" 
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

// Individual instructor card
const InstructorCard = ({ instructor, index }) => {
  const [imageError, setImageError] = useState(false);
  
  // Get initials for fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="group relative overflow-hidden">
      <div className="flex flex-col items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 gap-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600">
        {/* Avatar with enhanced styling */}
        <div className="relative">
          <Avatar className="w-20 h-20 ring-4 ring-blue-100 dark:ring-blue-900/30 transition-all group-hover:ring-blue-200 dark:group-hover:ring-blue-800/50">
            <AvatarImage 
              src={!imageError ? instructor.avatar : undefined}
              alt={`${instructor.name}'s profile picture`}
              onError={() => setImageError(true)}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
              {getInitials(instructor.name)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        </div>

        {/* Name and title */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {instructor.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaChalkboardTeacher className="w-4 h-4" />
            <span>{instructor.specialization || 'Expert Instructor'}</span>
          </div>
          <StarRating rating={instructor.rating || 4.2} />
        </div>

        {/* Bio with improved readability */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
          {instructor.bio || "Experienced educator passionate about sharing knowledge and helping students achieve their learning goals through innovative teaching methods."}
        </p>

        {/* Stats */}
        <div className="flex justify-between w-full pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <FaUsers className="w-3 h-3" />
            <span>{instructor.studentCount || Math.floor(Math.random() * 5000 + 500)} students</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <FaChalkboardTeacher className="w-3 h-3" />
            <span>{instructor.courseCount || Math.floor(Math.random() * 20 + 3)} courses</span>
          </div>
        </div>

        {/* View profile button - appears on hover */}
        <button className="absolute inset-x-4 bottom-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          View Profile
        </button>
      </div>
    </div>
  );
};

export const TopTeachers = () => {
  const { instructor, isPending, error } = useGetInstructor();

  // Error state
  if (error) {
    return (
      <div className="mt-5 px-3 pt-5 pb-10 md:px-20 bg-gradient-to-br from-red-500 to-red-600">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white">Unable to load instructors</h2>
          <p className="text-white/90">Please check your connection and try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-6 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="px-3 pt-5 pb-10 md:px-20 bg-gradient-to-br from-[#5567FF] via-[#4c63d2] to-[#667eea]">
      {/* Header with enhanced styling */}
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <div className="inline-block">
          <h1 className="font-bold  text-4xl md:text-5xl  mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Top Instructors
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>
        </div>
        <p className="max-w-3xl text-lg text-blue-50 leading-relaxed">
          Our instructors are more than just teachers — they're industry experts, innovators, and mentors. 
          With real-world experience and a passion for teaching, they're here to guide your learning journey.
        </p>
      </div>

      {/* Grid with loading states */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isPending ? (
          // Loading skeletons
          Array.from({ length: 8 }, (_, i) => (
            <InstructorSkeleton key={i} />
          ))
        ) : (
          // Actual instructor cards
          instructor?.map((ins, index) => (
            <InstructorCard 
              key={ins._id} 
              instructor={ins} 
              index={index}
            />
          ))
        )}
      </div>

      {/* Empty state */}
      {!isPending && (!instructor || instructor.length === 0) && (
        <div className="flex flex-col items-center text-center gap-4 py-16">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <FaChalkboardTeacher className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">No instructors found</h3>
          <p className="text-blue-100">Check back later for amazing instructors!</p>
        </div>
      )}
    </section>
  );
};