import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle, 
  GraduationCap, 
  Users, 
  MessageCircle,
  BookOpen,
  Award,
  DollarSign,
  Clock,
  Shield,
  Smartphone,
  Download,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const studentFAQs = [
  {
    id: "s1",
    question: "How do I enroll in a course?",
    answer: "Enrolling is simple! Browse our course catalog, click on any course that interests you, and hit the 'Enroll Now' button. You'll be guided through a secure payment process and gain immediate access to all course materials.",
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: "s2", 
    question: "Do I get a certificate after completion?",
    answer: "Yes! Upon successful completion of a course (including all assignments and quizzes), you'll receive a verified certificate that you can download, print, or share on LinkedIn and other professional platforms.",
    icon: <Award className="w-4 h-4" />
  },
  {
    id: "s3",
    question: "Can I access courses on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and optimized for mobile devices. You can learn on-the-go using our mobile app, available for both iOS and Android devices.",
    icon: <Smartphone className="w-4 h-4" />
  },
  {
    id: "s4",
    question: "What if I'm not satisfied with a course?",
    answer: "We offer a 30-day money-back guarantee on all courses. If you're not completely satisfied within the first 30 days of enrollment, contact our support team for a full refund.",
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: "s5",
    question: "How long do I have access to course materials?",
    answer: "Once enrolled, you have lifetime access to all course materials, including future updates and additional content. Learn at your own pace without any time pressure.",
    icon: <Clock className="w-4 h-4" />
  },
  {
    id: "s6",
    question: "Can I download course materials for offline viewing?",
    answer: "Selected course materials can be downloaded for offline viewing through our mobile app. Video lectures can be downloaded on mobile devices, while PDFs and resources are downloadable on all platforms.",
    icon: <Download className="w-4 h-4" />
  }
];

const instructorFAQs = [
  {
    id: "i1",
    question: "How do I become an instructor?",
    answer: "Getting started is easy! Apply through our instructor application form, submit a sample video, and our team will review your application within 3-5 business days. We provide full support throughout the onboarding process.",
    icon: <GraduationCap className="w-4 h-4" />
  },
  {
    id: "i2",
    question: "What revenue share do instructors receive?",
    answer: "Instructors earn up to 70% revenue share on direct sales. The exact percentage depends on the traffic source and promotional support. We also offer performance bonuses for top-performing courses.",
    icon: <DollarSign className="w-4 h-4" />
  },
  {
    id: "i3",
    question: "Can I publish multiple courses?",
    answer: "Yes! There's no limit to the number of high-quality courses you can create. Many of our successful instructors have built comprehensive learning paths with multiple related courses.",
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: "i4",
    question: "What support do you provide to instructors?",
    answer: "We offer comprehensive support including course creation guidelines, marketing assistance, technical support, and dedicated instructor success managers. Plus access to our instructor community forum.",
    icon: <Users className="w-4 h-4" />
  },
  {
    id: "i5",
    question: "How are course sales tracked and payments processed?",
    answer: "We provide detailed analytics dashboard showing sales, student engagement, and earnings. Payments are processed monthly via bank transfer or PayPal, with transparent reporting on all transactions.",
    icon: <DollarSign className="w-4 h-4" />
  },
  {
    id: "i6",
    question: "What are the technical requirements for course creation?",
    answer: "You'll need basic recording equipment (webcam/microphone), screen recording software, and a reliable internet connection. We provide detailed technical guidelines and can recommend affordable equipment options.",
    icon: <MessageCircle className="w-4 h-4" />
  }
];

export const Accodian = () => {
  const navigate=useNavigate();
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Get Your Questions Answered
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Find answers to common questions from our community of students and instructors. 
            Can't find what you're looking for? We're here to help!
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Student FAQs */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    For Students
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Everything you need to know about learning with us
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {studentFAQs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg px-4 hover:shadow-sm transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="text-blue-600 dark:text-blue-400">
                          {faq.icon}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed ml-7">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Instructor FAQs */}
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    For Instructors
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Start your teaching journey with confidence
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {instructorFAQs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg px-4 hover:shadow-sm transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="text-purple-600 dark:text-purple-400">
                          {faq.icon}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed ml-7">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support Available</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">30-Day</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Money Back</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Lifetime</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Access</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">70%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Revenue Share</div>
          </div>
        </div>

        {/* Contact Support Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Our support team is here to help you succeed. Get personalized assistance for any questions not covered above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gap-2" onClick={()=>navigate("/contact")}>
                <MessageCircle className="w-4 h-4" />
                Contact Support
              </Button>
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Browse Help Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Accodian;