export default function RoleSelect({ register, roles, error }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Role
      </label>
      <select
        {...register("role_name")}
        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
      >
        <option value="">Select a role</option>
        {roles.map((role: any) => (
          <option key={role.role_id} value={role.role_name}>
            {role.role_name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
