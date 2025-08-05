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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SlidersHorizontal } from "lucide-react";
import { TopTeachers } from "@/pages/home/TopTeachers";
import { Accodian } from "@/pages/home/Accodian";
import { useGetFilteredCourse } from "@/hooks/useGetFilteredCourse";

export const CoursesPage = () => {
  const isPending = false;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const filteredCourse = useSelector((state) => state.course.filteredCourse);
  const imgUrl =
    "https://static.uacdn.net/production/_next/static/images/error.svg?q=75&auto=format%2Ccompress&w=828";
  // Debounce logic
  const bgImgUrl = useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      {/* Search */}
      <div className="relative  bg-[url('https://img.freepik.com/free-photo/cheerful-friendly-charismatic-redhead-woman-laughing-joyfully-texting-friends-chatting-with-smar_1258-139098.jpg?t=st=1754378104~exp=1754381704~hmac=40f140cc2ddb89ba022a70ad3ef3206240a387cbbaceb072e11060a2895e5c76&w=1380')] bg-cover dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center ">
        <div className="max-w-3xl mx-auto ">
          <h1 className="text-white text-4xl font-bold mb-4">
            Find best courses for You
          </h1>
          <p className="text-gray-black mb-8">
            All our dreams can come true, if we have the courage to pursue them.
          </p>
          <form className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
            <input
              id="search-input"
              type="text"
              onChange={handleOnChange}
              value={searchQuery}
              placeholder="Enter course here"
              className="px-4 py-3 w-full max-w-md text-black  border-black rounded-md bg-white focus:outline-none focus:ring-0 focus:ring-red-300"
            />
          </form>
        </div>
      </div>
      {/* Layout */}
      <div className="flex flex-col md:flex-row md:min-h-[calc(100vh-15rem)] border-t px-3 gap-4">
        {/* Sidebar */}
        <aside className="w-full md:w-[300px] md:p-4 rounded-md">
          <div className="w-full mt-2 visible md:hidden">
            <Collapsible className="border rounded p-2">
              <CollapsibleTrigger className="flex-xl gap-3">
                <SlidersHorizontal />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CheckboxDemo searchQuery={searchQuery} />
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="hidden bg-white md:block">
            <CheckboxDemo searchQuery={searchQuery} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-5 px-1">
          <div className="border rounded-lg md:p-5 bg-white shadow-sm w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isPending ? (
                // Show skeletons while loading
                Array.from({ length: 8 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))
              ) : filteredCourse.length === 0 ? (
                // No course found case
                <div className="flex flex-col items-center col-span-full text-center py-10 text-xl font-semibold">
                  <div>
                    <img src={imgUrl} alt="" />
                  </div>
                  <div className="font-bold text-3xl">
                    Oops! No Course Found
                  </div>
               
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
      <TopTeachers />
      <Accodian />
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

export function CheckboxDemo({ searchQuery }) {
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
    mutate({
      All: isAllSelected,
      sortOrder,
      category: selectedCategories,
      searchQuery,
    });
  }, [isAllSelected, sortOrder, selectedCategories, searchQuery]);
  return (
    <div className="flex flex-col gap-6 px-5 rounded-lg pt-5 pb-7 md:border">
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
