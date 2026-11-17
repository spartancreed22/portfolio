import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile, siteUrl } from "./data";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Joshua Ortiz · Full-Stack Developer, Automation & AI";
const description =
  "Full-stack developer in Cali, Colombia. Python and Playwright automation for web portals, document pipelines, and web apps on Next.js and Oracle PL/SQL.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Joshua Ortiz Portfolio",
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Joshua Ortiz",
    "full-stack developer",
    "Python automation",
    "Playwright",
    "web scraping",
    "RPA",
    "Next.js developer",
    "React",
    "TypeScript",
    "Oracle PL/SQL",
    "healthcare billing automation",
    "Colombia",
    "remote developer",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Joshua Ortiz",
    locale: "en_US",
    title,
    description: "Python automation, document pipelines and Next.js + Oracle web apps. Real work, real numbers.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Python automation, document pipelines and Next.js + Oracle web apps. Real work, real numbers.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceef0" },
    { media: "(prefers-color-scheme: dark)", color: "#121416" },
  ],
};

// Runs before the page paints, so the saved theme is applied without a white flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
