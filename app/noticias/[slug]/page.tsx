import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { formatDate } from "@/lib/format";
import CoverImage from "@/components/CoverImage";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function categoryLabel(slug: string) {
  return siteConfig.categories.find((c) => c.slug === slug)?.label ?? slug;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <span className="mb-3 inline-block w-fit rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
        {categoryLabel(post.category)}
      </span>
      <h1 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-3 flex items-center gap-2 text-sm text-brand-400">
        <span>{post.author}</span>
        <span>·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      {post.cover && (
        <div className="mt-6">
          <CoverImage
            src={post.cover}
            alt={post.title}
            categoryLabel={categoryLabel(post.category)}
            credit={post.coverCredit}
            aspect="aspect-[16/9]"
          />
        </div>
      )}

      <div
        className="prose-article mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
