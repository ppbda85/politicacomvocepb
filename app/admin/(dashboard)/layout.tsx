import Link from "next/link";
import { redirect } from "next/navigation";
import { hasValidSession } from "@/lib/auth";
import Wordmark from "@/components/Wordmark";
import { logoutAction } from "./logout-action";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await hasValidSession();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Wordmark className="text-lg" />
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
              Admin
            </span>
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-brand-700">
            <Link href="/admin" className="hover:text-accent-600">
              Notícias
            </Link>
            <Link href="/admin/ads" className="hover:text-accent-600">
              Publicidade
            </Link>
            <Link href="/" className="hover:text-accent-600">
              Ver site
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="hover:text-accent-600">
                Sair
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  );
}
