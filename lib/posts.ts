import { sql } from "@/lib/db";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  id: number;
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
  content: string;
  contentHtml: string;
};

type PostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  post_date: string;
  content: string;
  cover: string | null;
  cover_credit: string | null;
};

function rowToMeta(row: PostRow): PostMeta {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.post_date,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    cover: row.cover ?? undefined,
    coverCredit: row.cover_credit ?? undefined,
  };
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, author, post_date, content, cover, cover_credit
    FROM posts
    ORDER BY post_date DESC, id DESC
  `) as unknown as PostRow[];
  return rows.map(rowToMeta);
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostMeta[]> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, author, post_date, content, cover, cover_credit
    FROM posts
    WHERE category = ${categorySlug}
    ORDER BY post_date DESC, id DESC
  `) as unknown as PostRow[];
  return rows.map(rowToMeta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, author, post_date, content, cover, cover_credit
    FROM posts
    WHERE slug = ${slug}
    LIMIT 1
  `) as unknown as PostRow[];

  const row = rows[0];
  if (!row) return null;

  const processed = await remark().use(html).process(row.content);

  return {
    ...rowToMeta(row),
    content: row.content,
    contentHtml: processed.toString(),
  };
}

export async function getPostById(id: number): Promise<Post | null> {
  const rows = (await sql`
    SELECT id, slug, title, excerpt, category, author, post_date, content, cover, cover_credit
    FROM posts
    WHERE id = ${id}
    LIMIT 1
  `) as unknown as PostRow[];

  const row = rows[0];
  if (!row) return null;

  const processed = await remark().use(html).process(row.content);

  return {
    ...rowToMeta(row),
    content: row.content,
    contentHtml: processed.toString(),
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = (await sql`SELECT slug FROM posts`) as unknown as {
    slug: string;
  }[];
  return rows.map((r) => r.slug);
}

export type PostInput = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  content: string;
  cover?: string | null;
  coverCredit?: string | null;
};

export async function createPost(input: PostInput): Promise<number> {
  const rows = (await sql`
    INSERT INTO posts (slug, title, excerpt, category, author, post_date, content, cover, cover_credit)
    VALUES (${input.slug}, ${input.title}, ${input.excerpt}, ${input.category}, ${input.author}, ${input.date}, ${input.content}, ${input.cover ?? null}, ${input.coverCredit ?? null})
    RETURNING id
  `) as unknown as { id: number }[];
  return rows[0].id;
}

export async function updatePost(
  id: number,
  input: PostInput
): Promise<void> {
  await sql`
    UPDATE posts SET
      slug = ${input.slug},
      title = ${input.title},
      excerpt = ${input.excerpt},
      category = ${input.category},
      author = ${input.author},
      post_date = ${input.date},
      content = ${input.content},
      cover = ${input.cover ?? null},
      cover_credit = ${input.coverCredit ?? null},
      updated_at = now()
    WHERE id = ${id}
  `;
}

export async function deletePost(id: number): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}
