import { z } from "zod";

export const roles = ["STUDENT", "TEACHER", "ADMIN"];

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full Name is required")
    .max(20, "Full name must be at most 20 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets"),

  email: z.string().email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Z]).*$/, "Password must contain at least one uppercase letter"),

  profile_img: z.any().optional(),

  role_name: z.enum(roles, { message: "Select a valid role" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
