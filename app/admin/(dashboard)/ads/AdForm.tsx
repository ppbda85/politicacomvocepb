"use client";

import { useActionState } from "react";
import { saveAdAction, type SaveAdState } from "./actions";
import type { Ad } from "@/lib/ads";

const initialState: SaveAdState = {};

export default function AdForm({ ad }: { ad?: Ad }) {
  const [state, formAction, pending] = useActionState(
    saveAdAction,
    initialState
  );

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {ad && <input type="hidden" name="id" value={ad.id} />}
      <input type="hidden" name="existingImage" value={ad?.imageUrl ?? ""} />

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Nome do anunciante / campanha
        </label>
        <input
          name="label"
          defaultValue={ad?.label}
          placeholder="Ex: Escritório Fulano Advocacia"
          className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-accent-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Link de destino
        </label>
        <input
          name="linkUrl"
          type="url"
          required
          defaultValue={ad?.linkUrl}
          placeholder="https://..."
          className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-accent-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Onde aparece
        </label>
        <select
          name="placement"
          defaultValue={ad?.placement ?? "sidebar"}
          className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 focus:border-accent-400 focus:outline-none"
        >
          <option value="top">Faixa acima do destaque (banner largo)</option>
          <option value="sidebar">Coluna lateral (retângulo)</option>
        </select>
      </div>

      <div className="rounded-lg border border-brand-200 p-4">
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Imagem do anúncio
        </label>
        {ad?.imageUrl && (
          <div className="mb-3">
            <img
              src={ad.imageUrl}
              alt="Imagem atual"
              className="h-24 w-auto rounded-lg border border-brand-100 object-cover"
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-brand-500">
              <input type="checkbox" name="removeImage" />
              Remover imagem atual
            </label>
          </div>
        )}
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          className="w-full text-sm"
        />
        <p className="mt-1 text-xs text-brand-400">
          Sem imagem, aparece só o nome do anunciante em texto.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-700">
        <input
          type="checkbox"
          name="active"
          defaultChecked={ad?.active ?? true}
        />
        Anúncio ativo (visível no site)
      </label>

      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent-500 px-6 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-400 disabled:opacity-60"
      >
        {pending ? "Salvando…" : "Salvar"}
      </button>
    </form>
  );
}
