"use client";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { authStore } from "../store/auth.store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");
        authStore.getState().setAccessToken(res.data.access_token);
      } catch (err) {
        authStore.getState().clearAuth();
      } finally {
        setLoading(false); // ✅ done restoring
      }
    };

    restoreAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // wait until auth restored

  return <>{children}</>;
};
