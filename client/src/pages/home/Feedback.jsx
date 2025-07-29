import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { FaStar } from "react-icons/fa";

export const Feedback = () => {
  return (
    <div className="py-10 px-4 select-auto">
      <div className="flex flex-col items-center text-center gap-3">
        <h1 className="font-semibold text-3xl">Feedback</h1>
        <div className="w-[120px] h-1 bg-blue-500 rounded-full"></div>
        <p className="max-w-2xl text-gray-600 dark:text-gray-300 ">
          What other students turned professionals have to say about us after
          learning and reaching their goals.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <CarouselFeedback />
      </div>
    </div>
  );
};

function CarouselFeedback() {
  return (
    <Carousel
      opts={{
        align: "start",
         loop: true,
      }}
      className="w-full max-w-[85rem]"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 flex justify-center"
          >
            <div className="p-2 flex flex-col gap-4 ">
              {/* Feedback box with arrow */}
              <div className="relative bg-white dark:bg-gray-900 shadow-md rounded-xl p-5 w-96 border-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 border-l-4 pl-4">
                  A wonderful course on how to start. Eddie beautifully conveys
                  all essentials of becoming a good Angular developer. Very glad
                  to have taken this course.
                </p>

                {/* Triangle arrow below card */}
                <div className="absolute left  -bottom-2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent  border-r-transparent border-t-white dark:border-t-gray-900"></div>
              </div>

              {/* Avatar row */}
              <div className="flex items-center gap-4">
                <Avatar className="w-9 h-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Manpreet</p>
                  <p className="flex  gap-1 text-md text-gray-500 dark:text-gray-400">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-gray-400" />
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="" />
      <CarouselNext className="" />
    </Carousel>
  );
}
