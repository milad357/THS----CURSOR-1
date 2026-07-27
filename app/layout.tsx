import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgeGate from "@/components/AgeGate";
import { ThemeProvider } from "@/components/ThemeProvider";
import MobileContactFab from "@/components/MobileContactFab";

export const metadata: Metadata = {
  title: "T.H.S. Tactical Home Solutions",
  description: "Tactical training for everyday Americans. Home defense, firearms training, and security solutions.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen min-h-dvh flex-col bg-background hud-grid">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main-content"
            className="sr-only z-50 rounded-sm bg-background px-4 py-3 text-sm font-semibold text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-accent-red focus:ring-offset-2 focus:ring-offset-background"
          >
            Skip to main content
          </a>
          <AgeGate />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="relative flex-grow">
            {children}
          </main>
          <Footer />
          <MobileContactFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
