import Image from "next/image";
import IconMark from "@/components/IconMark";

export default function CoverImage({
  src,
  alt,
  categoryLabel,
  credit,
  aspect = "aspect-[16/9]",
}: {
  src?: string;
  alt: string;
  categoryLabel: string;
  credit?: string;
  aspect?: string;
}) {
  if (src) {
    return (
      <div className="w-full">
        <div className={`relative w-full overflow-hidden rounded-xl bg-brand-100 ${aspect}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>
        {credit && (
          <p className="mt-1 text-right text-[11px] text-brand-400">
            Foto: {credit}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-900 ${aspect}`}
    >
      <IconMark size={40} />
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-200">
        {categoryLabel}
      </span>
    </div>
  );
}
