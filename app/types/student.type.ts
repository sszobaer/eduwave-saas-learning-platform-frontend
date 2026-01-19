export interface Course {
  course_id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
  created_by_user: {
    user_id: number;
    full_name: string;
  };
}

export interface Enrollment {
  enrollment_id: number;
  enrolled_at: string;

  course: {
    course_id: number;
    title: string;
    description: string;
    price: string; // ⚠️ STRING
    thumbnail_url: string;
    created_by_user: {
      user_id: number;
      full_name: string;
    };
  };

  payment: {
    payment_id: number;
    amount: string; // ⚠️ STRING
    payment_status: string;
  } | null;
}
