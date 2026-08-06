"use client";

import { useActionState, useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { slugify } from "@/lib/slug";
import { savePostAction, type SaveState } from "./actions";
import type { Post } from "@/lib/posts";

const initialState: SaveState = {};

export default function PostForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState(
    savePostAction,
    initialState
  );
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="existingCover" value={post?.cover ?? ""} />

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Título
        </label>
        <input
          name="title"
          required
          defaultValue={post?.title}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-accent-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Endereço (slug)
        </label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className="w-full rounded-lg border border-brand-200 px-3 py-2 font-mono text-sm focus:border-accent-400 focus:outline-none"
        />
        <p className="mt-1 text-xs text-brand-400">
          Aparece na URL: /noticias/{slug || "..."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-700">
            Data
          </label>
          <input
            type="date"
            name="date"
            required
            defaultValue={post?.date?.slice(0, 10)}
            className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-accent-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-700">
            Categoria
          </label>
          <select
            name="category"
            required
            defaultValue={post?.category}
            className="w-full rounded-lg border border-brand-200 bg-white px-3 py-2 focus:border-accent-400 focus:outline-none"
          >
            <option value="" disabled>
              Selecione…
            </option>
            {siteConfig.categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Autor
        </label>
        <input
          name="author"
          defaultValue={post?.author ?? "Redação"}
          className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-accent-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Resumo (aparece nos cards)
        </label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="w-full rounded-lg border border-brand-200 px-3 py-2 focus:border-accent-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Texto da matéria (Markdown)
        </label>
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={post?.content}
          className="w-full rounded-lg border border-brand-200 px-3 py-2 font-mono text-sm focus:border-accent-400 focus:outline-none"
        />
      </div>

      <div className="rounded-lg border border-brand-200 p-4">
        <label className="mb-1 block text-sm font-medium text-brand-700">
          Foto de capa
        </label>
        {post?.cover && (
          <div className="mb-3">
            <img
              src={post.cover}
              alt="Capa atual"
              className="h-32 w-auto rounded-lg border border-brand-100 object-cover"
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-brand-500">
              <input type="checkbox" name="removeCover" />
              Remover foto atual
            </label>
          </div>
        )}
        <input
          type="file"
          name="coverFile"
          accept="image/*"
          className="w-full text-sm"
        />
        <p className="mt-1 text-xs text-brand-400">
          Enviar uma foto nova substitui a atual. Deixe em branco pra manter.
        </p>
        <div className="mt-3">
          <label className="mb-1 block text-sm font-medium text-brand-700">
            Crédito da foto
          </label>
          <input
            name="coverCredit"
            defaultValue={post?.coverCredit}
            placeholder="Ex: Nome do fotógrafo/Agência"
            className="w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-accent-400 focus:outline-none"
          />
        </div>
      </div>

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
