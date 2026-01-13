import { api } from "../lib/axios";
import { Course } from "../types/course.type";

export const getAllCourses = async (): Promise<Course[]> => {
  const res = await api.get("/courses/all");
  return res.data;
};
