'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Play,
  ArrowRight,
  Search,
  ShoppingBag,
  ChevronDown,
  Plus,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeroProps {
  onOpenAssessment: () => void;
}

export default function Hero({ onOpenAssessment }: HeroProps) {
  const router = useRouter();
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: 'Semua Kategori', href: '/katalog-obat' },
    { name: 'Obat Resep', href: '/katalog-obat?kategori=obat-resep' },
    { name: 'Obat Bebas & Flu', href: '/katalog-obat?kategori=obat-bebas' },
    { name: 'Vitamin & Suplemen', href: '/katalog-obat?kategori=vitamin' },
    { name: 'Ibu & Anak', href: '/katalog-obat?kategori=ibu-anak' },
    { name: 'Perawatan Medis', href: '/katalog-obat?kategori=perawatan' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/katalog-obat?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/katalog-obat');
    }
  };

  const whatsappHref =
    'https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter.';

  const whatsappKonsultasiHref =
    'https://wa.me/6282338611163?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20konsultasi.';

  return (
    <section className="font-sans px-3 sm:px-5 lg:px-8 pt-4 pb-8 md:pb-12">
      {/* Main Hero Card Container */}
      <div className="relative overflow-visible bg-[#0D2B24] text-white rounded-[2rem] md:rounded-[2.5rem] max-w-[1440px] mx-auto shadow-2xl transition-all">
        
        {/* ======================================================== */}
        {/* 1. TOP MENU / NAVBAR INSIDE HERO                         */}
        {/* ======================================================== */}
        <div className="pt-5 sm:pt-6 px-5 sm:px-8 lg:px-10 pb-6 border-b border-white/10">
          <div className="flex items-center justify-between gap-3 lg:gap-4">
            
            {/* Brand Logo - White pill tab as in reference */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-[#0D2B24] px-4 py-2 rounded-full font-display text-lg sm:text-xl font-bold tracking-tight shadow-md hover:bg-white/95 transition-all shrink-0"
            >
              <div className="w-5 h-5 rounded-full bg-[#059669] flex items-center justify-center text-white">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>Rafa Apotek</span>
            </Link>

            {/* Desktop Center: Categories & Search Bar */}
            <div className="hidden lg:flex items-center gap-3 flex-1 max-w-2xl mx-2">
              
              {/* Category Dropdown Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="inline-flex items-center gap-1.5 bg-white text-[#0D2B24] px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-white/90 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
                >
                  <span>Semua Kategori</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {categoryDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-52 bg-white text-[#0D2B24] rounded-2xl shadow-2xl border border-emerald-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setCategoryDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-medium hover:bg-emerald-50 hover:text-[#059669] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Bar matching Reference */}
              <form onSubmit={handleSearch} className="relative flex-1">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-white/60 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari obat resep, vitamin, produk kesehatan..."
                    className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-white/40 text-white placeholder:text-white/60 text-xs sm:text-sm rounded-full pl-10 pr-4 py-2.5 outline-none transition-all duration-150"
                  />
                </div>
              </form>
            </div>

            {/* Desktop Right: Konsultasi Button & Cart */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Konsultasi Button -> WhatsApp */}
              <a
                href={whatsappKonsultasiHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs font-semibold text-white border border-white/25 hover:bg-white/10 hover:border-white/40 transition-colors cursor-pointer"
              >
                Konsultasi
              </a>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={() => cart.setCartOpen(true)}
                className="relative w-10 h-10 rounded-full border border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Lihat Keranjang Belanja"
              >
                <ShoppingBag className="w-4 h-4" />
                {cart.totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#34D399] text-[#0D2B24] rounded-full text-[10px] font-bold flex items-center justify-center shadow">
                    {cart.totalCartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions: Cart & Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => cart.setCartOpen(true)}
                className="relative w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white"
                aria-label="Lihat Keranjang"
              >
                <ShoppingBag className="w-4 h-4" />
                {cart.totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 bg-[#34D399] text-[#0D2B24] rounded-full text-[9px] font-bold flex items-center justify-center">
                    {cart.totalCartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white transition-transform duration-200 active:scale-90"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Menu
                    className={`w-4 h-4 transition-all duration-300 absolute ${
                      mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <X
                    className={`w-4 h-4 transition-all duration-300 absolute ${
                      mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                    }`}
                  />
                </div>
              </button>
            </div>

          </div>

          {/* Mobile Collapsible Menu with Smooth Height & Fade/Slide Animation */}
          <div
            className={`lg:hidden grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileMenuOpen
                ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10'
                : 'grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0 pointer-events-none'
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`flex flex-col gap-3 transition-transform duration-300 ease-out ${
                  mobileMenuOpen ? 'translate-y-0' : '-translate-y-2'
                }`}
              >
                <form onSubmit={handleSearch} className="relative w-full">
                  <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari obat, vitamin..."
                    className="w-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 text-xs rounded-full pl-9 pr-4 py-2.5 outline-none focus:border-[#34D399] transition-colors"
                  />
                </form>

                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <Link
                    href="/katalog-obat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2.5 py-2 bg-white/10 hover:bg-white/15 active:scale-95 transition-all rounded-xl font-medium text-center text-white"
                  >
                    Katalog
                  </Link>
                  <a
                    href={whatsappKonsultasiHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2.5 py-2 bg-white/10 hover:bg-white/15 active:scale-95 transition-all rounded-xl font-medium text-center text-white"
                  >
                    Konsultasi
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-2 bg-[#34D399] hover:bg-[#2ec089] active:scale-95 transition-all text-[#0D2B24] rounded-xl font-semibold text-center"
                  >
                    Tebus Resep
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. HERO CONTENT BODY                                     */}
        {/* ======================================================== */}
        <div className="px-6 sm:px-10 lg:px-14 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Headlines & CTA (matches reference layout) */}
            <div className="lg:col-span-6 xl:col-span-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-emerald-200 font-medium mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Apotek Berizin Resmi Kemenkes &amp; BPOM</span>
              </div>

              <h1 className="font-display font-light text-[clamp(1.85rem,3.75vw,3rem)] leading-[1.14] tracking-[-0.02em] text-white text-balance max-w-lg">
                Solusi Obat &amp; Kebutuhan Kesehatan di Depan Pintu Anda
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-emerald-100/80 max-w-lg font-light">
                Rasakan kenyamanan hidup sehat setiap hari. Dari obat resep resmi dokter, suplemen harian hingga perawatan keluarga — 100% obat asli diawasi langsung oleh apoteker berizin.
              </p>

              {/* Action Buttons matching reference */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5">
                
                {/* Primary Button: Shop Wellness pill with arrow */}
                <Link
                  href="/katalog-obat"
                  className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold bg-white text-[#0D2B24] hover:bg-emerald-50 transition-all duration-150 shadow-lg cursor-pointer group"
                >
                  <span>Belanja Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Button: WhatsApp Tebus Resep / Konsultasi */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full text-sm font-medium text-white border border-white/25 hover:bg-white/10 transition-colors duration-150 cursor-pointer"
                >
                  <span>Tebus Resep Dokter</span>
                  <Play className="w-3 h-3 fill-current" />
                </a>

              </div>

            </div>

            {/* Right Column: Hero Visual with 98% Rating Card */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end">
              
              <div className="relative w-full max-w-[540px]">
                
                {/* Main Pharmacy / Health Image Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-emerald-950/40">
                  <Image
                    src="/images/apotek.jpg"
                    alt="Apotek Rafa Apotek melayani kebutuhan obat asli dan konsultasi apoteker"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  {/* Subtle vignette gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Stat Card: 98% Customer Satisfaction (matching reference) */}
                <div className="absolute -bottom-5 -right-2 sm:-bottom-6 sm:-right-4 lg:-bottom-7 lg:-right-6 bg-white text-[#0D2B24] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 w-60 sm:w-64 border border-emerald-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl sm:text-5xl font-bold leading-none tracking-tight text-[#0D2B24]">
                      98
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#059669] leading-none">%</span>
                  </div>

                  {/* Overlapping customer/pharmacist avatars */}
                  <div className="flex items-center -space-x-2 mt-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      RF
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#059669] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      AP
                    </div>
                    <div className="w-7 h-7 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      DR
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 pl-3">
                      5.000+ Ulasan
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium leading-snug">
                    Tingkat kepuasan pelanggan atas keaslian obat &amp; kecepatan layanan resep.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
