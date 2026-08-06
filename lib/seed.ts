import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { sql } from "@/lib/db";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Importa os posts em Markdown de content/posts/*.md para o banco,
 * pulando qualquer slug que já exista. Seguro rodar mais de uma vez.
 */
export async function seedFromMarkdown(): Promise<{
  imported: string[];
  skipped: string[];
}> {
  const imported: string[] = [];
  const skipped: string[] = [];

  if (!fs.existsSync(postsDirectory)) {
    return { imported, skipped };
  }

  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const existing = (await sql`
      SELECT id FROM posts WHERE slug = ${slug} LIMIT 1
    `) as unknown as { id: number }[];

    if (existing.length > 0) {
      skipped.push(slug);
      continue;
    }

    await sql`
      INSERT INTO posts (slug, title, excerpt, category, author, post_date, content, cover, cover_credit)
      VALUES (
        ${slug},
        ${data.title ?? slug},
        ${data.excerpt ?? ""},
        ${data.category ?? "geral"},
        ${data.author ?? "Redação"},
        ${data.date ?? new Date().toISOString().slice(0, 10)},
        ${content.trim()},
        ${data.cover ?? null},
        ${data.coverCredit ?? null}
      )
    `;
    imported.push(slug);
  }

  return { imported, skipped };
}
