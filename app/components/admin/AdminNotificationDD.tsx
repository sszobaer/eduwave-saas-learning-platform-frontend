"use client";

import { useAdminNotifications } from "@/app/hooks/useAdminNotifications";

export default function AdminNotificationDropdown() {
  const { notifications } = useAdminNotifications();

  return (
    <div className="relative">
      <button className="px-4 py-2 bg-gray-800 text-white rounded">
        Notifications ({notifications.length})
      </button>

      {notifications.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50">
          {notifications.map((n) => (
            <div key={n.userId} className="p-2 border-b hover:bg-gray-100">
              <p className="text-sm font-semibold">{n.fullName}</p>
              <p className="text-xs text-gray-500">{n.email}</p>
              <p className="text-xs text-gray-400">
                Registered at {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
