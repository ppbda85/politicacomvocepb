import { sql } from "@/lib/db";

export type Placement = "top" | "sidebar";

export type Ad = {
  id: number;
  label: string;
  imageUrl: string | null;
  linkUrl: string;
  placement: Placement;
  active: boolean;
};

type AdRow = {
  id: number;
  label: string;
  image_url: string | null;
  link_url: string;
  placement: string;
  active: boolean;
};

function rowToAd(row: AdRow): Ad {
  return {
    id: row.id,
    label: row.label,
    imageUrl: row.image_url,
    linkUrl: row.link_url,
    placement: row.placement as Placement,
    active: row.active,
  };
}

export async function getActiveAds(placement: Placement): Promise<Ad[]> {
  const rows = (await sql`
    SELECT id, label, image_url, link_url, placement, active
    FROM ads
    WHERE placement = ${placement} AND active = true
    ORDER BY id DESC
  `) as unknown as AdRow[];
  return rows.map(rowToAd);
}

export async function getAllAds(): Promise<Ad[]> {
  const rows = (await sql`
    SELECT id, label, image_url, link_url, placement, active
    FROM ads
    ORDER BY id DESC
  `) as unknown as AdRow[];
  return rows.map(rowToAd);
}

export type AdInput = {
  label: string;
  imageUrl?: string | null;
  linkUrl: string;
  placement: Placement;
  active: boolean;
};

export async function createAd(input: AdInput): Promise<number> {
  const rows = (await sql`
    INSERT INTO ads (label, image_url, link_url, placement, active)
    VALUES (${input.label}, ${input.imageUrl ?? null}, ${input.linkUrl}, ${input.placement}, ${input.active})
    RETURNING id
  `) as unknown as { id: number }[];
  return rows[0].id;
}

export async function updateAd(id: number, input: AdInput): Promise<void> {
  await sql`
    UPDATE ads SET
      label = ${input.label},
      image_url = ${input.imageUrl ?? null},
      link_url = ${input.linkUrl},
      placement = ${input.placement},
      active = ${input.active}
    WHERE id = ${id}
  `;
}

export async function deleteAd(id: number): Promise<void> {
  await sql`DELETE FROM ads WHERE id = ${id}`;
}

export async function getAdById(id: number): Promise<Ad | null> {
  const rows = (await sql`
    SELECT id, label, image_url, link_url, placement, active
    FROM ads WHERE id = ${id} LIMIT 1
  `) as unknown as AdRow[];
  return rows[0] ? rowToAd(rows[0]) : null;
}
