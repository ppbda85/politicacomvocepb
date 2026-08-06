import Image from "next/image";
import type { Ad } from "@/lib/ads";
import AdSlot from "@/components/AdSlot";

export default function AdBanner({
  ad,
  minHeight = "250px",
  fallbackLabel = "Espaço para anunciantes",
}: {
  ad: Ad | null | undefined;
  minHeight?: string;
  fallbackLabel?: string;
}) {
  if (!ad) {
    return <AdSlot label={fallbackLabel} minHeight={minHeight} />;
  }

  return (
    <a
      href={ad.linkUrl || "#"}
      target="_blank"
      rel="noopener noreferrer sponsored"
      style={{ minHeight }}
      className="relative block w-full overflow-hidden rounded-xl bg-brand-50"
    >
      {ad.imageUrl ? (
        <Image
          src={ad.imageUrl}
          alt={ad.label || "Publicidade"}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      ) : (
        <div
          style={{ minHeight }}
          className="flex w-full items-center justify-center px-4 text-center text-sm font-semibold text-brand-600"
        >
          {ad.label}
        </div>
      )}
      <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
        Publicidade
      </span>
    </a>
  );
}
