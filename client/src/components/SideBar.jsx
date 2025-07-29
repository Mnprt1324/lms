import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Building2, House, NotebookTabs, UserPen } from "lucide-react";
import { CgMenuMotion } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export function SheetDemo() {
  return (
    <Sheet className="bg-gray-500">
      <SheetTrigger asChild>
        <CgMenuMotion className="text-gray-500" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#303956]">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">E-Learning</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center">
          <div className=" bg-[#5567FF]  rounded">
            <img
              className="w-[50px]  p-1 h-auto "
              src=" https://luma.humatheme.com/public/images/illustration/student/128/white.svg"
              alt=""
            />
          </div>
          <div className="flex flex-col text-[#8a9199] items-start w-full px-8 mt-10 gap-5 font-bold">
            <div className="flex gap-2">
              <House />
              <NavLink to="/"> Home</NavLink>
            </div>
            <div className="flex gap-2">
            <NotebookTabs /> 
            <NavLink to="/courses">Courses</NavLink>
            </div>
            <div className="flex gap-2">
                <UserPen />
               <NavLink to="">Teachers</NavLink>
            </div>
            <div className="flex gap-2">
                <Building2 /> 
              <NavLink to="">About Us</NavLink>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
