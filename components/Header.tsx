import Link from "next/link";
import { siteConfig } from "@/lib/site.config";
import Wordmark from "@/components/Wordmark";
import IconMark from "@/components/IconMark";

export default function Header() {
  return (
    <header className="border-b border-brand-100 bg-white/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <IconMark size={28} />
          <Wordmark className="text-xl" />
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-brand-700">
          <Link href="/noticias" className="hover:text-accent-600">
            Notícias
          </Link>
          {siteConfig.primaryNav.map((slug) => {
            const cat = siteConfig.categories.find((c) => c.slug === slug);
            if (!cat) return null;
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className="hidden hover:text-accent-600 md:inline"
              >
                {cat.label}
              </Link>
            );
          })}
          <Link href="/sobre" className="hover:text-accent-600">
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
