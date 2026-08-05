import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPostsMeta();
  const [destaque, ...resto] = posts;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="mb-12 rounded-2xl bg-brand-900 px-6 py-12 text-white sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
          Política · {siteConfig.state}
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase sm:text-4xl">
          {siteConfig.description}
        </h1>
        <Link
          href="/noticias"
          className="mt-6 inline-block rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-400"
        >
          Ver todas as notícias
        </Link>
      </section>

      {destaque && (
        <section className="mb-12">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-400">
            Destaque
          </h2>
          <PostCard post={destaque} />
        </section>
      )}

      {resto.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-brand-400">
            Últimas notícias
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {resto.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <p className="text-brand-500">
          Nenhum post publicado ainda. Adicione arquivos <code>.md</code> em{" "}
          <code>content/posts</code>.
        </p>
      )}
    </div>
  );
}
