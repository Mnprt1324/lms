import { useState, useEffect, useRef } from 'react';
import { Search, Star, Users, Clock, Award, BookOpen, Target, Zap, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from './ParticleBackground';


const FloatingCard = ({ delay, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const HeroSection = () => {
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const stats = [
    { number: "50K+", label: "Students", icon: <Users size={20} /> },
    { number: "1.2K+", label: "Courses", icon: <BookOpen size={20} /> },
    { number: "95%", label: "Success Rate", icon: <Award size={20} /> }
  ];

  const HandleOnClick = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/courses?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/courses");
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setIsTyping(true);
    
    // Clear typing indicator after user stops typing
    const timer = setTimeout(() => setIsTyping(false), 500);
    return () => clearTimeout(timer);
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      HandleOnClick(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="py-10  relative bg-gradient-to-br from-[#5567FF] via-[#667eea] to-[#764ba2] dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground />
      
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-5xl md:mx-auto  text-center">
        {/* Main Heading */}
        <FloatingCard delay={0}>
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/20 mb-6">
              🎓 Trusted by 50,000+ learners worldwide
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find the{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              perfect course
            </span>
            {' '}for you
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your career with expert-led courses. Learn at your own pace, earn certificates, and join a community of ambitious learners.
          </p>
        </FloatingCard>

        {/* Enhanced Search Bar */}
        <FloatingCard delay={300}>
          <div className="relative max-w-2xl mx-auto mb-8" ref={searchRef}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative flex items-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-2xl overflow-hidden border border-white/20">
                <div className="flex items-center justify-center pl-6 text-gray-400">
                  <Search size={24} className={`transition-colors duration-300 ${isTyping ? 'text-blue-500' : 'text-gray-400'}`} />
                </div>
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="flex-grow px-4 py-4 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent focus:outline-none"
                  value={search}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
              
                />
                <Button 
                  className="mr-2 shadow-lg" 
                  onClick={HandleOnClick}
                  size="lg"
                  icon={<ArrowRight size={18} />}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
          
          </div>
        </FloatingCard>

        {/* Action Buttons */}
        <FloatingCard delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={() => navigate("/courses")}
              className="min-w-48 shadow-2xl"
            >
              Explore All Courses
            </Button>
          </div>
        </FloatingCard>

        {/* Stats Section */}
        <FloatingCard delay={900}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center justify-center mb-3 text-white/80 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </FloatingCard>

        {/* Trust Indicators */}
        <FloatingCard delay={1200}>
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center space-x-2 text-white/60">
              <CheckCircle size={16} />
              <span className="text-sm">Lifetime Access</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Award size={16} />
              <span className="text-sm">Certified Courses</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Users size={16} />
              <span className="text-sm">Expert Instructors</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <Clock size={16} />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};