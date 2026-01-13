import { User } from "@/app/types/user.type";
import UserActions from "./UserActions";

interface UserRowProps {
  user: User;
  refresh: () => void;
}

export default function UserRow({ user, refresh }: UserRowProps) {
    const profile_img = `http://localhost:3000${user.profile_img}`
  return (
    <tr className="border-t border-white/5 hover:bg-white/5">
      <td className="p-4 flex items-center gap-3">
        {profile_img ? (
          <img
            src={profile_img}
            alt={user.full_name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center text-sm">
            {user.full_name.charAt(0)}
          </div>
        )}
        {user.full_name}
      </td>

      <td>{user.credential.email}</td>

      <td>
        <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 text-sm">
          {user.role.role_name}
        </span>
      </td>

      <td>
        {user.isActive ? (
          <span className="text-green-400">Active</span>
        ) : (
          <span className="text-red-400">Blocked</span>
        )}
      </td>

      <td className="p-4 text-right">
        <UserActions user={user} refresh={refresh} />
      </td>
    </tr>
  );
}
