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
      router.push("/login"); 
      return;
    }



    switch (user.role) {
      case "STUDENT":
        router.push("/dashboard/student");
        break;
      case "ADMIN":
        router.push("/dashboard/admin");
        break;
      case "TEACHER":
        router.push("/dashboard/teacher");
        break;
      default:
        router.push("/login");
    }
  }, [user, loading, router]);

  return null;
}
