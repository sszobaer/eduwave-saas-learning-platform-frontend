interface Props {
  title: string;
  value: string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 p-6 shadow hover:shadow-purple-500/20 transition">
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}
