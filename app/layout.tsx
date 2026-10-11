import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./styles.css";
import { profile } from "@/content/profile";
import Script from "next/script";

const dmSans = localFont({ src: "../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2", variable: "--font-dm-sans", weight: "100 1000", display: "optional" });
const instrumentSerif = localFont({ src: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", variable: "--font-instrument-serif", weight: "400", display: "optional" });

const origin = profile.seo.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  icons: { icon: "/favicon.svg" },
  title: { default: profile.seo.title, template: "%s | Sonu Singh" },
  description: profile.seo.description,
  applicationName: "Sonu Singh Portfolio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: profile.seo.title,
    description: profile.seo.description,
    siteName: "Sonu Singh",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Sonu Singh — Network Security & Observability" }],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
    images: ["/social-card.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f3ed" }, { media: "(prefers-color-scheme: dark)", color: "#171918" }],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${dmSans.variable} ${instrumentSerif.variable}`}><script dangerouslySetInnerHTML={{ __html: `try{const root=document.documentElement;const t=localStorage.getItem('theme');root.classList.toggle('dark',t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches);document.addEventListener('click',e=>{if(!(e.target instanceof Element))return;const button=e.target.closest('[data-theme-toggle]');if(!button)return;const dark=!root.classList.contains('dark');root.classList.toggle('dark',dark);localStorage.setItem('theme',dark?'dark':'light');button.setAttribute('aria-pressed',String(dark));button.querySelector('span').textContent=dark?'☼':'◐'})}catch{}` }} />{children}{process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ? <Script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" /> : null}</body></html>;
}
