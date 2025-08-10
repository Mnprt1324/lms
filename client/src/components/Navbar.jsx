import { BellIcon, MoonIcon, SunIcon ,LockOpenIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SheetDemo } from './SideBar';
import { DropdownMenu2 } from './DropdownMenu';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticate } = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navigationItems = [
    { name: 'Home', path: '/', icon: '' },
    { name: 'Courses', path: '/courses', icon: '' },
    { name: 'Instructors', path: '/instructor', icon: '' },
    { name: 'About Us', path: '/about', icon: '' }
  ];

  const notifications = [
    { id: 1, text: 'New course available: Advanced React', time: '2m ago', unread: true },
    { id: 2, text: 'Assignment deadline tomorrow', time: '1h ago', unread: true },
    { id: 3, text: 'Welcome to EduCore!', time: '1d ago', unread: false }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <SheetDemo />
            </div>

            {/* Logo & Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <NavLink to="/" className="hidden md:flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#5567FF] to-[#667eea] rounded-xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3">
                    <img
                      className="w-6 h-6"
                      src="https://luma.humatheme.com/public/images/illustration/student/128/white.svg"
                      alt="EduCore"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-200"></div>
                </div>
                <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-[#5567FF] to-[#667eea] bg-clip-text text-transparent">
                  EduCore
                </span>
              </NavLink>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item, index) => (
                  <div key={item.name} className="relative group">
                    <NavLink
                      to={item.path}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative overflow-hidden"
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            {/*change */}
            <div className="flex items-center space-x-3">
              

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                {darkMode ? 
                  <SunIcon className="text-gray-600 dark:text-gray-400" /> : 
                  <MoonIcon className="text-gray-600 dark:text-gray-400" />
                }
              </button>

              {/* Notifications */}
              {isAuthenticate && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
                  >
                    <BellIcon className="text-gray-600 dark:text-gray-400" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      </div>
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                          <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Authentication Section */}
              {isAuthenticate ? (
                <DropdownMenu2 />
              ) : (
                <div className="flex items-center space-x-2">
                  {/* Login Icon Button */}
                  <button
                    onClick={() => navigate("/login")}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                    title="Login"
                  >
                    <LockOpenIcon className="text-gray-600 dark:text-gray-400" />
                  </button>
                  
                  {/* Get Started Button */}
                  <Button 
                    variant="default" 
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex"
                  >
                    Get Started
                  </Button>
                  
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Progress Bar (optional) */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30"></div>
        )}
      </nav>
    </div>
  );
};