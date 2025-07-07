import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import { HeritageProvider } from "@/lib/heritage-context";
import GlobalHeritageWidget from "@/components/heritage/GlobalHeritageWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'UEH BizTech',
  description: 'UEH BizTech - Nền tảng kết nối cộng đồng doanh nghiệp và sinh viên UEH',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="vi">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <HeritageProvider>
            <Header />
            <main>{children}</main>
            <GlobalHeritageWidget />
            <div id="modal-root"></div>
          </HeritageProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
