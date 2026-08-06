"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-brand-700"
        >
          Senha do painel
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-lg border border-brand-200 px-3 py-2 text-brand-900 focus:border-accent-400 focus:outline-none"
        />
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-400 disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
