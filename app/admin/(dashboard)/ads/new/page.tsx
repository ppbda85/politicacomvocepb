import AdForm from "../AdForm";

export const metadata = { title: "Novo anúncio" };

export default function NewAdPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-900">
        Novo anúncio
      </h1>
      <AdForm />
    </div>
  );
}
