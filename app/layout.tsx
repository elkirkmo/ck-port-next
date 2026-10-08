import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Duck from './components/Duck';
import StickyHeader from './components/StickyHeader';
import { siteUrl } from './siteConfig';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Chris Kirkham',
  description: 'Web Developer and Digital Filmmaker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StickyHeader />
        {children}
        <Duck />
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
