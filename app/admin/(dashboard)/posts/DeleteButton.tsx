"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostAction } from "./delete-action";

export default function DeleteButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Excluir a notícia "${title}"? Essa ação não pode ser desfeita.`)) {
          return;
        }
        startTransition(async () => {
          await deletePostAction(id);
          router.refresh();
        });
      }}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
    >
      {pending ? "Excluindo…" : "Excluir"}
    </button>
  );
}
