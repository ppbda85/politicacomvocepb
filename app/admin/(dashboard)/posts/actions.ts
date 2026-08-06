"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { createPost, updatePost, type PostInput } from "@/lib/posts";
import { slugify } from "@/lib/slug";

export type SaveState = { error?: string };

async function uploadCoverIfPresent(
  formData: FormData
): Promise<string | undefined> {
  const file = formData.get("coverFile");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = file.name.split(".").pop() || "jpg";
  const key = `covers/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

  const blob = await put(key, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob.url;
}

export async function savePostAction(
  _prevState: SaveState,
  formData: FormData
): Promise<SaveState> {
  const idRaw = String(formData.get("id") ?? "");
  const id = idRaw ? Number(idRaw) : null;

  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const author = String(formData.get("author") ?? "Redação").trim();
  const content = String(formData.get("content") ?? "");
  const coverCredit = String(formData.get("coverCredit") ?? "").trim();
  const existingCover = String(formData.get("existingCover") ?? "");
  const removeCover = formData.get("removeCover") === "on";

  let slug = String(formData.get("slug") ?? "").trim();
  if (!slug) slug = slugify(title);
  slug = slugify(slug);

  if (!title || !slug || !category || !date) {
    return { error: "Preencha ao menos título, categoria e data." };
  }

  let cover: string | null | undefined = existingCover || undefined;
  if (removeCover) cover = null;

  try {
    const uploaded = await uploadCoverIfPresent(formData);
    if (uploaded) cover = uploaded;
  } catch (err) {
    return { error: `Falha ao enviar a foto: ${(err as Error).message}` };
  }

  const input: PostInput = {
    slug,
    title,
    date,
    excerpt,
    category,
    author: author || "Redação",
    content,
    cover: cover ?? null,
    coverCredit: coverCredit || null,
  };

  try {
    if (id) {
      await updatePost(id, input);
    } else {
      await createPost(input);
    }
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/");
  revalidatePath("/noticias");
  revalidatePath(`/noticias/${slug}`);
  revalidatePath(`/categoria/${category}`);
  revalidatePath("/admin");
  redirect("/admin");
}
