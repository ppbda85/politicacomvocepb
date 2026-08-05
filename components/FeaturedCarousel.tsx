"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";
import { siteConfig } from "@/lib/site.config";
import IconMark from "@/components/IconMark";

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
      <Link
        href={`/noticias/${post.slug}`}
        className="group relative block aspect-[21/9] w-full overflow-hidden rounded-xl bg-brand-900"
      >
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IconMark size={48} />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 py-4 sm:px-8 sm:py-6">
          <span className="text-lg font-display font-bold text-white group-hover:text-accent-400 sm:text-2xl">
            {post.title}
          </span>
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
