import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sans = Nanum_Gothic({subsets: ["latin"], weight: ['400', '700', '800']});

export const metadata: Metadata = {
  title: {
    default: '블로그',
    template: '블로그 | %s'
  },
  description: '프론트엔드 개발자를 꿈꾸는 사람의 블로그',
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.className}>
      <body className='flex flex-col w-full max-w-screen-lg mx-auto dark:text-white'>
        <Header />
        <main className='flex grow'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
