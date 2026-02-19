import "./globals.css";
import type { Metadata } from "next";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "LUMEN",
  description: "Principal Motion Intelligence System — Phase 0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--lumen-cream)] text-[var(--lumen-black)] antialiased">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
