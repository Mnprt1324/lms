import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Lecture = ({ lecture, index, courseId }) => {
 const functionToNavigate = (e, lecture, courseId) => {
  navigate(`/admin/course/${courseId}/lecture/${lecture._id}`);
};
  const navigate=useNavigate();
  return (
    <div className="flex justify-between items-center bg-[#F7F9FA] px-4 py-2 rounded-md">
      <h1 className="font-bold text-gray-800 ">
        {" "}
        Lecture - {index + 1}:{lecture.lectureTitle}
      </h1>
      <Edit
        size={20}
        className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        onClick={(e)=>functionToNavigate(e,lecture,courseId)}
      />
    </div>
  );
};
