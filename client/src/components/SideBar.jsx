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
import clsx from "clsx";

export function SheetDemo() {
  const navItems = [
    { icon: <House size={20} />, label: "Home", to: "/" },
    { icon: <NotebookTabs size={20} />, label: "Courses", to: "/courses" },
    { icon: <UserPen size={20} />, label: "Teachers", to: "/instructor" },
    { icon: <Building2 size={20} />, label: "About Us", to: "/about" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CgMenuMotion className="text-gray-700 hover:text-[#5567FF] cursor-pointer text-2xl" />
      </SheetTrigger>

      <SheetContent side="left" className="w-[260px] px-4 bg-white dark:bg-gray-900">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-[#5567FF] tracking-wide">
            E-Learning
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center mt-6">
          <div className="bg-[#5567FF] rounded-full p-2 shadow-md mb-6">
            <img
              className="w-[60px] h-[60px] object-contain"
              src="https://luma.humatheme.com/public/images/illustration/student/128/white.svg"
              alt="Brand Logo"
            />
          </div>

          <nav className="w-full space-y-4">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#5567FF]/10 text-[#5567FF]"
                      : "text-gray-600 hover:text-[#5567FF] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
