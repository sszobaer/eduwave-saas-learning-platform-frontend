import { User } from "./user.type";
import { Course } from "./course.type";

export interface CourseReview {
  review_id: number;
  user: User;
  course: Course;
  comment: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
}
