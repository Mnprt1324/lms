import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllFeedBack } from "@/hooks/useGetAllFeedBack";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { MessageSquare, Users, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export const Feedback = () => {
  const { data, isPending, isError } = useGetAllFeedBack();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const stats = {
    totalReviews: data?.length || 0,
    averageRating: data?.reduce((acc, curr) => acc + curr.rating, 0) / (data?.length || 1) || 0,
    fiveStarCount: data?.filter(item => item.rating === 5).length || 0
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Student Success Stories
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-blue-600 dark:text-blue-400">Students</span> Say
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover how our students transformed their careers and achieved their goals through our comprehensive learning platform.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Stats Section */}
        {!isPending && !isError && data?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6 border-0 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="mb-2">
                  <Users className="w-8 h-8 text-blue-600 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalReviews}+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Happy Students</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="mb-2">
                  <Award className="w-8 h-8 text-yellow-500 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating.toFixed(1)}★
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 border-0 shadow-sm bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="mb-2">
                  <FaStar className="w-8 h-8 text-yellow-500 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round((stats.fiveStarCount / stats.totalReviews) * 100)}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">5-Star Reviews</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback Carousel */}
        <div className="relative">
          {isPending ? (
            <FeedbackSkeleton />
          ) : isError ? (
            <ErrorState />
          ) : !data || data.length === 0 ? (
            <EmptyState />
          ) : (
            <CarouselFeedback data={data} currentSlide={currentSlide} />
          )}
        </div>
      </div>
    </section>
  );
};

function CarouselFeedback({ data }) {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {data?.map((feedback, index) => (
            <CarouselItem
              key={feedback._id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <FeedbackCard feedback={feedback} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Custom Navigation */}
        <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 w-12 h-12 border-2 bg-white/90 hover:bg-white shadow-lg dark:bg-gray-800/90 dark:hover:bg-gray-800" />
        <CarouselNext className="right-4 top-1/2 -translate-y-1/2 w-12 h-12 border-2 bg-white/90 hover:bg-white shadow-lg dark:bg-gray-800/90 dark:hover:bg-gray-800" />
      </Carousel>
    </div>
  );
}

function FeedbackCard({ feedback, index }) {
  const getRatingColor = (rating) => {
    if (rating >= 5) return "text-green-600 bg-green-50 dark:bg-green-900/20";
    if (rating >= 4) return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
    if (rating >= 3) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20";
    return "text-red-600 bg-red-50 dark:bg-red-900/20";
  };

  const getUserInitials = (name) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "UN";
  };

  return (
    <div 
      className="group h-full animate-in fade-in-0 slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden group-hover:scale-[1.02]">
        <CardContent className="p-6 relative">
          {/* Quote Icon */}
          <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaQuoteLeft className="w-8 h-8 text-blue-600" />
          </div>
          
          {/* Rating Badge */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className={`${getRatingColor(feedback.rating)} border-0`}>
              {feedback.rating}/5 ★
            </Badge>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`w-4 h-4 transition-colors ${
                    star <= feedback.rating 
                      ? "text-yellow-400" 
                      : "text-gray-200 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <blockquote className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base line-clamp-4 hover:line-clamp-none transition-all">
              "{feedback.feedBackText}"
            </p>
          </blockquote>

          {/* User Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <Avatar className="w-12 h-12 border-2 border-white shadow-sm ring-2 ring-gray-100 dark:ring-gray-700">
              <AvatarImage 
                src={feedback.userId?.avatar} 
                alt={feedback.userId?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium text-sm">
                {getUserInitials(feedback.userId?.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base truncate">
                {feedback.userId?.name || "Anonymous Student"}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Verified Student
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FeedbackSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-16" />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-4 h-4" />
                ))}
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex items-center gap-4 pt-4 border-t">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Unable to Load Feedback
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        We're having trouble loading student feedback right now.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No Feedback Yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Student feedback will appear here once available.
      </p>
    </div>
  );
}

const FeedbackDemo = () => {
  return <Feedback />;
};

export default FeedbackDemo;