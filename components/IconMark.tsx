export default function IconMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Símbolo políticacomvocêpb"
      className={className}
    >
      <title>Duas vozes em diálogo</title>
      <circle cx="38" cy="50" r="30" fill="#2563eb" />
      <circle cx="62" cy="50" r="30" fill="#facc15" />
    </svg>
  );
}
