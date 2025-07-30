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
import { useGetPublicCourse } from "../../../../hooks/useGetPublicCourse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CourseSkeleton } from "@/pages/student/Courses";
import { useGetFilteredCourse } from "../../../../hooks/useGetFilteredCourse";

export const CoursesPage = () => {

  const { isError, isPending } = useGetPublicCourse();
    const filteredCourse = useSelector((state) => state.course.filteredCourse);
  const Allcourses = useSelector((state) => state.course.allPublicCourse);
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen border px-3">
      <div className="">
        <div className="">
          <div className="p-3 ">
            <CheckboxDemo />
          </div>
        </div>
      </div>
      <div className=" py-3">
        <div className="border rounded-lg p-5 ">
          <div className="grid grid-cols-4 gap-5">
            {isPending
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))
              : filteredCourse.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const allCategories = [
  "FullStack Development",
  "Python",
  "Backend Development",
  "Data Science",
  "Frontend Development",
  "DevOps",
  "HTML & CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Next.js",
];

export function CheckboxDemo() {
  const { mutate,isError, isPending } = useGetFilteredCourse();
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
    mutate({ All: isAllSelected, sortOrder, selectedCategories });
  }, [isAllSelected, sortOrder, selectedCategories]);
  console.log(isAllSelected, sortOrder, selectedCategories);
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
