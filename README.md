# Política com Você PB

Site de notícias/cobertura política da Paraíba. Next.js (App Router) +
TypeScript + Tailwind CSS, com um **painel administrativo próprio** em
`/admin` para escrever matérias, subir fotos e gerenciar anúncios — sem
precisar mexer em código.

Conteúdo fica num banco Postgres (Neon, via Vercel), fotos ficam no Vercel
Blob.

## Configuração inicial (fazer uma vez)

### 1. Banco de dados (Postgres/Neon)

1. No [painel da Vercel](https://vercel.com), abra o projeto → aba **Storage**.
2. **Create Database** → escolha **Postgres** (Neon).
3. Conecte ao projeto quando perguntado — a Vercel preenche a variável
   `DATABASE_URL` automaticamente.

### 2. Armazenamento de fotos (Vercel Blob)

1. Ainda em **Storage** → **Create Database** → escolha **Blob**.
2. Conecte ao projeto — a Vercel preenche `BLOB_READ_WRITE_TOKEN`
   automaticamente.

### 3. Senha do painel e chave de sessão

Em **Settings → Environment Variables**, adicione:

| Nome | Valor |
|---|---|
| `ADMIN_PASSWORD` | a senha que você vai usar pra entrar em `/admin` |
| `SESSION_SECRET` | qualquer string aleatória longa (ex: gere uma em [1password.com/password-generator](https://1password.com/password-generator/) ou rode `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) |

Depois de adicionar, **redeploy** o projeto (Deployments → ⋯ → Redeploy) pra
essas variáveis passarem a valer.

### 4. Criar as tabelas do banco

1. Acesse `seusite.vercel.app/admin`, entre com a `ADMIN_PASSWORD`.
2. Clique em **"1. Criar tabelas"**.
3. Se você já tinha posts antigos em `content/posts/*.md`, clique em
   **"2. Importar posts antigos"** pra trazer eles pro banco.

Pronto — o painel está funcionando.

## Como usar o painel (`/admin`)

- **Notícias**: lista tudo, com botão **"+ Nova notícia"**. No formulário dá
  pra escrever o texto (em Markdown), escolher categoria, subir uma foto de
  capa (com crédito) e publicar. Some da home automaticamente quando fica
  velha (mantém as 11 mais recentes na home; o resto continua em
  `/noticias`).
- **Publicidade**: cadastra anúncios com imagem, link e local — "faixa
  acima do destaque" (banner largo) ou "coluna lateral" (retângulo). Dá pra
  ativar/desativar sem apagar.
- **Login**: uma senha só, compartilhada entre quem publica (você e os
  colunistas de opinião). Pra trocar, é só mudar `ADMIN_PASSWORD` na Vercel.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencha com os valores (veja acima)
npm run dev
```

Acesse `http://localhost:3000` (site) e `http://localhost:3000/admin`
(painel). Pra puxar as variáveis já configuradas na Vercel direto pro seu
`.env.local`, rode `npx vercel env pull .env.local` (precisa ter feito
`vercel login` antes).

## Trocar o nome/marca do site

Um único arquivo: `lib/site.config.ts` (nome, descrição, categorias, redes
sociais). O visual (cores, logo) fica em `tailwind.config.ts` e
`components/IconMark.tsx` / `components/Wordmark.tsx`.

## Categorias

Definidas em `lib/site.config.ts` → `categories`. Adicionar uma categoria
nova é só incluir `{ slug: "...", label: "..." }` nesse array — ela já
aparece no formulário de nova notícia.

## Estrutura

```
app/
  (site)/              páginas públicas (têm Header/Footer)
    page.tsx             home
    noticias/            lista + página de cada notícia
    categoria/[slug]/    página por categoria
    sobre/               página institucional
  admin/               painel administrativo
    login/               tela de login
    (dashboard)/          área logada (lista, formulários, anúncios)
  rss.xml/             feed RSS
components/           Header, Footer, PostCard, CoverImage, AdBanner...
lib/
  site.config.ts       nome, descrição, categorias, redes sociais
  db.ts                conexão com o Postgres
  posts.ts / ads.ts    leitura/escrita no banco
  auth.ts              login por senha única (cookie assinado)
  schema.ts            criação das tabelas
  seed.ts              importação dos posts antigos em Markdown
```

## Próximos passos sugeridos

- [ ] Configurar banco + blob na Vercel (passo a passo acima)
- [ ] Trocar `ADMIN_PASSWORD` por uma senha definitiva
- [ ] Registrar domínio próprio e atualizar `url` em `lib/site.config.ts`
- [ ] Convidar os colunistas de opinião a escrever (categoria "Opinião")
