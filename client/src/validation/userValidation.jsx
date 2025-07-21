import z from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})