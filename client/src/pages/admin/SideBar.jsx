import { Link, Outlet, useLocation } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";

export const SideBar = () => {
  const location = useLocation();

  const tabs = [
    { name: "Dashboard", path: "dashboard", icon: <ChartNoAxesColumn size={20} /> },
    { name: "Courses", path: "course", icon: <SquareLibrary size={20} /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Tab Bar (responsive) */}
      <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
        {tabs.map((tab) => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                isActive ? "bg-gray-100 dark:bg-gray-800 font-semibold" : ""
              }`}
            >
              {tab.icon}
              <span className=" sm:inline">{tab.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};
