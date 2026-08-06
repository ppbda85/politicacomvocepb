"use server";

import { redirect } from "next/navigation";
import { checkPassword, createSession } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");

  let valid: boolean;
  try {
    valid = checkPassword(password);
  } catch (err) {
    return { error: (err as Error).message };
  }

  if (!valid) {
    return { error: "Senha incorreta." };
  }

  await createSession();
  redirect("/admin");
}
