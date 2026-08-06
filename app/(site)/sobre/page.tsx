import { siteConfig } from "@/lib/site.config";

export const metadata = {
  title: "Sobre",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-brand-900">
        Sobre o {siteConfig.name}
      </h1>
      <div className="prose-article mt-6">
        <p>{siteConfig.description}</p>
        <p>
          {/* TODO: escrever o texto institucional definitivo — quem escreve,
          linha editorial, forma de contato, política de correções etc. */}
          Este é um texto de exemplo. Substitua por uma descrição real da
          proposta editorial do site: independência, fontes, forma de
          apuração e como os leitores podem entrar em contato ou sugerir
          pautas.
        </p>
      </div>
    </div>
  );
}
