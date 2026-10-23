import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/Providers";
import { profile } from "@/lib/data";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `${profile.name} — E&TC Engineer, Developer & Video Editor`;
const description =
  "Portfolio of Anuj Kumar Singh: Electronics & Telecommunication engineering student in Pune building embedded and PCB prototypes, Next.js web projects, a candidate-matching prototype, and short-form video.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["Anuj Kumar Singh", "portfolio", "Electronics and Telecommunication", "Arduino", "Next.js", "PCB design", "video editor", "Pune"],
  authors: [{ name: profile.name }],
  openGraph: { title, description, type: "website", url: siteUrl, siteName: profile.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#FBF8F1", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#about"
          className="sr-only z-[200] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
