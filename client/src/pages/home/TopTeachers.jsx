import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetInstructor } from "@/hooks/useGetInstructor";
import { FaStar } from "react-icons/fa6";
export const TopTeachers = () => {
  const { instructor, isPending } = useGetInstructor();

  return (
    <div className="mt-5 px-3  pt-5 pb-10 md:px-20 bg-[#5567FF]  ">
      <div className="flex flex-col items-center text-center gap-3">
        <h1 className="font-semibold text-3xl text-slate-50 ">
          Top instructors
        </h1>
        <div className="w-[120px] h-1 bg-slate-50 rounded-full"></div>
        <p className="max-w-2xl text-slate-50 dark:text-gray-300 ">
          W our instructors are more than just teachers — they’re industry
          experts, innovators, and mentors. With real-world experience and a
          passion for teaching.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {instructor?.map((ins, index) => (
          <div
            key={ins._id}
            className="flex flex-col items-center bg-white dark:bg-gray-900 border rounded-xl shadow-lg p-6 gap-4 text-center transition hover:shadow-xl"
          >
            {/* Avatar */}
            <Avatar className="w-20 h-20">
              <AvatarImage src={ins.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Name + Rating */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {ins.name}
              </p>
              <p className="flex gap-1 text-sm text-gray-500 dark:text-gray-400">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-gray-300" />
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              voluptatum nemo rem harum enim aperiam, nihil labore quis est
              quasi molestias
            </p>

            {/* Top Courses */}
            {/* <div className="text-sm text-gray-800 dark:text-gray-200 w-full">
        <span className="font-medium">Top Courses:</span>
        <ul className="list-disc text-left list-inside text-blue-600 text-[14px] mt-1">
          <li>Complete Video Editing Guide</li>
          <li>Social Media Marketing Masterclass</li>
          <li>YouTube Growth Strategy</li>
        </ul>
      </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
