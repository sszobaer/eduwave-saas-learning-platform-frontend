import Sidebar from "@/app/components/teacher/Sidebar";


export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
