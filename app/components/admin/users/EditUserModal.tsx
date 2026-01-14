"use client";

import { useState } from "react";
import { User } from "@/app/types/user.type";
import { UserService } from "@/app/services/user.service";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditUserModal({
  user,
  onClose,
  onUpdated,
}: EditUserModalProps) {
  const [fullName, setFullName] = useState(user.full_name);
  const [isActive, setIsActive] = useState(user.isActive);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await UserService.update(user.user_id, {
        full_name: fullName,
        isActive,
      });
      onUpdated();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
      <div className="w-full max-w-md bg-[#020617] p-6 h-full">
        <h2 className="text-xl font-semibold mb-6">Edit User</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-black/30 border border-white/10"
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-sm text-gray-400">Status</label>
          <select
            value={isActive ? "active" : "blocked"}
            onChange={(e) => setIsActive(e.target.value === "active")}
            className="w-full mt-1 p-2 rounded bg-black/30 border border-white/10"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
