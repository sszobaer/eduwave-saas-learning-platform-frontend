import ForgotPasswordHeader from "./ForgotPasswordHeader";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordCard() {
  return (
    <div className="relative w-full max-w-md">
      <ForgotPasswordHeader />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
