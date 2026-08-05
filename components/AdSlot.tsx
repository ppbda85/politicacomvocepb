export default function AdSlot({
  label = "Espaço para anunciantes",
  className = "",
  minHeight = "250px",
}: {
  label?: string;
  className?: string;
  minHeight?: string;
}) {
  return (
    <div
      style={{ minHeight }}
      className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 px-4 text-center ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
        Publicidade
      </span>
      <span className="text-sm text-brand-500">{label}</span>
    </div>
  );
}
