import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

/* ============================================================
   Font Configuration
   ============================================================ */

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

/* ============================================================
   SEO Metadata
   ============================================================ */

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — National Electricity Demand Forecasting`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "electricity forecasting",
    "energy analytics",
    "demand prediction",
    "grid management",
    "machine learning",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* ============================================================
   Root Layout
   ============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Subtle top gradient glow */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 top-0 z-0 h-72 gradient-glow"
          />

          {/* Cinematic Noise Overlay */}
          <div className="pointer-events-none fixed inset-0 z-[9999] bg-noise opacity-[0.03]" />

          {/* Global layout structure */}
          <Navbar />
          <div className="relative z-10 flex flex-1 flex-col">
            {children}
          </div>
          <Footer />

          {/* Toast notifications — monochromatic theme */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "!border-border/40 !bg-card !text-foreground !shadow-lg",
              descriptionClassName: "!text-muted-foreground",
            }}
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
