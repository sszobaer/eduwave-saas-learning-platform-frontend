"use client";

import Topbar from "@/app/components/admin/Topbar";
import UserTable from "@/app/components/admin/users/UserTable";
import { UserService } from "@/app/services/user.service";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await UserService.getAll();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0F172A] to-[#020617] text-gray-100 p-8 space-y-10">
    <Topbar />
      <h1 className="text-2xl font-semibold m-6">User Management</h1>
      <UserTable users={users} refresh={fetchUsers} />
    </div>
  );
}
