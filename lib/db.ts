import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Conexão com o banco (Neon/Vercel Postgres). Requer a variável de ambiente
 * DATABASE_URL — configurada automaticamente pela Vercel quando você conecta
 * um banco Postgres/Neon ao projeto (ver README para o passo a passo).
 *
 * A conexão só é criada no primeiro uso (não na importação do módulo), pra
 * não quebrar o build em máquinas sem a variável configurada.
 */
let client: NeonQueryFunction<false, false> | null = null;

function getClient(): NeonQueryFunction<false, false> {
  if (client) return client;

  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_UNPOOLED;

  if (!url) {
    throw new Error(
      "Nenhuma variável de conexão com o banco encontrada (DATABASE_URL). " +
        "Veja o README para configurar o banco Postgres na Vercel."
    );
  }

  client = neon(url);
  return client;
}

export function sql(
  strings: TemplateStringsArray,
  ...values: unknown[]
): ReturnType<NeonQueryFunction<false, false>> {
  return getClient()(strings, ...values);
}
