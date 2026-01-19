import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ error, retry }: { error: string; retry: () => void }) => (
  <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-4 mb-6 flex gap-3">
    <AlertCircle className="w-6 h-6 text-red-500" />
    <div>
      <p className="text-red-400">{error}</p>
      <button
        onClick={retry}
        className="text-red-300 underline text-sm hover:text-red-200"
      >
        Try again
      </button>
    </div>
  </div>
);

export default ErrorAlert;
