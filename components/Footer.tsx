import { siteConfig } from "@/lib/site.config";
import Wordmark from "@/components/Wordmark";
import IconMark from "@/components/IconMark";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-900 text-brand-100">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <div className="flex items-center gap-2">
          <IconMark size={24} />
          <Wordmark variant="dark" className="text-lg" />
        </div>
        <p className="mt-2 max-w-md text-brand-300">
          {siteConfig.description}
        </p>
        <p className="mt-6 text-xs text-brand-400">
          © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
