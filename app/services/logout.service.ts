import { api } from "../lib/axios";

export async function logout() {
  try {
    // No token needed, cookie will be sent automatically
    const response = await api.post("/auth/logout", {}, { withCredentials: true });

    // Clear any frontend tokens if you stored access_token in localStorage
    localStorage.removeItem("access_token");

    return response.data.message; 
  } catch (error: any) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
}
