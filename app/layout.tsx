// app\layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: 'TravelTrucks',
    template: '%s | TravelTrucks',
  },
  description: 'Camper rental platform by TravelTrucks',
  openGraph: {
    title: 'TravelTrucks',
    description: "Let's find campers of your dreams.",
    url: baseUrl,
    siteName: 'TravelTrucks',
    type: 'website',
  },
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap', // швидке відображення шрифту
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
