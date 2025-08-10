import { useState, useEffect } from "react";
import { Star, MessageSquare, Send, CheckCircle, AlertCircle, User, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePostFeedBack } from "@/hooks/usePostFeedBack";

const ratingLabels = {
  1: "Poor",
  2: "Fair", 
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};

const ratingColors = {
  1: "text-red-500",
  2: "text-orange-500", 
  3: "text-yellow-500",
  4: "text-blue-500",
  5: "text-green-500"
};

export const FeedbackSend = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, isPending, isError, isSuccess, error } = usePostFeedBack();

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      setRating(0);
      setFeedback("");
      setErrors({});
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }
    
    if (!feedback.trim()) {
      newErrors.feedback = "Please write your feedback";
    } else if (feedback.trim().length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const data = {
      rating,
      feedBackText: feedback.trim(),
    };
    console.log(data)
    mutate(data);
  };

  const handleRatingClick = (star) => {
    setRating(star);
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: null }));
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    if (errors.feedback) {
      setErrors(prev => ({ ...prev, feedback: null }));
    }
  };

  if (showSuccess) {
    return <SuccessMessage onClose={() => setShowSuccess(false)} />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://img.freepik.com/premium-vector/smiling-male-student-standing-portrait_1316704-57556.jpg?w=1380')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-blue-800/80" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-white">
              Share Your Experience
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Feedback</span> Matters
          </h1>
          
          <p className="text-xl text-gray-200 max-w-lg mx-auto leading-relaxed">
            Help us improve our courses and support other students in their learning journey.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Feedback Form */}
        <Card className="border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">
              Leave Your Feedback
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              Your honest review helps us create better learning experiences
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error?.message || "Something went wrong. Please try again."}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              {/* Rating Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    How would you rate your experience?
                  </label>
                  {rating > 0 && (
                    <Badge 
                      variant="outline" 
                      className={`${ratingColors[rating]} border-current`}
                    >
                      {ratingLabels[rating]}
                    </Badge>
                  )}
                </div>

                <div className="flex justify-center gap-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                      className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <Star
                        size={32}
                        className={`transition-all duration-200 ${
                          (hover || rating) >= star
                            ? "text-yellow-400 drop-shadow-lg"
                            : "text-gray-300 dark:text-gray-500"
                        }`}
                        fill={(hover || rating) >= star ? "#facc15" : "none"}
                      />
                    </button>
                  ))}
                </div>

                {errors.rating && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.rating}
                  </p>
                )}
              </div>

              {/* Feedback Text */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tell us about your experience
                </label>
                
                <Textarea
                  value={feedback}
                  onChange={handleFeedbackChange}
                  rows={5}
                  placeholder="Share your thoughts about the course content, instructor, platform usability, or anything that would help other students..."
                  className={`resize-none transition-colors ${
                    errors.feedback 
                      ? "border-red-500 focus:ring-red-500" 
                      : "focus:ring-blue-500"
                  }`}
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {feedback.length}/500 characters
                  </div>
                  {errors.feedback && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.feedback}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isPending}
                onClick={handleSubmit}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            🔒 Your feedback is secure and helps improve our platform
          </p>
        </div>
      </div>
    </section>
  );
};

function SuccessMessage({ onClose }) {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
      <Card className="max-w-md w-full border-0 shadow-2xl text-center">
        <CardContent className="p-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Thank You!
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Your feedback has been submitted successfully. We appreciate you taking the time to help us improve our platform.
          </p>
          
          <div className="space-y-3">
            <Button onClick={onClose} className="w-full">
              Submit Another Review
            </Button>
            <Button variant="outline" className="w-full">
              Back to Courses
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// Demo component with mock hook
const FeedbackSendDemo = () => {
  // Mock hook implementation

  return <FeedbackSend />;
};

export default FeedbackSendDemo;