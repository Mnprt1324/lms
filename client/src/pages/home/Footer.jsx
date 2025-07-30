import { FaXTwitter, FaDiscord, FaLinkedin, FaGithub, FaYoutube, FaInstagram } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600 dark:text-gray-300">
        
        {/* Brand + Social */}
        <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">hashnode</h1>
          <p className="text-sm">Hassle-free blogging platform that developers and teams love.</p>
          <div className="flex space-x-4 text-gray-600 dark:text-gray-300">
            <FaXTwitter className="hover:text-blue-500 cursor-pointer" />
            <FaDiscord className="hover:text-indigo-500 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
            <FaGithub className="hover:text-gray-800 cursor-pointer" />
            <FaYoutube className="hover:text-red-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          </div>
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md w-fit">
            ● All systems operational
          </span>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Product</h3>
          <ul className="space-y-1">
            <li>Headless CMS <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-1">New</span></li>
            <li>Pricing</li>
            <li>GraphQL APIs</li>
            <li>Open source Starter-kit</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Explore</h3>
          <ul className="space-y-1">
            <li>My feed</li>
            <li>Case studies</li>
            <li>Hashnode AI</li>
            <li>Referral Program</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Company</h3>
          <ul className="space-y-1">
            <li>About Hashnode</li>
            <li>Careers</li>
            <li>Logos and media</li>
            <li>Changelog</li>
            <li>Feature Requests</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Support</h3>
          <ul className="space-y-1">
            <li>Support docs</li>
            <li>Contact</li>
            <li>Join Discord</li>
            <li>Comparisons →</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t mt-10 pt-6 text-center text-xs text-gray-500 dark:text-gray-400 px-6">
        <p>© 2024 Hashnode — LinearBytes Inc.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Code of conduct</a>
        </div>
      </div>
    </footer>
  );
};

