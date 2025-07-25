import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  profilePhoto: z
    .any()
    .refine((file) => file?.length === 1, "Photo is required"),
});

export const addCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().nonempty("Category is required"),
});

export const EditCourseSchema = z.object({
  courseTitle: z
    .string()
    .min(3, "Course title must be at least 3 characters")
    .max(100, "Course title must be under 100 characters"),

  subTitle: z
    .string()
    .min(3, "Subtitle must be at least 3 characters")
    .max(200, "Subtitle must be under 200 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string(),

  courseLevel: z.enum(["Beginner", "Medium", "Advanced"], {
    errorMap: () => ({ message: "Course level is required" }),
  }),

  coursePrice: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Course price must be a valid number",
    }),

  courseThumbnail: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "Thumbnail is required",
    })
    .refine(
      (fileList) => {
        const file = fileList[0];
        return file && file.size < 5 * 1024 * 1024; // 5MB limit
      },
      {
        message: "Thumbnail must be less than 5MB",
      }
    ),
});

export const createLectureSchema = z.object({
  lectureTitle: z
    .string()
    .min(3, "Title must be at least 3 characters ")
    .nonempty(),
});

export const lectureEditSchema = z.object({
  lectureTitle: z.string().min(2,"Title must be at least 2 characters"),
  isPreviewFree: z.boolean(),
});
