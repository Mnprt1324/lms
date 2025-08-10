import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export const About = () => {
  return (
    <>
      <HeroSection />
      <MasonryGallery />
      <AboutContent />
      <StatsSection />
      <TeamSection />
      <CTASection />
    </>
  );
};

// Hero section with animated background
const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          About LSM
        </h1>
        <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
          Learn Something Meaningful
        </p>
        <div className="mt-8 w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
      </div>
    </section>
  );
};

// Enhanced masonry gallery with loading states
const MasonryGallery = () => {
  const [imagesLoaded, setImagesLoaded] = useState({});
  
  const imgArray = [
    {
      url: "https://res.cloudinary.com/df3pscsym/image/upload/v1742013072/efe505xoxt83oxmh18qx.jpg",
      alt: "Students collaborating in modern learning environment"
    },
    {
      url: "https://res.cloudinary.com/df3pscsym/image/upload/v1742013145/sipka4e4fnqjaufxogcc.jpg",
      alt: "Digital learning and technology integration"
    },
    {
      url: "https://res.cloudinary.com/df3pscsym/image/upload/v1742013223/urn8umazkpxuzxez28p4.jpg",
      alt: "Interactive classroom discussion"
    },
    {
      url: "https://res.cloudinary.com/df3pscsym/image/upload/v1742013311/zyyctoq74r0wlsjbsyhe.jpg",
      alt: "Online learning on various devices"
    },
    {
      url: "https://res.cloudinary.com/df3pscsym/image/upload/v1742013434/ziaqe8goalkrbinkmffw.jpg",
      alt: "Diverse group of learners"
    },
    {
      url: "https://res.cloudinary.com/df3pscsym/image/upload/v1742013397/fhpmtb0fwyltmgcodggl.jpg",
      alt: "Professional development and skill building"
    },
  ];

  const handleImageLoad = (index) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Learning Community
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the vibrant community of learners, educators, and innovators that make LSM special.
          </p>
        </div>
        
        <div className="columns-2 sm:columns-3 md:columns-4 gap-6">
          {imgArray.map((img, index) => (
            <div 
              key={index} 
              className="mb-6 overflow-hidden rounded-2xl shadow-lg group relative bg-gray-200 dark:bg-gray-700"
            >
              {!imagesLoaded[index] && (
                <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-600"></div>
              )}
              <img
                src={img.url}
                alt={img.alt}
                className={`w-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main about content with enhanced styling
const AboutContent = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Making Education Accessible for Everyone
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              At LSM, we believe that learning should be a lifelong journey accessible to all. 
              Our platform combines cutting-edge technology with expert instruction to create 
              meaningful educational experiences that transform lives and careers.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Learn Something Meaningful</h3>
              <p className="opacity-90">
                Every course, every lesson, every interaction is designed to add real value to your life.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
              Our Values
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Drives Us Forward
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🧠",
                title: "Curiosity",
                description: "We encourage continuous exploration and the joy of discovery."
              },
              {
                icon: "🌍",
                title: "Inclusivity",
                description: "Education should be open and accessible to learners worldwide."
              },
              {
                icon: "📚",
                title: "Quality",
                description: "We prioritize well-crafted, valuable learning experiences."
              },
              {
                icon: "🤝",
                title: "Community",
                description: "Learning thrives when shared and supported by others."
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats section
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ students: 0, courses: 0, instructors: 0, completion: 0 });

  const finalStats = {
    students: 50000,
    courses: 1200,
    instructors: 150,
    completion: 94
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      Object.keys(finalStats).forEach(key => {
        let current = 0;
        const increment = finalStats[key] / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalStats[key]) {
            current = finalStats[key];
            clearInterval(timer);
          }
          setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, stepTime);
      });
    }
  }, [isVisible]);

  return (
    <section id="stats-section" className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">LSM by the Numbers</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of learners who have transformed their lives through meaningful education.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { key: 'students', label: 'Active Students', suffix: '+' },
            { key: 'courses', label: 'Courses Available', suffix: '+' },
            { key: 'instructors', label: 'Expert Instructors', suffix: '+' },
            { key: 'completion', label: 'Completion Rate', suffix: '%' }
          ].map(stat => (
            <div key={stat.key} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {counts[stat.key].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team section
const TeamSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Meet the Team Behind LSM
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          Our diverse team of educators, technologists, and innovators work tirelessly 
          to create the best learning experience for you.
        </p>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              "Education is the most powerful weapon which you can use to change the world."
            </h3>
            <p className="opacity-90 text-lg">
              — Nelson Mandela
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced CTA section
const CTASection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their lives through meaningful education. 
            Whether you're a beginner or expert, there's something for everyone at LSM.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/courses"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Courses
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NavLink>
            
            <NavLink
              to="/signup"
              className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg"
            >
              Sign Up Free
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};