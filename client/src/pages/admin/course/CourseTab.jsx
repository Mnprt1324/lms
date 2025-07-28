import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "../../../components/ui/card";
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
export const CourseTab = ({ course }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log(course);
  const [isPublished, setIsPublished] = useState(course?.isPublished);
  const form = useForm({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {
      courseTitle: "",
      subTitle: "",
      description: "",
      category:"" ,
      courseLevel:"",
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
        category: course?.category || "",
        courseLevel: course?.courseLevel||"",
        coursePrice: +course?.coursePrice || "",
        courseThumbnail: "",
      });

      setIsPublished(course.isPublished);
    }
  }, [course]);

  const courseEdit = useMutation({
    mutationFn: functionToEditCourse,
    onSuccess: (data) => {
      form.reset();
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const publisCourse = useMutation({
    mutationFn: functionToPublishCourse,
    onSuccess: (data) => {
      if (data?.data.message) {
        toast.success(data.data.message);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handlePublishClick = (e) => {
    setIsPublished((prev) => !prev);
    publisCourse.mutate({ courseId, isPublished });
  };
  const onSubmit = (data, courseId) => {
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
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" type="button" onClick={handlePublishClick}>
            {isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button>Remove Lectures</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data, courseId))}
            className="flex  flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="courseTitle"
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
            <FormField
              control={form.control}
              name="subTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter course Sub-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="enter description here "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="Next JS">Next JS</SelectItem>
                          <SelectItem value="Data Science">
                            Data Science
                          </SelectItem>
                          <SelectItem value="Frontend Development">
                            Frontend Development
                          </SelectItem>
                          <SelectItem value="Fullstack Development">
                            Fullstack Development
                          </SelectItem>
                          <SelectItem value="MERN Stack Development">
                            MERN Stack Development
                          </SelectItem>
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
              <FormField
                control={form.control}
                name="courseLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>course Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select course level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Course Level</SelectLabel>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Advanced">Advance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coursePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter course price"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="courseThumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course price"
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                      className="w-[220px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">
                {courseEdit.isPending ? (
                  <>
                    {" "}
                    <Loader />
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
