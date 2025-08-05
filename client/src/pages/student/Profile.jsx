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
import { useMutation } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { functionToUpdateProfile } from "@/API/api";
import { profileSchema } from "@/validation/userValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { LoaderA } from "@/components/LoaderA";
export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  if(!user) return <LoaderA/>
  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-6">
      {/* Profile Heading */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Profile
      </h1>

      {/* User Info */}
    <div className="flex   gap-6 md:gap-10 mb-10 py-5 px-4 border rounded-lg bg-white dark:bg-gray-900 shadow-sm">
  {/* Avatar + Button */}
  <div className="flex flex-col items-center">
    <Avatar className="h-24 w-24 md:h-32 md:w-32 shadow border border-gray-200">
      <AvatarImage
        src={user?.avatar ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
        alt="User Avatar"
      />
      <AvatarFallback className="text-lg font-semibold">
        {user?.name?.slice(0, 2).toUpperCase() || "NA"}
      </AvatarFallback>
    </Avatar>
    <div className="mt-3">
      <Dialogbox />
    </div>
  </div>

  {/* User Info */}
  <div className="flex  flex-col items-start justify-start h-full">
    <h2 className=" font-bold text-gray-800 underline capitalize dark:text-white">
      {user?.name || "Unnamed User"}
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
      {user?.role || "Role not specified"}
    </p>
    {user?.email && (
      <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
        {user?.email}
      </p>
    )}
  </div>
</div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 underline">
          Courses You're Enrolled In
        </h2>

        {user?.enrollCourses?.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 italic">
            You haven't enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user?.enrollCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function Dialogbox() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "na ",
      profilePhoto: undefined,
    },
  });
  const profileUpdate = useMutation({
    mutationFn: functionToUpdateProfile,
    onSuccess: (data) => {
      if (!data.data.error) {
        toast.success(data.data.message);
        form.reset();
        navigate(0);
      }
      form.reset();
    },
    onError: (error) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Error while Profile Update");
    },
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("profilePhoto", values.profilePhoto[0]); // FileList -> File
    profileUpdate.mutate(formData);
    console.log("Form Data:", formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className=" "
        >
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Profile</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Update your name and avatar. Changes will reflect after saving.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your full name" />
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
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={profileUpdate.isPending}>
                {profileUpdate.isPending ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
