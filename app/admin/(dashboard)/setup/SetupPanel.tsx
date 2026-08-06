"use client";

import { useState, useTransition } from "react";
import { initSchemaAction, seedAction } from "./actions";

export default function SetupPanel() {
  const [pending, startTransition] = useTransition();
  const [log, setLog] = useState<string[]>([]);

  function run(action: () => Promise<{ ok: boolean; message: string }>) {
    startTransition(async () => {
      const result = await action();
      setLog((l) => [`${result.ok ? "✅" : "❌"} ${result.message}`, ...l]);
    });
  }

  return (
    <div className="rounded-xl border border-brand-100 p-6">
      <h2 className="font-display text-lg font-bold text-brand-900">
        Configuração do banco de dados
      </h2>
      <p className="mt-1 text-sm text-brand-500">
        Rode o passo 1 uma vez após conectar o banco Postgres na Vercel. O
        passo 2 importa os posts antigos em Markdown (se houver) — pode
        rodar quantas vezes quiser, ele ignora o que já foi importado.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(initSchemaAction)}
          className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          1. Criar tabelas
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => run(seedAction)}
          className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-400 disabled:opacity-60"
        >
          2. Importar posts antigos
        </button>
      </div>

      {log.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-brand-600">
          {log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
