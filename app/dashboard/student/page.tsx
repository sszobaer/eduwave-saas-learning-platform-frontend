"use client";
import { AuthContext } from '@/app/context/AuthContext';
import { useContext, useEffect } from 'react';
import { useRouter } from "next/navigation";

const page = () => {
    const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (loading) return; 
    if (!user || user.role !== "STUDENT") {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading || !user) return <p>Loading...</p>;
  return(
    <>
    </>
  )
}

export default page
