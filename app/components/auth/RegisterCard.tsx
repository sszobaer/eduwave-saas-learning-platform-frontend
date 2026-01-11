import RegisterHeader from "./RegisterHeader";
import RegisterForm from "./RegisterForm";
import Link from "next/link";

export default function RegisterCard() {
  return (
    <div className="relative w-full max-w-md">
      <RegisterHeader />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <RegisterForm />
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-400">
          Already Have an Account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
