# Blog Político — Paraíba

Site de notícias/cobertura política da Paraíba. Next.js (App Router) +
TypeScript + Tailwind CSS, com posts em Markdown (sem depender de CMS
externo).

## Como rodar localmente

```bash
npm install
npm run dev
```

Depois acesse `http://localhost:3000`.

## Trocar o nome do site

O nome ainda não foi decidido. Quando for, edite **um único arquivo**:

```
lib/site.config.ts
```

Troque `name`, `shortName`, `url` e os campos de `social`. Todo o site
(título das páginas, cabeçalho, rodapé, RSS) atualiza automaticamente.

## Adicionar uma notícia

Crie um arquivo `.md` em `content/posts/`, seguindo o modelo:

```md
---
title: "Título da notícia"
date: "2026-08-05"
excerpt: "Resumo de 1-2 linhas que aparece nos cards."
category: "assembleia" # veja slugs válidos em lib/site.config.ts
author: "Nome do autor"
---

Texto da matéria em Markdown normal.
```

O arquivo aparece automaticamente na home, em `/noticias` e na categoria
correspondente — não precisa editar nenhum outro arquivo.

## Categorias

Definidas em `lib/site.config.ts` → `categories`. Adicionar uma categoria
nova é só incluir `{ slug: "...", label: "..." }` nesse array.

## Conteúdo de exemplo

Os três posts em `content/posts/` são **textos de exemplo/placeholder**
(claramente marcados no início do texto) para você ver o site funcionando.
Substitua ou apague antes de publicar de verdade.

## Estrutura

```
app/                  páginas (App Router)
  page.tsx             home
  noticias/            lista + página de cada notícia
  categoria/[slug]/    página por categoria
  sobre/               página institucional
  rss.xml/             feed RSS
components/           Header, Footer, PostCard
content/posts/        as notícias em Markdown
lib/
  site.config.ts       nome, descrição, categorias, redes sociais
  posts.ts             leitura dos arquivos Markdown
  format.ts            formatação de datas em pt-BR
```

## Próximos passos sugeridos

- [ ] Fechar o nome do site e atualizar `lib/site.config.ts`
- [ ] Registrar domínio e atualizar `url`
- [ ] Trocar os 3 posts de exemplo por conteúdo real
- [ ] Definir logo/favicon (hoje o cabeçalho usa só texto)
- [ ] Escolher onde hospedar (Vercel é o caminho mais simples para Next.js)
