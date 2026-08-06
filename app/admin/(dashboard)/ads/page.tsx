import Link from "next/link";
import { getAllAds, type Ad } from "@/lib/ads";
import DeleteAdButton from "./DeleteAdButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Publicidade" };

const placementLabel: Record<string, string> = {
  top: "Faixa acima do destaque",
  sidebar: "Coluna lateral",
};

export default async function AdsPage() {
  let ads: Ad[] = [];
  let dbError: string | null = null;

  try {
    ads = await getAllAds();
  } catch (err) {
    dbError = (err as Error).message;
  }

  if (dbError) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
        Não foi possível carregar os anúncios: {dbError}
        <br />
        Rode a configuração do banco em{" "}
        <Link href="/admin" className="underline">
          /admin
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-900">
          Publicidade
        </h1>
        <Link
          href="/admin/ads/new"
          className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-400"
        >
          + Novo anúncio
        </Link>
      </div>

      {ads.length === 0 ? (
        <p className="text-brand-500">Nenhum anúncio cadastrado ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-brand-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-400">
              <tr>
                <th className="px-4 py-3">Anunciante</th>
                <th className="px-4 py-3">Local</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.id} className="border-t border-brand-100">
                  <td className="px-4 py-3 font-medium text-brand-900">
                    {ad.label || <span className="text-brand-400">Sem nome</span>}
                  </td>
                  <td className="px-4 py-3 text-brand-500">
                    {placementLabel[ad.placement] ?? ad.placement}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        ad.active
                          ? "bg-green-50 text-green-700"
                          : "bg-brand-50 text-brand-400"
                      }`}
                    >
                      {ad.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/ads/${ad.id}/edit`}
                        className="text-sm font-medium text-brand-700 hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteAdButton id={ad.id} label={ad.label} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
