import type { Metadata } from 'next';
import { ppMuseum } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Verdant — A calmer, clearer path to feeling like yourself',
  description: 'Verdant unites clinicians, pharmacies and labs in one connected system — so your care arrives on time, in one place, and entirely on your terms.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ppMuseum.variable}>
      <body className="antialiased bg-[#0e2334] text-slate-100 selection:bg-[#5ff39d] selection:text-[#09161e]">
        {children}
      </body>
    </html>
  );
}
