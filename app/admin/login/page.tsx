import Wordmark from "@/components/Wordmark";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Entrar",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-brand-100 p-8">
        <div className="mb-6 text-center">
          <Wordmark className="text-lg" />
          <p className="mt-1 text-sm text-brand-500">Painel administrativo</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
