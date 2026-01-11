import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({ register, error }: any) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type={show ? "text" : "password"}
          {...register("password")}
          className="w-full bg-black border border-gray-700 text-white rounded-lg pl-10 pr-12 py-3 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
