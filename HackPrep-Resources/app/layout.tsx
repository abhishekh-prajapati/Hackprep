import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackPrep | Explore AI-Validated Hackathon Ideas",
  description: "Discover curated, AI-validated concepts to build at your next hackathon. Filter by category, difficulty, and tech stack.",
};

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { SavedIdeasProvider } from "@/lib/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--hp-bg)] flex">
        <SavedIdeasProvider>
          <Sidebar />
          <div className="flex-1 ml-72 min-h-screen flex flex-col">
            <TopBar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </SavedIdeasProvider>
      </body>
    </html>
  );
}
