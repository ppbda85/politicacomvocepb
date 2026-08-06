"use server";

import { revalidatePath } from "next/cache";
import { deletePost } from "@/lib/posts";

export async function deletePostAction(id: number) {
  await deletePost(id);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/noticias");
}
