import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/site-url";
import Providers from "./providers";
import {
  jsonLdScriptProps,
  organizationLd,
  websiteLd,
} from "@/lib/structured-data";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-1J9D2QTNE6";

// Geist powers every headline on the site — including the hero H1, which
// is the mobile LCP element. With `display: "swap"`, the browser paints
// the H1 first in the fallback metrics-adjusted system font, then
// repaints when Geist loads. Lighthouse treats that second paint as the
// LCP, which was the source of the ~1.5s gap between FCP (2.7s) and LCP
// (4.2s) on mobile. Switching to `display: "optional"`:
//   • lets the browser use Geist if it arrives within ~100ms (which is
//     the typical case because next/font already preloads it), and
//   • otherwise sticks with the metrics-adjusted fallback for the
//     remainder of the page lifetime, so LCP = FCP.
// The fallback (system-ui → Segoe UI → Roboto → Helvetica Neue → Arial)
// is what next/font already size-adjusts against, so there is no
// layout shift either way. Visual difference is imperceptible on
// repeat visits (font is cached).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

// Mono is used only for small UI badges and code blocks (never an LCP
// candidate), so `swap` is fine — the swap repaint can't move the LCP
// timestamp.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Anchors every relative `alternates.canonical` and `openGraph.url` on
  // the actual www host. Without this, Next would resolve them against
  // localhost in dev and — worse — against whatever non-www host the env
  // happened to define, which is what triggered the "Non-Indexable
  // Canonical" warnings in Screaming Frog.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ITAI — Modern Digital Systems",
    template: "%s · ITAI",
  },
  description:
    "Custom websites, AI automation, booking systems, dashboards, and scalable web infrastructure for growing businesses.",
  applicationName: "ITAI",
  keywords: [
    "web development",
    "AI automation",
    "booking systems",
    "dashboards",
    "Next.js agency",
    "custom web apps",
  ],
  authors: [{ name: "ITAI" }],
  creator: "ITAI",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ITAI — Modern Digital Systems",
    description:
      "Custom websites, AI automation, booking systems, dashboards, and scalable web infrastructure for growing businesses.",
    siteName: "ITAI",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ITAI — Modern Digital Systems",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ITAI — Modern Digital Systems",
    description:
      "Custom websites, AI automation, booking systems, dashboards, and scalable web infrastructure.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-paper text-ink antialiased flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </Providers>
        <script {...jsonLdScriptProps(organizationLd())} />
        <script {...jsonLdScriptProps(websiteLd())} />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
