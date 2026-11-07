'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, ArrowUpRight, Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onOpenAssessment?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({
  cartCount: propCartCount,
  onOpenCart: propOnOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const cart = useCart();

  const cartCount = propCartCount !== undefined ? propCartCount : cart.totalCartCount;
  const handleOpenCart = propOnOpenCart || (() => cart.setCartOpen(true));

  useEffect(() => {
    const handleScroll = () => {
      // Navbar sample point in viewport
      const sampleX = window.innerWidth / 2;
      const sampleY = 48;

      const elements = document.elementsFromPoint(sampleX, sampleY);
      const lightSection = elements.some((el) => {
        const themeSection = el.closest('[data-theme]');
        return themeSection?.getAttribute('data-theme') === 'light';
      });

      setIsLightSection(lightSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Katalog Obat', href: '/katalog-obat', isExternal: false },
    {
      name: 'Tebus Resep',
      href: 'https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter.',
      isExternal: true,
    },
    { name: 'Tanya Apoteker', href: '/#layanan', isExternal: false },
    { name: 'Tentang Apotek', href: '/#tentang', isExternal: false },
  ];

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto transition-all duration-300 pointer-events-none">
      {/* Dynamic Glass Navbar Container adapting to Light/Dark backgrounds */}
      <nav
        className={`pointer-events-auto relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-md backdrop-saturate-150 transition-all duration-300 ${
          isLightSection
            ? 'bg-white/60 hover:bg-white/75 border border-black/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.9)]'
            : 'bg-white/[0.05] hover:bg-white/[0.08] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.25)]'
        }`}
      >
        {/* Brand Logo - Rafa Apotek */}
        <Link href="/" className="flex items-center gap-2.5 group pl-1">
          <div className="w-6 h-6 rounded-md bg-[#6ae7b8] flex items-center justify-center text-[#091f2c] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Plus className="w-4 h-4 stroke-[3]" />
          </div>
          <span
            className={`text-base sm:text-lg font-medium tracking-tight transition-colors duration-300 ${
              isLightSection ? 'text-[#091f2c]' : 'text-white'
            }`}
          >
            Rafa Apotek
          </span>
        </Link>

        {/* Center Nav Links - Pharmacy Menus */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3.5 py-1.5 rounded-full text-xs font-normal tracking-wide transition-all duration-300 cursor-pointer ${
                  isLightSection
                    ? 'text-[#091f2c]/75 hover:text-[#091f2c] hover:bg-black/[0.05]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-normal tracking-wide transition-all duration-300 cursor-pointer ${
                  isLightSection
                    ? 'text-[#091f2c]/75 hover:text-[#091f2c] hover:bg-black/[0.05]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Right Action Button & Cart */}
        <div className="hidden md:flex items-center gap-3 pr-1">
          <button
            onClick={handleOpenCart}
            className={`relative p-2 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
              isLightSection
                ? 'text-[#091f2c] hover:bg-black/[0.05]'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Lihat Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5beba6] text-[#091a24] text-[10px] font-bold flex items-center justify-center animate-in zoom-in-75">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#7beea6] hover:brightness-110 hover:shadow-[0_0_20px_rgba(91,235,166,0.35)] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Tebus Resep</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Mobile menu trigger & cart */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleOpenCart}
            className={`relative p-2 rounded-full transition-all duration-200 active:scale-90 cursor-pointer ${
              isLightSection
                ? 'text-[#091f2c] hover:bg-black/[0.05]'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Lihat Keranjang Belanja"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5beba6] text-[#091a24] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isLightSection
                ? 'text-[#091f2c] hover:bg-black/[0.05]'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown with Glassmorphism */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto md:hidden mt-3 p-5 backdrop-blur-2xl rounded-3xl border shadow-[0_16px_40px_rgba(0,0,0,0.35)] flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200 transition-colors ${
            isLightSection
              ? 'bg-white/90 border-black/10 text-[#091f2c]'
              : 'bg-[#091a24]/90 border-white/20 text-white'
          }`}
        >
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-sm font-medium transition-colors ${
                  isLightSection ? 'hover:text-[#091f2c]' : 'hover:text-emerald-400'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-sm font-medium transition-colors ${
                  isLightSection ? 'hover:text-[#091f2c]' : 'hover:text-emerald-400'
                }`}
              >
                {link.name}
              </Link>
            )
          )}
          <a
            href="https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#7beea6] shadow-sm cursor-pointer"
          >
            Tebus Resep Dokter ↗
          </a>
        </div>
      )}
    </header>
  );
}
