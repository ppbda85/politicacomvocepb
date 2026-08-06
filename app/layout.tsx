import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site.config";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
