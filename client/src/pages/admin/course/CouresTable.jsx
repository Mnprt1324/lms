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
import { useQuery } from "@tanstack/react-query";
import { functionTogetCourses } from "../../../API/api";
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react";
export const CouresTable = () => {
  const navigate = useNavigate();

  const { data, isError, isPending } = useQuery({
    queryKey: ["course"],
    queryFn: functionTogetCourses,
  });
   console.log(data?.data.courses)
  
  return (
    <div>
      <div>
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
            {data?.data.courses.map((course) => (
              <TableRow key={course._id}>
                
                <TableCell>{course.coursePrice || "NA"}</TableCell>
                <TableCell>
                  <Badge>
                    
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>{" "}
                </TableCell>
                <TableCell className="font-medium">
                  {course.courseTitle || "NA"}
                </TableCell>
                <TableCell className="text-right">
                    <button onClick={()=> navigate(`/admin/course/${course._id}`)}><Edit/></button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
