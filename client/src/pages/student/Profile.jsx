import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { CourseCard } from "./CourseCard";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { functionToGetProfile, functionToUpdateProfile } from "../../API/api";
import { profileSchema } from "../../validation/userValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
export const Profile = () => {
  const enrolledCourses = [1, 2, 3];
   const user=useSelector((state)=>state.auth.user);
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <div>
        <h1 className="font-bold text-3xl">Profile</h1>
        <div className="flex gap-3">
          <div>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
              <AvatarImage
                src={user.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="mb-2">
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                Name:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user.name || "NA"}
                </span>
              </h1>
            </div>
            <div className="mb-2">
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                Email:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user.email || "NA"}
                </span>
              </h1>
            </div>
            <div className="mb-2">
              <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                Role:
                <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                  {user.role || "NA"}
                </span>
              </h1>
            </div>

            {/* dilogBOx */}
            <Dialogbox />
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrollCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            enrolledCourses.map((coures, index) => <CourseCard key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

function Dialogbox() {
  const navigate=useNavigate();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      profilePhoto: undefined,
    },
  });
  const profileUpdate = useMutation({
    mutationFn: functionToUpdateProfile,
    onSuccess: (data) => {
      console.log(data);
      if (!data.data.error) {
        toast(data.data.message);
        form.reset();
        navigate()  
      }
      loginForm.reset();
    },
    onError: (error) => {
      console.log(error);
      console.log(error.response.data.message);
      toast(error.response.data.message);
      console.error("profileUpdate", error);
    },
  });

  const onSubmit = async(values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("profilePhoto", values.profilePhoto[0]); // FileList -> File
     profileUpdate.mutate(formData)
    console.log("Form Data:",formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Name" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Photo Field */}
            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dialog Footer inside the form */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">{profileUpdate.ispending?"wait":"update"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
