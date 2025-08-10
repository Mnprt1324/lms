import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { 
  Building2, 
  House, 
  NotebookTabs, 
  UserPen, 
  User,
  LogOut,
  Moon,
  Sun,
  BookOpen,
} from "lucide-react";
import { CgMenuMotion } from "react-icons/cg";
import { NavLink, useLocation } from "react-router-dom";
import { useState, } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

export function SheetDemo() {
  const location = useLocation();
  // const [user, setUser] = useState(null); // Replace with your auth state
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
 const user=useSelector((state)=>state.auth.user);
 console.log(user);  // Mock user data - replace with your actual auth logic 


  const primaryNavItems = [
    { 
      icon: <House size={20} />, 
      label: "Home", 
      to: "/",
      description: "Dashboard & Overview"
    },
    { 
      icon: <NotebookTabs size={20} />, 
      label: "Courses", 
      to: "/courses",
      description: "Browse All Courses"
    },
    { 
      icon: <UserPen size={20} />, 
      label: "Teachers", 
      to: "/instructor",
      description: "Meet Our Instructors"
    },
    { 
      icon: <Building2 size={20} />, 
      label: "About Us", 
      to: "/about",
      description: "Our Story & Mission"
    },
  ];

  const secondaryNavItems = user ? [
    {
      icon: <BookOpen size={20} />,
      label: "My Learning",
      to: "/my-learning",
      description: "Your enrolled courses"
    },
   
  ] : [];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');  
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button 
          className="relative text-gray-700 hover:text-[#5567FF] transition-colors duration-200 text-2xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5567FF] focus:ring-offset-2"
          aria-label="Open navigation menu"
        >
          <CgMenuMotion />
          {/* Active indicator */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#5567FF] rounded-full animate-pulse"></span>
        </button>
      </SheetTrigger>

      <SheetContent 
        side="left" 
        className="w-[320px] px-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#5567FF] to-[#667EFF] rounded-xl p-2 shadow-lg">
              <img
                className="w-8 h-8 object-contain"
                src="https://luma.humatheme.com/public/images/illustration/student/128/white.svg"
                alt="LSM Logo"
              />
            </div>
            <div>
              <SheetTitle className="text-xl font-bold text-[#5567FF] tracking-wide">
                EduCore
              </SheetTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Learn Something Meaningful
              </p>
            </div>
          </div>
        </SheetHeader>

        {/* User Profile Section */}
        {user && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#5567FF]/20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4 text-xs">
              <div className="text-center">
                <div className="font-semibold text-[#5567FF]">{4}</div>
                <div className="text-gray-500 dark:text-gray-400">Enrolled</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-500">{8}</div>
                <div className="text-gray-500 dark:text-gray-400">Completed</div>
              </div>
        
            </div>
          </div>
        )}

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto py-2">
          {/* Primary Navigation */}
          <nav className="px-3 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Menu
            </div>
            {primaryNavItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.to}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                    isActive
                      ? "bg-gradient-to-r from-[#5567FF]/10 to-[#5567FF]/5 text-[#5567FF] shadow-sm"
                      : "text-gray-600 hover:text-[#5567FF] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <div className={clsx(
                  "flex-shrink-0 transition-transform group-hover:scale-110",
                  location.pathname === item.to && "text-[#5567FF]"
                )}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {item.description}
                  </div>
                </div>
                {location.pathname === item.to && (
                  <div className="w-2 h-2 bg-[#5567FF] rounded-full"></div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Secondary Navigation (User-specific) */}
          {user && secondaryNavItems.length > 0 && (
            <nav className="px-3 space-y-1 mt-6">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Your Learning
              </div>
              {secondaryNavItems.map((item, idx) => (
                <NavLink
                  key={idx}
                  to={item.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-gradient-to-r from-[#5567FF]/10 to-[#5567FF]/5 text-[#5567FF] shadow-sm"
                        : "text-gray-600 hover:text-[#5567FF] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    )
                  }
                >
                  <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{item.label}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 truncate">
                      {item.description}
                    </div>
                  </div>
                </NavLink>
              ))}
            </nav>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors w-full text-gray-600 hover:text-[#5567FF] hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {user ? (
            <>
              {/* Logout */}
              <button
                onClick={() => {
                  // Add your logout logic here
                  handleLinkClick();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            /* Sign In Button */
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors bg-[#5567FF] text-white hover:bg-[#4556EF] shadow-lg"
            >
              <User size={18} />
              <span>Sign In</span>
            </NavLink>
          )}
        </div>

        {/* Close button for better UX */}
        <SheetClose className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}