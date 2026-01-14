import ResetPasswordHeader from "./ResetPasswordHeader";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordCard() {
  return (
    <div className="relative w-full max-w-md">
      <ResetPasswordHeader />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
