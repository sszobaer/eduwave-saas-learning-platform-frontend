// app/types/teacher.type.ts
export interface Teacher {
  user_id: number;
  full_name: string;
  credential: {
    email: string;
  };
  role: {
    role_name: string;
  };
  isActive: boolean;
  created_at: string;
}
