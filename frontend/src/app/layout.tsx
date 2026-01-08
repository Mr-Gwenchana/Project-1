import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Project1 - Third Party App",
  description: "Hệ thống quản lý tòa nhà, thiết bị và kiểm soát ra vào",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
