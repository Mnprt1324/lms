import {
  FaXTwitter,
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import { 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Heart, 
  ArrowUp,
  Globe,
  Shield,
  Award,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { 
    icon: FaXTwitter, 
    href: "#", 
    label: "Follow us on X (Twitter)", 
    color: "hover:text-blue-500",
    bgColor: "hover:bg-blue-500/10"
  },
  { 
    icon: FaDiscord, 
    href: "#", 
    label: "Join our Discord community", 
    color: "hover:text-indigo-500",
    bgColor: "hover:bg-indigo-500/10"
  },
  { 
    icon: FaLinkedin, 
    href: "#", 
    label: "Connect on LinkedIn", 
    color: "hover:text-blue-700",
    bgColor: "hover:bg-blue-700/10"
  },
  { 
    icon: FaGithub, 
    href: "#", 
    label: "View our GitHub", 
    color: "hover:text-gray-800 dark:hover:text-gray-200",
    bgColor: "hover:bg-gray-800/10"
  },
  { 
    icon: FaYoutube, 
    href: "#", 
    label: "Subscribe to our YouTube", 
    color: "hover:text-red-500",
    bgColor: "hover:bg-red-500/10"
  },
  { 
    icon: FaInstagram, 
    href: "#", 
    label: "Follow us on Instagram", 
    color: "hover:text-pink-500",
    bgColor: "hover:bg-pink-500/10"
  }
];

const footerLinks = {
  product: [
    { name: "Learning Paths", href: "#", badge: "Popular" },
    { name: "Pricing", href: "#" },
    { name: "Certifications", href: "#", badge: "New" },
    { name: "Starter Kits", href: "#" },
    { name: "Enterprise", href: "#" },
    { name: "API", href: "#" }
  ],
  explore: [
    { name: "My Dashboard", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Community Blog", href: "#" },
    { name: "Referral Program", href: "#", badge: "Earn $50" },
    { name: "Success Stories", href: "#" },
    { name: "Resources", href: "#" }
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#", badge: "We're hiring!" },
    { name: "Brand Assets", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "Press", href: "#" },
    { name: "Investors", href: "#" }
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Join Discord", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "System Status", href: "#", badge: "Live" },
    { name: "Security", href: "#" }
  ]
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with LSM
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Get the latest courses, tips, and learning resources delivered straight to your inbox. 
                Join 50,000+ learners who trust us!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-100 focus:bg-white/20 focus:border-white/40 h-12"
                />
              </div>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold h-12 px-8 whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  LSM
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                The world's leading hassle-free learning platform designed for curious minds and growing teams. 
                Transform your skills, advance your career.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>50K+ Students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>1000+ Courses</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Contact</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@lsm.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Follow Us</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200 ${social.color} ${social.bgColor} hover:border-current hover:scale-105 hover:shadow-md`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white capitalize text-lg">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.name}
                        </span>
                        {link.badge && (
                          <Badge 
                            variant="outline" 
                            className="text-xs px-2 py-0 h-5 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                          >
                            {link.badge}
                          </Badge>
                        )}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="" />

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} LSM — Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in San Francisco</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <span>Global Platform</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
              >
                Code of Conduct
              </a>
              <a 
                href="#" 
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:underline"
              >
                Cookie Policy
              </a>
            </div>

            <Button 
              onClick={scrollToTop}
              variant="outline" 
              size="sm" 
              className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 dark:hover:text-blue-400"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-200 to-transparent dark:via-blue-800 opacity-50" />
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-purple-200 to-transparent dark:via-purple-800 opacity-50" />
    </footer>
  );
};

export default Footer;