import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function OpinionCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/noticias/${post.slug}`}
      className="group block border-b border-brand-100 py-4 first:pt-0 last:border-0 last:pb-0"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
        {post.author}
      </span>
      <h3 className="mt-1 font-display text-base font-bold text-brand-900 group-hover:text-accent-600">
        {post.title}
      </h3>
      <time dateTime={post.date} className="mt-1 block text-xs text-brand-400">
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
