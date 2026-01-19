const LoadingScreen = ({ text }: { text?: string }) => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white text-xl">{text || "Loading..."}</p>
    </div>
  </div>
);

export default LoadingScreen;
