import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import { ppMuseum } from './fonts';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Rafa Apotek — Apotek Online Terpercaya, Obat 100% Asli & Tebus Resep Dokter',
  description: 'Apotek online resmi penyedia obat bebas, vitamin, suplemen, dan layanan tebus resep dokter. Pengawasan langsung apoteker berizin, pengiriman cepat dan aman.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={ppMuseum.variable}>
      <body className="antialiased bg-[#FBF9F5] text-[#111C18] selection:bg-[#34D399] selection:text-[#0D2B24] font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
