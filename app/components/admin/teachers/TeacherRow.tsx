"use client";

import { TeacherService } from "@/app/services/teacher.service";
import { Teacher } from "@/app/types/teacher.type";

interface TeacherRowProps {
  teacher: Teacher;
  refresh: () => void;
}

export default function TeacherRow({ teacher, refresh }: TeacherRowProps) {
  const approve = async () => {
    await TeacherService.approve(teacher.user_id);
    refresh();
  };

  const reject = async () => {
    await TeacherService.reject(teacher.user_id);
    refresh();
  };

  return (
    <tr className="border-b border-gray-700">
      <td className="p-4">{teacher.full_name}</td>
      <td>{teacher.credential.email}</td>
      <td>{teacher.role.role_name}</td>
      <td>
        <span className="text-yellow-500">Pending</span>
      </td>
      <td className="text-right p-4 flex gap-2 justify-end">
        <button
          onClick={approve}
          className="px-3 py-1 rounded bg-green-600 text-sm hover:bg-green-500"
        >
          Approve
        </button>
        <button
          onClick={reject}
          className="px-3 py-1 rounded bg-red-600 text-sm hover:bg-red-500"
        >
          Reject
        </button>
      </td>
    </tr>
  );
}
