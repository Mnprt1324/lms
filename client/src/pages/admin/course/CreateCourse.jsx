import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
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

import { addCourseSchema } from "../../../validation/userValidation";
import { Button } from "../../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { functionTocreateCourse } from "../../../API/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
 
export const CreateCourse = () => {
  const form = useForm({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      title: "", 
      category: "",
    },
  });
  const navigate=useNavigate();

  const  createCourse=useMutation({
   mutationFn:functionTocreateCourse,
   onSuccess:(data)=>{
     if(!(data.data.error)){
          navigate("/admin/course");
           toast(data.data.message);
         }
   },
   onError:(error)=>{
   console.log(error)
   }
  })

  const onSubmit = (data) => {
    createCourse.mutate(data);
  
    console.log("Submitted:", data);
  };

  return (
    <div className="flex mx-10 flex-col">
      <div className="mb-5">
        <h1 className="font-bold text-xl">
          Let’s add a course – basic details
        </h1>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
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

          {/* Category Field with ShadCN Select */}
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
                      <SelectItem value="Data Science">Data Science</SelectItem>
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

          <Button variant="outline"   onClick={()=>navigate(-1)} className="mr-4">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};
