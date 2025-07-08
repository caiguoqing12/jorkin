import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ConfigProvider } from 'antd';
import { ModalProvider } from '@/component/ModalProvider';
import ModalContainer from '@/component/ModalContainer';
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
        <ConfigProvider theme={{ token: { colorPrimary: '#FB6011' } }}>
          <ModalProvider>
            {children}
            <ModalContainer />
          </ModalProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
