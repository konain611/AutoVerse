import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoVerse",
  description: "Plug & play AI agents for your applications.",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto_mono.variable} antialiased bg-black text-white`}>
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}
