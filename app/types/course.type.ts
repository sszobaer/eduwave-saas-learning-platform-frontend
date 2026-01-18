import { Lecture } from "./lecture.type";

export interface Course {
  course_id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
  tags: string[];
  lectures: Lecture[];
  created_by_user: {
    full_name: string;
  };
}
