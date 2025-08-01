import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accodian } from "./home/Accodian";
import { Feedback } from "./home/Feedback";
import { FaStar } from "react-icons/fa6";

export const TeachersPage = () => {
  return (
    <div className="">
      <div className="px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[1, 2, 3, 4,6,7,,8,8,].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white dark:bg-gray-900 border rounded-xl shadow-lg p-6 gap-4 text-center transition hover:shadow-xl"
            >
              {/* Avatar */}
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              {/* Name + Rating */}
              <div className="flex flex-col items-center gap-1">
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  Phil Ebiner
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
                Phil is a passionate instructor with over 1M students worldwide.
                Specializing in digital marketing, video production, and
                practical business skills.
              </p>

              {/* Top Courses */}
              <div className="text-sm text-gray-800 dark:text-gray-200 w-full">
                <span className="font-medium">Top Courses:</span>
                <ul className="list-disc text-left list-inside text-blue-600 text-[14px] mt-1">
                  <li>Complete Video Editing Guide</li>
                  <li>Social Media Marketing Masterclass</li>
                  <li>YouTube Growth Strategy</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Accodian />
      <Feedback />
    </div>
  );
};
