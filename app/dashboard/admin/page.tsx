"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/app/lib/axios"; 
import { authStore } from "@/app/store/auth.store";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard", {
          withCredentials: true, 
        });

        console.log("Dashboard response:", res.data);
        setData(res.data);
      } catch (err: any) {
        console.error("Error fetching dashboard:", err);
        setError(err.response?.data?.message || err.message);
      }
    };

    fetchDashboard();
  }, [authStore.getState().accessToken]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && <pre className="bg-gray-800 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>}
      {!data && !error && <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
