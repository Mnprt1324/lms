import {
  FaXTwitter,
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10 text-sm text-gray-600 dark:text-gray-300">
        {/* Brand + Social */}
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            LSM
          </h1>
          <p className="text-sm">
            Hassle-free learning platform designed for curious minds and growing
            teams.
          </p>
          <div className="flex space-x-4 text-xl">
            <FaXTwitter className="text-blue-500 cursor-pointer" />
            <FaDiscord className="text-indigo-500 cursor-pointer" />
            <FaLinkedin className="text-blue-700 cursor-pointer" />
            <FaGithub className="text-gray-800 cursor-pointer" />
            <FaYoutube className="text-red-500 cursor-pointer" />
            <FaInstagram className="text-pink-500 cursor-pointer" />
          </div>
        </div>

        {/* Links Section */}
        <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-1">
              <li>Learning Paths</li>
              <li>Pricing</li>
              <li>Certifications</li>
              <li>Starter Kits</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-1">
              <li>My Dashboard</li>
              <li>Case Studies</li>
              <li>Community Blog</li>
              <li>Referral Program</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Careers</li>
              <li>Brand Assets</li>
              <li>Changelog</li>
              <li>Press</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Support
            </h3>
            <ul className="space-y-1">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Join Discord</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-10 pt-6 text-center text-xs text-gray-500 dark:text-gray-400 px-6">
        <p>© {new Date().getFullYear()} LSM — All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Code of Conduct
          </a>
        </div>
      </div>
    </footer>
  );
};
