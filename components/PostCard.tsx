import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { formatDate } from "@/lib/format";

function categoryLabel(slug: string) {
  return siteConfig.categories.find((c) => c.slug === slug)?.label ?? slug;
}

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/noticias/${post.slug}`}
      className="group flex flex-col rounded-xl border border-brand-100 p-5 transition hover:border-accent-300 hover:shadow-sm"
    >
      <span className="mb-2 inline-block w-fit rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
        {categoryLabel(post.category)}
      </span>
      <h3 className="font-display text-lg font-bold text-brand-900 group-hover:text-accent-600">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-brand-600">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-2 text-xs text-brand-400">
        <span>{post.author}</span>
        <span>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
    </Link>
  );
}
