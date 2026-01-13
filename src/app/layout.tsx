import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import GlobalNoise from "@/components/GlobalNoise";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEXTERITY - Where Logic Meets Legends",
  description:
    "College-level technical and non-technical fest featuring Etch and Realm of Atheria events.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-stone-950`}
      >
        {/* Global background noise */}
        <GlobalNoise />

        {/* Site content */}
        <div className="relative z-0">
          {children}
        </div>
      </body>
    </html>
  );
}
