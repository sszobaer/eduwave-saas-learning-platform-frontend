import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

const page = () => {
  const { user, loading } = useContext(AuthContext);
    const router = useRouter();
  
    useEffect(() => {
      if (loading) return; 
      if (!user || user.role !== "TEACHER") {
        router.push("/login");
      }
    }, [user, loading]);
  
    if (loading || !user) 
      return <p>Loading...</p>;
    
  return (
    <div>
      Teacher
    </div>
  )
}

export default page
