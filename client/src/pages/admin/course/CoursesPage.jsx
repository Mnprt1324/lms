import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CourseCard } from "@/pages/student/CourseCard";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CourseSkeleton } from "@/pages/student/Courses";
import { useGetFilteredCourse } from "../../../../hooks/useGetFilteredCourse";

export const CoursesPage = () => {
  const isPending = false;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const filteredCourse = useSelector((state) => state.course.filteredCourse);

  // Debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Local filtering (client-side)
  const displayedCourses = filteredCourse.filter((course) =>
    course.title?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      {/* Search */}
      <section className="w-full h-60 flex flex-col items-center justify-center px-4 bg-red-100">
        <label htmlFor="search-input" className="text-xl font-semibold mb-2">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          onChange={handleOnChange}
          value={searchQuery}
          placeholder="Enter course here"
          className="px-4 py-3 w-full max-w-md text-black border border-black rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </section>

      {/* Layout */}
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-15rem)] border-t px-3 gap-4">
        {/* Sidebar */}
        <aside className="w-full md:w-[300px] bg-white border p-4 rounded-md">
          <CheckboxDemo searchQuery={searchQuery} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-5 px-1">
          <div className="border rounded-lg p-5 bg-white shadow-sm w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isPending ? (
                // Show skeletons while loading
                Array.from({ length: 8 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))
              ) : filteredCourse.length === 0 ? (
                // No course found case
                <div className="col-span-full text-center py-10 text-gray-500 text-xl font-semibold">
                  No Courses Found
                </div>
              ) : (
                // Render actual courses
                filteredCourse.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const allCategories = [
  "HTML",
  "MongoDb",
  "Data Science",
  "Docker",
  "Python",
  "Javascript",
  "MERN Stack Development",
  "Next JS",
  "Fullstack Development",
];

export function CheckboxDemo({searchQuery}) {
  const { mutate, isError, isPending } = useGetFilteredCourse();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(0);
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAllChange = () => {
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...allCategories]);
    }
  };

  const isAllSelected = selectedCategories.length === allCategories.length;
  useEffect(() => {
    mutate({ All: isAllSelected, sortOrder, category: selectedCategories,searchQuery });
  }, [isAllSelected, sortOrder, selectedCategories,searchQuery]);
  return (
    <div className="flex flex-col gap-6 px-5 rounded-lg pt-5 pb-7 border">
      <div>
        <Label className="mb-2 block">Sort by Price</Label>
        <Select onValueChange={setSortOrder}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Price: Low to High</SelectItem>
            <SelectItem value="1">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-lg font-semibold">Categories</div>

      {/* All Checkbox */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="all"
          checked={isAllSelected}
          onCheckedChange={handleAllChange}
        />
        <Label htmlFor="all">All</Label>
      </div>

      {/* Individual Checkboxes */}
      {allCategories.map((category) => (
        <div className="flex items-center gap-3" key={category}>
          <Checkbox
            id={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => handleCategoryChange(category)}
          />
          <Label htmlFor={category}>{category}</Label>
        </div>
      ))}
    </div>
  );
}
