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
      // Navbar sample point in viewport (vertical center of the bar)
      const sampleX = window.innerWidth / 2;
      const sampleY = 32;

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

  const whatsappHref =
    'https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter.';

  // Design-system tokens (MASTER.md): light = alabaster bar, dark = botanical bar.
  const barTone = isLightSection
    ? 'bg-bg text-ink border-border'
    : 'bg-brand text-ink-on-dark border-border-on-dark';
  const focusRing = isLightSection
    ? 'focus-visible:outline-interactive'
    : 'focus-visible:outline-accent-on-dark';
  const linkClass = `inline-flex items-center min-h-11 px-3 text-sm font-medium whitespace-nowrap underline-offset-[10px] decoration-2 hover:underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing} ${
    isLightSection ? 'decoration-interactive' : 'decoration-accent-on-dark'
  }`;
  const iconButtonClass = `relative inline-flex items-center justify-center w-11 h-11 rounded-md transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing} ${
    isLightSection ? 'hover:bg-surface-sunken' : 'hover:bg-white/10'
  }`;
  const badgeClass = isLightSection
    ? 'bg-interactive text-on-interactive'
    : 'bg-accent-on-dark text-brand';
  const primaryButtonClass = `inline-flex items-center justify-center gap-1.5 min-h-11 px-5 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing} ${
    isLightSection
      ? 'bg-interactive text-on-interactive hover:bg-interactive-hover hover:text-white'
      : 'bg-accent-on-dark text-brand hover:brightness-105'
  }`;

  const cartButton = (
    <button
      onClick={handleOpenCart}
      className={iconButtonClass}
      aria-label="Lihat Keranjang Belanja"
    >
      <ShoppingBag className="w-5 h-5" aria-hidden="true" />
      {cartCount > 0 && (
        <span
          className={`absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-semibold leading-none flex items-center justify-center ${badgeClass}`}
        >
          {cartCount}
        </span>
      )}
    </button>
  );

  return (
    <header
      data-on={isLightSection ? 'light' : 'dark'}
      className={`fixed top-0 inset-x-0 z-50 w-full border-b font-sans transition-colors duration-200 ${barTone}`}
    >
      <nav
        aria-label="Navigasi utama"
        className="max-w-7xl mx-auto h-14 md:h-16 px-5 sm:px-8 lg:px-12 flex items-center justify-between"
      >
        {/* Brand Logo - Rafa Apotek */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing}`}
        >
          <div className="w-6 h-6 rounded-sm bg-interactive flex items-center justify-center text-brand">
            <Plus className="w-4 h-4 stroke-[3]" aria-hidden="true" />
          </div>
          <span className="font-display text-xl font-normal tracking-tight">Rafa Apotek</span>
        </Link>

        {/* Center Nav Links - Pharmacy Menus */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-3">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {link.name}
              </a>
            ) : (
              <Link key={link.name} href={link.href} className={linkClass}>
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Right Action Button & Cart */}
        <div className="hidden lg:flex items-center gap-3">
          {cartButton}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryButtonClass}
          >
            <span>Tebus Resep</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu trigger & cart */}
        <div className="flex lg:hidden items-center gap-1 -mr-2">
          {cartButton}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${iconButtonClass} transition-transform duration-200 active:scale-90`}
            aria-label="Buka Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Menu
                className={`w-5 h-5 transition-all duration-300 absolute ${
                  mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
                aria-hidden="true"
              />
              <X
                className={`w-5 h-5 transition-all duration-300 absolute ${
                  mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel with Smooth Grid Height & Opacity Animation */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-full inset-x-0 border-b grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${barTone} ${
          mobileMenuOpen
            ? 'grid-rows-[1fr] opacity-100 shadow-xl'
            : 'grid-rows-[0fr] opacity-0 pointer-events-none border-b-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-5 sm:px-8 pt-2 pb-5 flex flex-col transition-transform duration-300 ease-out ${
              mobileMenuOpen ? 'translate-y-0' : '-translate-y-2'
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
                  className={`flex items-center min-h-12 text-base font-medium border-b ${
                    isLightSection ? 'border-border' : 'border-border-on-dark'
                  } focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing}`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center min-h-12 text-base font-medium border-b ${
                    isLightSection ? 'border-border' : 'border-border-on-dark'
                  } focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing}`}
                >
                  {link.name}
                </Link>
              )
            )}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-4 w-full ${primaryButtonClass}`}
            >
              Tebus Resep Dokter ↗
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
