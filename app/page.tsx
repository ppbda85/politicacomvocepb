import { getAllPostsMeta, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import OpinionCard from "@/components/OpinionCard";
import AdSlot from "@/components/AdSlot";

const FEATURED_COUNT = 5;

export default function HomePage() {
  const posts = getAllPostsMeta();
  const destaques = posts.slice(0, FEATURED_COUNT);
  const resto = posts.slice(FEATURED_COUNT);
  const opinioes = getPostsByCategory("opiniao");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {destaques.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-400">
            Destaque
          </h2>
          <FeaturedCarousel posts={destaques} />
        </section>
      )}

      <div className="grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-400">
            Últimas notícias
          </h2>
          {resto.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {resto.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            posts.length > 0 && (
              <p className="text-brand-500">
                As demais notícias aparecem aqui conforme forem publicadas.
              </p>
            )
          )}

          {posts.length === 0 && (
            <p className="text-brand-500">
              Nenhum post publicado ainda. Adicione arquivos <code>.md</code>{" "}
              em <code>content/posts</code>.
            </p>
          )}
        </section>

        <aside className="space-y-10">
          <div>
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-400">
              Opinião
            </h2>
            {opinioes.length > 0 ? (
              <div className="rounded-xl border border-brand-100 px-5">
                {opinioes.map((post) => (
                  <OpinionCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-brand-200 p-5 text-sm text-brand-400">
                Em breve, colunas assinadas por nossos colunistas.
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-400">
              Publicidade
            </h2>
            <div className="space-y-5">
              <AdSlot />
              <AdSlot label="Anuncie aqui" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
