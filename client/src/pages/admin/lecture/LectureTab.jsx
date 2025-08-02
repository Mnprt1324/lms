import {
  functionToEditLecture,
  functionToRemoveLecture,
  functionToUploadViedo,
} from "@/API/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { lectureEditSchema } from "@/validation/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useGetLectureById } from "@/hooks/usegetLectureById";
export const LectureTab = () => {
  const navigate=useNavigate();
  const { courseId, lectureId } = useParams();
    const {lecture,isPending,isError} =useGetLectureById(lectureId)
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileRes, setUploadFileRes] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const form = useForm({
    resolver: zodResolver(lectureEditSchema),
    defaultValues: {
      lectureTitle:lecture?.lectureTitle|| "" ,
      isPreviewFree: false,
    },
  });
console.log(lecture)
  const uploadVideo = useMutation({
    mutationFn: ({ formData, onProgress }) => {
      return functionToUploadViedo({ formData, onProgress });
    },
    onSuccess: (data) => {
      if (data?.data.success) {
        setUploadFileRes(data?.data?.data);
        toast.success("Video uploaded successfully!");
        setTimeout(() => {
          setMediaProgress(false);
          setUploadProgress(0);
        }, 1000);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.data.message||"error while Upload");
    },
  });

  const hadleFileSumbit = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setUploadFile(file);
    }
  };

  const handleOnClick = (e) => {
    try {
      if (!uploadFile) throw new Error("No File Selected");
      const formData = new FormData();
      formData.append("lectureVideo", uploadFile);
      setMediaProgress(true);
      uploadVideo.mutate({
        formData,
        // passing callback func
        onProgress: (progress) => setUploadProgress(progress),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editLecture = useMutation({
    mutationFn: functionToEditLecture,
    onSuccess: (data) => {
      console.log("data:", data);
      if (data.data.message) {
        toast.success(data?.data.message || "Lecture updated successfully.");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (values) => {
    if (!uploadFileRes) toast.error("upload video first");
    const formData = { ...values, lectureVideo: uploadFileRes };
    editLecture.mutate({ formData, courseId, lectureId });
  };

  const removeLecture = useMutation({
    mutationFn: functionToRemoveLecture,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
      navigate(-1);      
    },
    onError: (error) => {
      console.log("error:", error);
      toast.error("Error while removing Lecture");
    },
  });
  const handleLectureRemove = (e) => {
    console.log("lecture remove");
    removeLecture.mutate({ lectureId });
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
          <div className="flex items-center gap-2">
            <Button variant="destructive" onClick={handleLectureRemove}>
              Remove Lecture
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Lecture Title */}
            <FormField
              control={form.control}
              name="lectureTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter lecture title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Lecture Video */}
            <div className="flex items-center gap-5">
              <FormField
                name="lectureVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Video</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="w-[300px]"
                        onChange={hadleFileSumbit}
                        accept="video/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={handleOnClick}
                className="mt-5 pointer-cursor"
              >
                Upload
              </Button>
            </div>
            {mediaProgress && <Progress value={uploadProgress} />}
            {/* Is Preview Free */}
            <FormField
              control={form.control}
              name="isPreviewFree"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel>Is this Lecture Free?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
