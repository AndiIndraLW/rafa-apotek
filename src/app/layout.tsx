import type { Metadata } from 'next';
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
      <body className="antialiased bg-[#0e2334] text-slate-100 selection:bg-[#5beba6] selection:text-[#09161e]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
