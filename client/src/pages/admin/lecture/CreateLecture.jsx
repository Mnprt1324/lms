import { functionToCreateLecture, functionToGetLectures } from "@/API/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLectureSchema } from "@/validation/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Lecture } from "./Lecture";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { LoaderA } from "@/components/LoaderA";

export const CreateLecture = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(createLectureSchema),
    defaultValues: {
      lectureTitle: "",
    },
  });

  const createLecture = useMutation({
    mutationFn: functionToCreateLecture,
    onSuccess: (data) => {
      if (data.data.message) {
        toast(data.data.message);
      }
      form.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    createLecture.mutate({ formData: data, courseId });
  };

  const { data, isPending, isError } = useQuery({
    queryKey: [createLecture.isPending],
    queryFn: () => functionToGetLectures(courseId),
  });
      
 if(isPending) return <LoaderA/>    
  return (
    <div className="flex md:mx-10 flex-col">
      <div className="mb-5 flex gap-5 items-center">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            navigate("/admin/course");
          }}
        >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="font-bold text-xl">
            Let’s add a lecture – basic details
          </h1>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="lectureTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter course title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 flex gap-5">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => navigate("/admin/course")}
              >
                Back to Course
              </Button>
              <Button type="submit">Create lecture</Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        {isPending ? (
          <p>loading...</p>
        ) : isError ? (
          <p>failed to load lectures</p>
        ) : data.data.lectures.length === 0 ? (
          <p>no lecture avilable</p>
        ) : (
          data.data.lectures.map((lecture, index) => (
            <>
              <Lecture
                key={lecture._id}
                lecture={lecture}
                index={index}
                courseId={courseId}
              />
            </>
          ))
        )}
      </div>
    </div>
  );
};
