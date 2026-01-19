"use client";
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const EnrollmentProcess = () => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const { course_id } = useParams() as { course_id: string };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (!course_id) return <div>Invalid course.</div>;

  return (
    <div>
      <button
        onClick={() => router.push(`/courses/enrollment/${course_id}/payment`)}
      >
        Payment Now
      </button>
      <button
        onClick={() => router.push(`/courses/enrollment/${course_id}/later`)}
      >
        Payment Later
      </button>
    </div>
  );
};

export default EnrollmentProcess;
