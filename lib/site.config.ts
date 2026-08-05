/**
 * Configuração central do site. Troque `name`/`shortName` aqui e o site
 * inteiro atualiza automaticamente (título, cabeçalho, rodapé, RSS, SEO).
 */
export const siteConfig = {
  name: "Política com Você",
  shortName: "Política com Você",
  description:
    "Cobertura e análise da política da Paraíba: Assembleia Legislativa, prefeituras, eleições e bastidores do poder estadual.",
  state: "Paraíba",
  stateAbbr: "PB",

  // TODO: confirmar registro do domínio antes de publicar.
  url: "https://politicacomvoce.com.br",
  social: {
    instagram: "politicacomvoce",
    twitter: "",
    whatsappChannel: "",
  },

  // Categorias editoriais padrão do site.
  categories: [
    { slug: "assembleia", label: "Assembleia Legislativa" },
    { slug: "eleicoes", label: "Eleições" },
    { slug: "municipios", label: "Municípios" },
    { slug: "governo-estadual", label: "Governo Estadual" },
    { slug: "bastidores", label: "Bastidores" },
    { slug: "opiniao", label: "Opinião" },
  ],

  // Categorias mostradas como abas no cabeçalho (nem todas precisam aparecer ali).
  primaryNav: ["eleicoes", "municipios", "opiniao"],
} as const;

export type Category = (typeof siteConfig.categories)[number];
