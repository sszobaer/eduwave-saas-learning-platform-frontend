interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="
      relative overflow-hidden rounded-2xl
      bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-transparent
      border border-purple-500/20
      p-6
      backdrop-blur-xl
      shadow-lg shadow-purple-900/30
      hover:shadow-purple-600/40
      transition-all duration-300
    ">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 hover:opacity-100 transition" />

      <p className="text-sm uppercase tracking-wide text-purple-300">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}
