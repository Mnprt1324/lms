import { useSelector } from "react-redux";
import { CourseCard } from "./CourseCard";

export const MyLearning = () => {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const enrolledCourses = user?.enrollCourses || [];

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-2">⚠️ Something went wrong</div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Learning
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your learning journey
        </p>
      </header>

      <main>
        {isLoading ? (
          <MyLearningSkeleton />
        ) : !user ? (
          <NotAuthenticatedState />
        ) : enrolledCourses.length === 0 ? (
          <EmptyState />
        ) : (
          <CoursesGrid courses={enrolledCourses} />
        )}
      </main>
    </div>
  );
};

// Courses grid component
const CoursesGrid = ({ courses }) => (
  <section aria-label="Enrolled courses">
    <div className="mb-4">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
      </span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard 
          key={course._id} 
          course={course}
          className="transition-transform hover:scale-105"
        />
      ))}
    </div>
  </section>
);

// Empty state when user has no enrolled courses
const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      No courses yet
    </h2>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
      Start your learning journey by enrolling in courses that interest you.
    </p>
    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={() => window.location.href = '/courses'}
    >
      Browse Courses
    </button>
  </div>
);

// Not authenticated state
const NotAuthenticatedState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Please sign in
    </h2>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      Sign in to view your enrolled courses and track your progress.
    </p>
    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={() => window.location.href = '/login'}
    >
      Sign In
    </button>
  </div>
);

// Improved skeleton loader
const MyLearningSkeleton = () => (
  <div className="space-y-6" aria-label="Loading courses">
    {/* Header skeleton */}
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-4"></div>
    </div>
    
    {/* Grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
          
          {/* Content placeholder */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            
            {/* Progress bar placeholder */}
            <div className="pt-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);