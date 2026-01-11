import axios from "axios";
import { authStore } from "../store/auth.store";


export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ allow cookies
});

// 🔐 Attach access token automatically
api.interceptors.request.use(
  (config) => {
    const token = authStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
