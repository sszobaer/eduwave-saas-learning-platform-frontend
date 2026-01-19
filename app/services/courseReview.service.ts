import { api } from "../lib/axios";
import { CourseReview } from "../types/courseReview.type";

export const getCourseReview = async (): Promise<CourseReview[]> => {
  const res = await api.get("/course-reviews");
  return res.data;
};
