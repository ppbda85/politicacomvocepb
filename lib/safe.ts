/**
 * Executa uma promessa e retorna um valor de fallback em caso de erro —
 * usado nas páginas públicas para não derrubar o site inteiro se o banco
 * de dados ainda não estiver configurado (ex: durante a primeira publicação
 * do painel administrativo, antes de rodar a configuração inicial).
 */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}
