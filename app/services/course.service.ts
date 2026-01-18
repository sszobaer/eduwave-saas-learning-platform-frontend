import { api } from "../lib/axios";
import { Course } from "../types/course.type";

export const getAllCourses = async (): Promise<Course[]> => {
  const res = await api.get("/courses/all");
  return res.data;
};

export const getAllCoursesByIndivisualUser = async (): Promise<Course[]> => {
  const res = await api.get("/courses/indivisual");
  return res.data;
};
export const getCourseById = async (id: number): Promise<Course> => {
  const res = await api.get(`/courses/details/${id}`);
  return res.data;
};
