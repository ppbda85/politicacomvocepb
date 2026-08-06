import { notFound } from "next/navigation";
import { getAdById } from "@/lib/ads";
import AdForm from "../../AdForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar anúncio" };

export default async function EditAdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ad = await getAdById(Number(id));
  if (!ad) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-900">
        Editar anúncio
      </h1>
      <AdForm ad={ad} />
    </div>
  );
}
