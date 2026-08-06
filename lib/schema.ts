import { sql } from "@/lib/db";

export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT 'geral',
      author TEXT NOT NULL DEFAULT 'Redação',
      post_date DATE NOT NULL DEFAULT CURRENT_DATE,
      content TEXT NOT NULL DEFAULT '',
      cover TEXT,
      cover_credit TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ads (
      id SERIAL PRIMARY KEY,
      label TEXT NOT NULL DEFAULT '',
      image_url TEXT,
      link_url TEXT NOT NULL DEFAULT '',
      placement TEXT NOT NULL DEFAULT 'sidebar',
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}
