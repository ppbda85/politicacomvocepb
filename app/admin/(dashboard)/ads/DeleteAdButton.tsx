"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteAdAction } from "./actions";

export default function DeleteAdButton({
  id,
  label,
}: {
  id: number;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Excluir o anúncio "${label || "sem nome"}"?`)) return;
        startTransition(async () => {
          await deleteAdAction(id);
          router.refresh();
        });
      }}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-60"
    >
      {pending ? "Excluindo…" : "Excluir"}
    </button>
  );
}
