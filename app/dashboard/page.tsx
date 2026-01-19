"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function DashboardRedirect() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; 

    if (!user) {
      router.replace("/login"); 
      return;
    }

    switch (user.role) {
      case "STUDENT":
        router.replace("/dashboard/student");
        break;
      case "ADMIN":
        router.replace("/dashboard/admin");
        break;
      case "TEACHER":
        router.replace("/dashboard/teacher");
        break;
      default:
        router.replace("/login");
    }
  }, [user, loading, router]);

  return null;
}
