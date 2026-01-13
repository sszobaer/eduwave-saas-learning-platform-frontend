import VerifyOtpHeader from "./VerifyOtpHeader";
import VerifyOtpForm from "./VerifyOtpForm";

export default function VerifyOtpCard() {
  return (
    <div className="relative w-full max-w-md">
      <VerifyOtpHeader />

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <VerifyOtpForm />
      </div>
    </div>
  );
}
