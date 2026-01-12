import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";


const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});


//  REQUEST INTERCEPTOR
//  Attach access token to Authorization header

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


//  RESPONSE INTERCEPTOR
//  Auto refresh access token on 401

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // If refresh already in progress, wait for it
      if (isRefreshing && refreshPromise) {
        const newToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      isRefreshing = true;

      refreshPromise = (async () => {
        try {
          const res = await api.post("/auth/refresh");
          const newToken = (res.data as { access_token: string }).access_token;

          localStorage.setItem("access_token", newToken);
          return newToken;
        } catch (err) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          throw err;
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      })();

      const token = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${token}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { api };
