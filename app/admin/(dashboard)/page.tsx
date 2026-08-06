import Link from "next/link";
import { getAllPostsMeta, type PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import SetupPanel from "./setup/SetupPanel";
import DeleteButton from "./posts/DeleteButton";

export const metadata = { title: "Painel" };

export default async function AdminHomePage() {
  let posts: PostMeta[] = [];
  let dbError: string | null = null;

  try {
    posts = await getAllPostsMeta();
  } catch (err) {
    dbError = (err as Error).message;
  }

  if (dbError) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Não foi possível carregar as notícias: {dbError}
          <br />
          Se essa é a primeira vez usando o painel, rode a configuração
          abaixo.
        </div>
        <SetupPanel />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-brand-900">
          Notícias
        </h1>
        <Link
          href="/admin/posts/new"
          className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-400"
        >
          + Nova notícia
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-brand-500">
          Nenhuma notícia publicada ainda. Clique em "Nova notícia" pra
          começar.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-brand-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-400">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Autor</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-brand-100">
                  <td className="max-w-xs truncate px-4 py-3 font-medium text-brand-900">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-brand-500">
                    {post.category}
                  </td>
                  <td className="px-4 py-3 text-brand-500">
                    {formatDate(post.date)}
                  </td>
                  <td className="px-4 py-3 text-brand-500">{post.author}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="text-sm font-medium text-brand-700 hover:underline"
                      >
                        Editar
                      </Link>
                      <DeleteButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <details className="rounded-xl border border-brand-100 p-4 text-sm">
        <summary className="cursor-pointer font-medium text-brand-600">
          Configuração do banco de dados
        </summary>
        <div className="mt-4">
          <SetupPanel />
        </div>
      </details>
    </div>
  );
}
