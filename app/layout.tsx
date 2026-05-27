import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://itaiwebsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "ITAI — Modern Digital Systems",
    description:
      "Custom websites, AI automation, booking systems, dashboards, and scalable web infrastructure for growing businesses.",
    siteName: "ITAI",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITAI — Modern Digital Systems",
    description:
      "Custom websites, AI automation, booking systems, dashboards, and scalable web infrastructure.",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
