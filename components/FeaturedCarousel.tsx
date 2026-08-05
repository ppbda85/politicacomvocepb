"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import { formatDate } from "@/lib/format";
import CoverImage from "@/components/CoverImage";

function categoryLabel(slug: string) {
  return siteConfig.categories.find((c) => c.slug === slug)?.label ?? slug;
}

const INTERVAL_MS = 5000;

export default function FeaturedCarousel({ posts }: { posts: PostMeta[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (posts.length <= 1 || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % posts.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [posts.length, paused]);

  if (posts.length === 0) return null;
  const post = posts[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href={`/noticias/${post.slug}`} className="group block">
        <CoverImage
          src={post.cover}
          alt={post.title}
          categoryLabel={categoryLabel(post.category)}
          credit={post.coverCredit}
          aspect="aspect-[21/9]"
        />
        <div className="mt-4">
          <span className="mb-2 inline-block w-fit rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-700">
            {categoryLabel(post.category)}
          </span>
          <h2 className="font-display text-2xl font-bold text-brand-900 group-hover:text-accent-600">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-brand-600">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-brand-400">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </Link>

      {posts.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {posts.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setIndex(i)}
              aria-label={`Mostrar destaque ${i + 1}: ${p.title}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-accent-500" : "w-2 bg-brand-200"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
