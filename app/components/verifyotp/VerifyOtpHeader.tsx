import { ShieldCheck } from "lucide-react";

export default function VerifyOtpHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center space-x-3 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
          <ShieldCheck className="text-white" size={32} />
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          EduWave
        </span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">
        Verify Your OTP
      </h1>
      <p className="text-gray-400">
        Enter the OTP sent to your email to verify your identity.
      </p>
    </div>
  );
}
