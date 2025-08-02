import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetCourse } from "@/hooks/useGetCourse";
export const CouresTable = () => {
  const { isPending, isError } = useGetCourse();
  const navigate = useNavigate();

  const courses = useSelector((state) => state.course.courses);
  console.log(courses);
  if (isPending)
    return (
      <>
        <h1>loading...</h1>
      </>
    );

  return (
    <div>
      <div className="flex gap-5 items-center mb-5">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowLeft size={16} />
        </Button>
        <Button onClick={() => navigate("/admin/course/create")}>
          Create New Course
        </Button>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent courses .</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.coursePrice || "NA"}</TableCell>
                <TableCell>
                  <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>{" "}
                </TableCell>
                <TableCell className="font-medium">
                  {course.courseTitle || "NA"}
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => navigate(`/admin/course/${course._id}`)}
                  >
                    <Edit />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
