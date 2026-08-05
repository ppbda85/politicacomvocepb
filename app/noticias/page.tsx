import { getAllPostsMeta } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Notícias",
};

export default function NoticiasPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-900">
        Todas as notícias
      </h1>
      <div className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-brand-500">Nenhum post publicado ainda.</p>
      )}
    </div>
  );
}
