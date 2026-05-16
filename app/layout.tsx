import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { CompareProvider } from "@/context/CompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackPrep | Real-time Hackathon Ideas",
  description: "Explore real-world hackathon projects powered by Gemini AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden grid grid-cols-[280px_1fr] bg-[var(--color-bg)]">
        <CompareProvider>
          <Sidebar />
          <main className="h-screen overflow-y-auto min-w-0">
            <div className="max-w-[1200px] mx-auto px-12 py-12">
              {children}
            </div>
          </main>
        </CompareProvider>
      </body>
    </html>
  );
}
