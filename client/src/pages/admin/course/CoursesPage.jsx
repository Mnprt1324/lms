import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CourseCard } from "@/pages/student/CourseCard";
import { CourseSkeleton } from "@/pages/student/Courses";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TopTeachers } from "@/pages/home/TopTeachers";
import { Accodian } from "@/pages/home/Accodian";
import { useGetFilteredCourse } from "@/hooks/useGetFilteredCourse";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Filter, 
  ChevronDown,
  BookOpen,
  Star,
  Users,
  Clock,
  Grid3x3,
  List
} from "lucide-react";

export const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const isPending = false;

  const filteredCourse = useSelector((state) => state.course.filteredCourse);

  // Debounce search query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/cheerful-friendly-charismatic-redhead-woman-laughing-joyfully-texting-friends-chatting-with-smar_1258-139098.jpg?t=st=1754378104~exp=1754381704~hmac=40f140cc2ddb89ba022a70ad3ef3206240a387cbbaceb072e11060a2895e5c76&w=1380')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-800/80" />
        
        {/* Content */}
        <div className="relative py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <BookOpen className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">
                Discover Your Path
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find The Perfect 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Course For You
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your dreams into reality with our comprehensive courses. 
              The courage to pursue them starts here.
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for courses, skills, or topics..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl bg-white/95 backdrop-blur-sm border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 shadow-xl"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              {/* Popular searches */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["React", "Python", "Data Science", "UI/UX"].map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 cursor-pointer transition-colors"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filters
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <FilterSidebar searchQuery={debouncedSearchQuery} />
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar searchQuery={debouncedSearchQuery} />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {isPending ? (
                      "Loading courses..."
                    ) : (
                      `${filteredCourse?.length || 0} courses found`
                    )}
                  </h2>
                  {searchQuery && (
                    <Badge variant="outline" className="px-3 py-1">
                      "{searchQuery}"
                    </Badge>
                  )}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-h-2/3 no-scrollbar overflow-y-scroll">
              {isPending ? (
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <CourseSkeleton key={index} />
                  ))}
                </div>
              ) : filteredCourse?.length === 0 ? (
                <EmptyState searchQuery={searchQuery} onClearSearch={clearSearch} />
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3" 
                    : "grid-cols-1 max-w-4xl mx-auto"
                }`}>
                  {filteredCourse.map((course, index) => (
                    <CourseCard 
                      key={course._id || index} 
                      course={course} 
                      viewMode={viewMode}
                      className="animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Additional Sections */}
      <TopTeachers />
      <Accodian />
    </div>
  );
};

const allCategories = [
  "HTML",
  "MongoDB", 
  "Data Science",
  "Docker",
  "Python",
  "JavaScript",
  "MERN Stack Development",
  "Next.js",
  "Full Stack Development",
  "React",
  "Node.js",
  "Machine Learning"
];

function FilterSidebar({ searchQuery }) {
  const { mutate, isError, isPending } = useGetFilteredCourse();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("0");

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAllChange = () => {
    setSelectedCategories(
      selectedCategories.length === allCategories.length ? [] : [...allCategories]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSortOrder("0");
  };

  const isAllSelected = selectedCategories.length === allCategories.length;

  useEffect(() => {
    mutate({
      All: isAllSelected,
      sortOrder,
      category: selectedCategories,
      searchQuery,
    });
  }, [isAllSelected, sortOrder, selectedCategories, searchQuery, mutate]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </h3>
        {(selectedCategories.length > 0 || sortOrder !== "0") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Sort Section */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort by Price
        </Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">
              <div className="flex items-center gap-2">
                <span>💰</span> Price: Low to High
              </div>
            </SelectItem>
            <SelectItem value="1">
              <div className="flex items-center gap-2">
                <span>💎</span> Price: High to Low
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Categories
          </Label>
          <Badge variant="secondary" className="text-xs">
            {selectedCategories.length} selected
          </Badge>
        </div>

        {/* Select All */}
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <Checkbox
            id="all-categories"
            checked={isAllSelected}
            onCheckedChange={handleAllChange}
          />
          <Label 
            htmlFor="all-categories" 
            className="font-medium text-gray-900 dark:text-white cursor-pointer flex-1"
          >
            All Categories
          </Label>
        </div>

        {/* Individual Categories */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {allCategories.map((category) => (
            <div 
              key={category}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label 
                htmlFor={category} 
                className="text-gray-700 dark:text-gray-300 cursor-pointer flex-1 text-sm"
              >
                {category}
              </Label>
              {selectedCategories.includes(category) && (
                <Badge variant="outline" className="text-xs">
                  ✓
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ searchQuery, onClearSearch }) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mb-8">
        <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {searchQuery ? `No courses found for "${searchQuery}"` : "No courses found"}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
        {searchQuery 
          ? "Try adjusting your search terms or browse our categories to discover amazing courses."
          : "We're working on adding new courses. Check back soon for exciting learning opportunities!"
        }
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {searchQuery && (
          <Button onClick={onClearSearch} variant="outline">
            Clear Search
          </Button>
        )}
        <Button>
          Browse All Courses
        </Button>
      </div>
    </div>
  );
}

export default CoursesPage;