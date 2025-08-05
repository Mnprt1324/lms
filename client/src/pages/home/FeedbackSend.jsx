import { useState } from "react";
import { Star } from "lucide-react"; // or use any icon library
import { usePostFeedBack } from "@/hooks/usePostFeedBack";
import { Loader } from "@/components/ui/Loader";

export const FeedbackSend = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [feedback, setFeedback] = useState("");

  const { mutate, isPending, isError, isSuccess } = usePostFeedBack();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      rating,
      feedBackText: feedback,
    };
    mutate(data);
    if (isSuccess) {
      setRating(0);
      setFeedback("");
    }
  };

  return (
    <div className="flex-col w-full py-10 px-5 flex items-center  justify-center bg-[url('https://img.freepik.com/premium-vector/smiling-male-student-standing-portrait_1316704-57556.jpg?w=1380')] bg-cover ">
      <div className="flex flex-col mb-5 items-center justify-center">
        <h1 className="font-bold text-2xl">Feedback </h1>
        <div className="h-1 w-[100px] bg-blue-500"></div>
      </div>
      <div className="bg-white shadow-md p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Leave Feedback
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          {/* Star Rating */}
          <div className="flex justify-center gap-1 ">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              >
                <Star
                  size={28}
                  className={`transition-colors ${
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill={(hover || rating) >= star ? "#facc15" : "none"}
                />
              </button>
            ))}
          </div>

          {/* Text Area */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            placeholder="Write your feedback here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            {isPending ? <Loader /> : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};
