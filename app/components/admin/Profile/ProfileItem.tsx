export function ProfileItem({
    label,
    value,
    badge = false,
}: {
    label: string;
    value?: string;
    badge?: boolean;
}) {
    return (
        <div className="
      rounded-xl
      bg-white/5
      border border-white/10
      p-5
      backdrop-blur
    ">
            <p className="text-sm text-purple-300 mb-1">
                {label}
            </p>

            {badge ? (
                <span className="
          inline-block mt-1
          px-3 py-1 rounded-full
          text-sm font-semibold
          bg-green-500/20 text-green-400
        ">
                    {value}
                </span>
            ) : (
                <p className="text-lg font-medium text-white">
                    {value || "—"}
                </p>
            )}
        </div>
    );
}
