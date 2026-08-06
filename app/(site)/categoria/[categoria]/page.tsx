import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { safe } from "@/lib/safe";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = siteConfig.categories.find((c) => c.slug === categoria);
  if (!category) notFound();

  const posts = await safe(getPostsByCategory(categoria), []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-900">
        {category.label}
      </h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-brand-500">
          Nenhuma notícia publicada nesta categoria ainda.
        </p>
      )}
    </div>
  );
}
