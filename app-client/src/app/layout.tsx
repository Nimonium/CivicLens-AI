import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopNav, BottomNav } from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Community Hero",
  description: "Fix Your Community, One Issue at a Time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground pb-20 md:pb-0 flex flex-col`} suppressHydrationWarning>
        <TopNav />
        <main className="flex-1 w-full max-w-7xl mx-auto">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
