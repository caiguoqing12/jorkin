import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/component/Header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jorkin Learn",
  description: "Let's study together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${inter.className} bg-black/5`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
