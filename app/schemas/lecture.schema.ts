// app/schemas/lecture.schema.ts
import { z } from "zod";

export const lectureSchema = z.object({
  title: z
    .string()
    .min(1, "Lecture title is required")
    .max(200, "Title must be at most 200 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be at most 2000 characters"),

  lecture_video: z
    .any()
    .refine((file) => file?.length > 0, "Video file is required"),
});

export type LectureFormData = z.infer<typeof lectureSchema>;