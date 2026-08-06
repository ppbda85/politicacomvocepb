import { getAllPostsMeta, getPostsByCategory } from "@/lib/posts";
import { getActiveAds } from "@/lib/ads";
import { safe } from "@/lib/safe";
import PostCard from "@/components/PostCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import OpinionCard from "@/components/OpinionCard";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

const FEATURED_COUNT = 5;
const GRID_COUNT = 6;

export default async function HomePage() {
  const posts = await safe(getAllPostsMeta(), []);
  const destaques = posts.slice(0, FEATURED_COUNT);
  const resto = posts.slice(FEATURED_COUNT, FEATURED_COUNT + GRID_COUNT);
  const opinioes = await safe(getPostsByCategory("opiniao"), []);
  const topAds = await safe(getActiveAds("top"), []);
  const sidebarAds = await safe(getActiveAds("sidebar"), []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <AdBanner ad={topAds[0]} minHeight="120px" fallbackLabel="Anuncie aqui" />
      </div>

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
              Nenhum post publicado ainda. Publique a primeira em{" "}
              <a href="/admin" className="underline">
                /admin
              </a>
              .
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
              <AdBanner ad={sidebarAds[0]} />
              <AdBanner ad={sidebarAds[1]} fallbackLabel="Anuncie aqui" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
