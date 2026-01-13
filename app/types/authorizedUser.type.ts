export interface AuthorizedUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_img?: string; 
}