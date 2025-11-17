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
      <body className="min-h-screen flex flex-col bg-background hud-grid">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AgeGate />
          <Navbar />
          <main className="flex-grow relative">
            {children}
          </main>
          <Footer />
          <MobileContactFab />
        </ThemeProvider>
      </body>
    </html>
  );
}

