import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  cover?: string;
  coverCredit?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

function readSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = readSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "geral",
      author: data.author ?? "Redação",
      cover: data.cover ?? undefined,
      coverCredit: data.coverCredit ?? undefined,
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.category === categorySlug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    category: data.category ?? "geral",
    author: data.author ?? "Redação",
    cover: data.cover ?? undefined,
    contentHtml,
  };
}

export function getAllSlugs(): string[] {
  return readSlugs();
}
