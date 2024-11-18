import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Calculadora de IVG e Germinação",
  description:
    "Utilize esta calculadora para determinar o Índice de Velocidade de Germinação (IVG) e a porcentagem de germinação de sementes. Ferramenta gratuita para pesquisadores e profissionais da área agrícola.",
  keywords: [
    "IVG",
    "germinação",
    "sementes",
    "calculadora",
    "índice de velocidade de germinação",
    "agricultura",
    "pesquisa agrícola",
  ],
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      {
        rel: "icon",
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  authors: [{ name: "Ryan Ferreira Barbosa" }],
  openGraph: {
    title: "Calculadora de IVG e Germinação",
    description:
      "Calcule o Índice de Velocidade de Germinação (IVG) e a porcentagem de germinação de sementes",
    type: "website",
    locale: "pt-BR",
  },
  robots: "index, follow",
  category: "ferramentas agrícolas",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
