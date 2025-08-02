import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  Form,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditCourseSchema } from "@/validation/userValidation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { functionToEditCourse, functionToPublishCourse } from "@/API/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader";


export const CourseTaab = ({ course }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(course?.isPublished);

  const form = useForm({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {
      courseTitle: "",
      subTitle: "",
      description: "",
      category: "",
      courseLevel: "",
      coursePrice: "",
      courseThumbnail: "",
    },
  });

  useEffect(() => {
    if (course) {
      form.reset({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: +course.coursePrice || "",
        courseThumbnail: "",
      });
      setIsPublished(course.isPublished);
    }
  }, [course]);

  const courseEdit = useMutation({
    mutationFn: functionToEditCourse,
    onSuccess: () => {
      form.reset();
      navigate(-1);
    },
    onError: (error) => console.error(error),
  });

  const publisCourse = useMutation({
    mutationFn: functionToPublishCourse,
    onSuccess: (data) => {
      if (data?.data.message) toast.success(data.data.message);
    },
    onError: (error) => console.error(error),
  });

  const handlePublishClick = () => {
    setIsPublished((prev) => !prev);
    publisCourse.mutate({ courseId, isPublished });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("courseTitle", data.courseTitle);
    formData.append("subTitle", data.subTitle);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("courseLevel", data.courseLevel);
    formData.append("coursePrice", data.coursePrice);
    formData.append("courseThumbnail", data.courseThumbnail[0]);

    courseEdit.mutate({ formData, courseId });
  };

  return (
    <Card  className="border-0 md:border-1">
      <CardHeader className="px-2 md:px-5 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="w-full flex flex-wrap items-center justify-between">
          <Button variant="outline" type="button" onClick={handlePublishClick}>
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="bg-red-500">Remove Lectures</Button>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="courseTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter course title" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sub-title */}
            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter course sub-title" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter course description"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category, Level, Price */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-[200px]">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="Next JS">Next JS</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Frontend Development">Frontend</SelectItem>
                          <SelectItem value="Fullstack Development">Fullstack</SelectItem>
                          <SelectItem value="MERN Stack Development">MERN Stack</SelectItem>
                          <SelectItem value="Javascript">Javascript</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="Docker">Docker</SelectItem>
                          <SelectItem value="MongoDB">MongoDB</SelectItem>
                          <SelectItem value="HTML">HTML</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Level */}
              <FormField
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Course Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Level</SelectLabel>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Course Price */}
              <FormField
                control={form.control}
                name="coursePrice"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-[200px]">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter course price"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Thumbnail Upload */}
            <FormField
              control={form.control}
              name="courseThumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                      className="w-full max-w-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={courseEdit.isPending}>
                {courseEdit.isPending ? <Loader /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
