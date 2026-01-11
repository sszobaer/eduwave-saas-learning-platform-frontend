import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginCard() {
  return (
    <div className="relative w-full max-w-md">
      <LoginHeader />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <LoginForm />
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
