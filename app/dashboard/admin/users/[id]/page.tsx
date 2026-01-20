"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserService } from "@/app/services/user.service";
import { User } from "@/app/types/user.type";
import EditUserModal from "@/app/components/admin/users/EditUserModal";
import Topbar from "@/app/components/admin/Topbar";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchUser = async () => {
    if (!id) return;
    const res = await UserService.getOne(Number(id));
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <p className="text-gray-400">Loading user...</p>;
  }

  const profile_img = user.profile_img
    ? `http://localhost:3000${user.profile_img}`
    : null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#0F172A] to-[#020617] text-gray-100 p-8 space-y-10">
      <Topbar />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">User Details</h1>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 mb-6">
          {profile_img ? (
            <img
              src={profile_img}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-600/30 flex items-center justify-center text-xl">
              {user.full_name.charAt(0)}
            </div>
          )}

          <div>
            <h2 className="text-xl">{user.full_name}</h2>
            <p className="text-gray-400">{user.credential.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          <Detail label="User ID" value={user.user_id} />
          <Detail label="Role" value={user.role.role_name} />
          <Detail
            label="Status"
            value={user.isActive ? "Active" : "Blocked"}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {openEdit && (
        <EditUserModal
          user={user}
          onClose={() => setOpenEdit(false)}
          onUpdated={fetchUser}
        />
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-black/30 p-4 rounded">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
