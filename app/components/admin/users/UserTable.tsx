import { User } from "@/app/types/user.type";
import UserRow from "./UserRow";

interface UserTableProps {
  users: User[];
  refresh: () => void;
}

export default function UserTable({ users, refresh }: UserTableProps) {
  return (
    <div className="rounded-xl m-6 overflow-hidden bg-gradient-to-br from-[#0b1220] to-[#020617]">
      <table className="w-full text-left">
        <thead className="bg-black/40 text-gray-300">
          <tr>
            <th className="p-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <UserRow
              key={user.user_id}
              user={user}
              refresh={refresh}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
