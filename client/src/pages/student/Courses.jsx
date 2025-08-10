import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./CourseCard";
import { useGetPublicCourse } from "@/hooks/useGetPublicCourse";
import { useSelector } from "react-redux";
import { AlertCircle, BookOpen, RefreshCw, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Courses = () => {
  const { isError, isPending, refetch } = useGetPublicCourse();
  const allCourses = useSelector((state) => state.course.allPublicCourse);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Filter courses based on search and level
  const filteredCourses = allCourses?.filter((course) => {
    const matchesSearch = course.courseTitle
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      selectedLevel === "all" || course.courseLevel === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const courseLevels = ["all", "Beginner", "Medium", "Advanced"];

  if (isError) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Unable to Load Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              We're having trouble loading the courses right now. Please try again.
            </p>
            <Button onClick={refetch} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Explore Learning
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-blue-600 dark:text-blue-400">Courses</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Discover our comprehensive collection of courses designed to help you master new skills and advance your career.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>

        {/* Search and Filter Section */}
        {!isPending && allCourses?.length > 0 && (
          <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2 lg:ml-6">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {courseLevels.map((level) => (
                  <Badge
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    className="cursor-pointer capitalize hover:scale-105 transition-transform"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level === "all" ? "All Levels" : level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : filteredCourses?.length > 0 ? (
          <>
            {/* Results info */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredCourses.length} of {allCourses.length} courses
                {searchTerm && (
                  <span className="ml-1">
                    for "{searchTerm}"
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard 
                  key={course._id || index} 
                  course={course} 
                  className="animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </div>
          </>
        ) : allCourses?.length === 0 ? (
          <EmptyState />
        ) : (
          <NoResultsState searchTerm={searchTerm} onClear={() => setSearchTerm("")} />
        )}
      </div>
    </div>
  );
};

export const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Thumbnail skeleton */}
      <Skeleton className="w-full h-40 rounded-none" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        {/* Instructor skeleton */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
        
        {/* Stats skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      
      {/* Footer skeleton */}
      <div className="px-4 pb-4">
        <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
      <BookOpen className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      No Courses Available
    </h3>
    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
      We're working on adding new courses. Check back soon for exciting learning opportunities!
    </p>
  </div>
);

const NoResultsState = ({ searchTerm, onClear }) => (
  <div className="text-center py-16">
    <div className="mx-auto w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-6">
      <Search className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      No Results Found
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
      We couldn't find any courses matching "{searchTerm}". Try adjusting your search or browse all courses.
    </p>
    <Button variant="outline" onClick={onClear} className="gap-2">
      <RefreshCw className="w-4 h-4" />
      Clear Search
    </Button>
  </div>
);


const CoursesDemo = () => {
  return <Courses />;
};

export default CoursesDemo;