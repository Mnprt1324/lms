import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Headphones,
  BookOpen,
  Users,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.category || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', category: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "support@lsm-learning.com",
      action: "mailto:support@lsm-learning.com",
      color: "bg-blue-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      contact: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "bg-green-500"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      action: "#",
      color: "bg-purple-500"
    }
  ];

  const faqCategories = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Course Related",
      description: "Questions about courses, content, and certifications"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Account & Billing",
      description: "Account management, subscriptions, and payment issues"
    },
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Technical Support",
      description: "Platform issues, login problems, and technical difficulties"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            We're here to help! Whether you have questions about courses, need technical support, 
            or want to share feedback, our team is ready to assist you.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Average response time: 2 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {method.description}
                </p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {method.contact}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    <option value="">Select a category</option>
                    <option value="course">Course Related</option>
                    <option value="account">Account & Billing</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div className={`flex items-center gap-2 p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    <span>
                      {submitStatus === 'success' 
                        ? 'Message sent successfully! We\'ll get back to you soon.' 
                        : 'Failed to send message. Please try again.'}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Information & FAQ */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Office
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Address</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Learning Street<br />
                        Education District<br />
                        Chandigarh, 160001, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Business Hours</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Common Questions
                </h3>
                <div className="space-y-4">
                  {faqCategories.map((category, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {category.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <a
                    href="/faq"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all FAQs
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Visit Our Campus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our doors are always open for learners. Come visit us for a tour of our facilities or attend one of our workshops.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full h-96 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Interactive map would be integrated here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}