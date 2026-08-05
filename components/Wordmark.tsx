export default function Wordmark({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const accent = variant === "dark" ? "text-accent-400" : "text-accent-500";
  const base = variant === "dark" ? "text-white" : "text-brand-900";

  return (
    <span className={`font-display font-bold uppercase ${base} ${className}`}>
      políticacom<span className={accent}>vocêpb</span>
    </span>
  );
}
