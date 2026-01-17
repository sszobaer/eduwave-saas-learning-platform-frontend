import { z } from "zod";

// Define the course schema
export const courseSchema = z.object({
  title: z
    .string()
    .min(1, "Course Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),
  thumbnail_img: z.any().optional(),
  tags: z.array(z.string()).optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
