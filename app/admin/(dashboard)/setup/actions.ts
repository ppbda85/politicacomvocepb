"use server";

import { revalidatePath } from "next/cache";
import { ensureSchema } from "@/lib/schema";
import { seedFromMarkdown } from "@/lib/seed";

export async function initSchemaAction(): Promise<{ ok: boolean; message: string }> {
  try {
    await ensureSchema();
    revalidatePath("/admin");
    return { ok: true, message: "Banco de dados inicializado com sucesso." };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}

export async function seedAction(): Promise<{ ok: boolean; message: string }> {
  try {
    const { imported, skipped } = await seedFromMarkdown();
    revalidatePath("/admin");
    revalidatePath("/");
    return {
      ok: true,
      message: `${imported.length} post(s) importado(s). ${skipped.length} já existiam e foram ignorados.`,
    };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}
