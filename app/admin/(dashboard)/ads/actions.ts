"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { createAd, updateAd, deleteAd, type AdInput, type Placement } from "@/lib/ads";
import { slugify } from "@/lib/slug";

export type SaveAdState = { error?: string };

async function uploadImageIfPresent(
  formData: FormData
): Promise<string | undefined> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = file.name.split(".").pop() || "jpg";
  const key = `ads/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ""))}.${ext}`;

  const blob = await put(key, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob.url;
}

export async function saveAdAction(
  _prevState: SaveAdState,
  formData: FormData
): Promise<SaveAdState> {
  const idRaw = String(formData.get("id") ?? "");
  const id = idRaw ? Number(idRaw) : null;

  const label = String(formData.get("label") ?? "").trim();
  const linkUrl = String(formData.get("linkUrl") ?? "").trim();
  const placement = String(formData.get("placement") ?? "sidebar") as Placement;
  const active = formData.get("active") === "on";
  const existingImage = String(formData.get("existingImage") ?? "");
  const removeImage = formData.get("removeImage") === "on";

  if (!linkUrl) {
    return { error: "Informe o link de destino do anúncio." };
  }

  let imageUrl: string | null | undefined = existingImage || undefined;
  if (removeImage) imageUrl = null;

  try {
    const uploaded = await uploadImageIfPresent(formData);
    if (uploaded) imageUrl = uploaded;
  } catch (err) {
    return { error: `Falha ao enviar a imagem: ${(err as Error).message}` };
  }

  const input: AdInput = {
    label,
    linkUrl,
    placement,
    active,
    imageUrl: imageUrl ?? null,
  };

  try {
    if (id) {
      await updateAd(id, input);
    } else {
      await createAd(input);
    }
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/");
  revalidatePath("/admin/ads");
  redirect("/admin/ads");
}

export async function deleteAdAction(id: number) {
  await deleteAd(id);
  revalidatePath("/");
  revalidatePath("/admin/ads");
}
