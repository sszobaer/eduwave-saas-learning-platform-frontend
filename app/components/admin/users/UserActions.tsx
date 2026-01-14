"use client";

import { useRouter } from "next/navigation";
import { UserService } from "@/app/services/user.service";
import { User } from "@/app/types/user.type";

interface UserActionsProps {
  user: User;
  refresh: () => void;
}

export default function UserActions({ user, refresh }: UserActionsProps) {
  const router = useRouter();

  const toggleStatus = async () => {
    if (user.isActive) {
      await UserService.block(user.user_id);
    } else {
      await UserService.unblock(user.user_id);
    }
    refresh();
  };

  const deleteUser = async () => {
    await UserService.delete(user.user_id);
    refresh();
  };

  const viewUser = () => {
    router.push(`/dashboard/admin/users/${user.user_id}`);
  };

  return (
    <div className="flex justify-end gap-2">
      {/* Block / Unblock */}
      <button
        onClick={toggleStatus}
        className={`px-3 py-1 rounded text-sm ${
          user.isActive ? "bg-yellow-600" : "bg-green-600"
        }`}
      >
        {user.isActive ? "Block" : "Unblock"}
      </button>

      {/* Delete */}
      <button
        onClick={deleteUser}
        className="px-3 py-1 rounded bg-red-600 text-sm"
      >
        Delete
      </button>
      {/* View */}
      <button
        onClick={viewUser}
        className="px-3 py-1 rounded bg-blue-600 text-sm hover:bg-blue-500"
      >
        View
      </button>
    </div>
  );
}