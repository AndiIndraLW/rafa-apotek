'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Plus,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  X,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS_DATA, ProductDetail } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CATEGORIES = [
  { id: 'semua', label: 'Semua Obat' },
  { id: 'resep', label: 'Resep & Klinis' },
  { id: 'metabolik', label: 'Metabolik & Vitalitas' },
  { id: 'imunitas', label: 'Vitamin & Imunitas' },
  { id: 'peptida', label: 'Hormon & Peptida' },
  { id: 'pencernaan', label: 'Pencernaan & Sendi' },
  { id: 'tidur', label: 'Sirkadian & Tidur' },
] as const;

export default function KatalogObatPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [sortBy, setSortBy] = useState<'rekomendasi' | 'harga-asc' | 'harga-desc' | 'nama-asc'>('rekomendasi');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // Filter by Category
    if (selectedCategory !== 'semua') {
      result = result.filter((item) => item.categorySlug === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.indication.toLowerCase().includes(q) ||
          item.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'harga-asc':
        result.sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case 'harga-desc':
        result.sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      case 'nama-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Rekomendasi: default order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-[#0D2B24] text-slate-100 flex flex-col selection:bg-[#34D399] selection:text-[#0D2B24]">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section data-theme="dark" className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 md:px-12 bg-gradient-to-b from-[#0A231C] to-[#0D2B24] border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-emerald-300">Katalog Obat Farmasi</span>
          </nav>

          {/* Main Header Grid: Copy on left, Pharmacy Graphic on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[#34D399] text-xs font-mono uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34D399]" />
                <span>100% OBAT ASLI &amp; PENGAWASAN APOTEKER</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] text-white font-light tracking-tight text-balance">
                Katalog Obat &amp; Formula <br />
                Kesehatan Rafa Apotek.
              </h1>
              <p className="mt-4 text-emerald-100/80 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Temukan sediaan obat terdaftar BPOM, peracikan farmasi klinis, nutrisi umur panjang, dan tebus resep dokter dengan jaminan rantai dingin (*cold-chain*) serta konsultasi apoteker berizin.
              </p>
            </div>

            {/* Right Column: Pharmacy Visual Graphic */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                
                {/* Main Pharmacy Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-emerald-950/60 group">
                  <Image
                    src="/images/apotek.jpg"
                    alt="Apotek Rafa Apotek - Instalasi Farmasi Resmi dan Konsultasi Apoteker"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Subtle Gradient & Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B24]/90 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top-Left Pharmacy Badge */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0D2B24] font-semibold text-xs shadow-md">
                    <div className="w-4 h-4 rounded-full bg-[#059669] flex items-center justify-center text-white">
                      <Plus className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Instalasi Farmasi Resmi</span>
                  </div>

                  {/* Top-Right Latin Rx Symbol */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-xl bg-[#0D2B24]/85 backdrop-blur-md border border-[#34D399]/40 text-[#34D399] font-mono font-bold text-xs shadow-md">
                    ℞ RESEP
                  </div>
                </div>

                {/* Floating Pharmacy Certification Card (Bottom Right) */}
                <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 bg-white text-[#0D2B24] rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-emerald-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-9 h-9 rounded-xl bg-[#EAFBF1] border border-emerald-200/80 flex items-center justify-center text-[#059669] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left leading-tight pr-1">
                    <span className="block text-xs font-bold text-[#0D2B24]">SIA &amp; SIPA Kemenkes</span>
                    <span className="text-[10px] text-stone-500 font-medium">Pengawasan Apoteker Berizin</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sertifikasi Resmi BPOM & Kemenkes</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <ThermometerSnowflake className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pengemasan Rantai Dingin Terjaga</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verifikasi Resep &lt; 15 Menit</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Privasi Pasien Terjamin 100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section (Light Background for maximum readability) */}
      <section data-theme="light" className="flex-1 bg-[#FBF9F5] py-12 sm:py-16 text-[#0D2B24]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Search & Filter Controls */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-sm border border-black/[0.04] mb-8 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari obat, zat aktif (contoh: NAD+, Berberin, Kolagen, Resep)..."
                  className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#0D2B24] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span className="text-xs text-slate-500 font-medium">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0D2B24] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                >
                  <option value="rekomendasi">Rekomendasi Apoteker</option>
                  <option value="harga-asc">Harga: Terendah ke Tertinggi</option>
                  <option value="harga-desc">Harga: Tertinggi ke Terendah</option>
                  <option value="nama-asc">Nama Obat: A - Z</option>
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.id === 'semua'
                    ? PRODUCTS_DATA.length
                    : PRODUCTS_DATA.filter((p) => p.categorySlug === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#0D2B24] text-white shadow-sm'
                        : 'bg-slate-100/80 text-stone-600 hover:bg-slate-200/80 hover:text-stone-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 text-xs text-slate-600">
            <div>
              Menampilkan <strong className="text-[#0D2B24]">{filteredProducts.length}</strong> formula farmasi
              {searchQuery && (
                <span>
                  {' '}untuk kata kunci &ldquo;<strong className="text-[#0D2B24]">{searchQuery}</strong>&rdquo;
                </span>
              )}
            </div>

            {(selectedCategory !== 'semua' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('semua');
                  setSearchQuery('');
                }}
                className="text-emerald-800 hover:underline font-semibold"
              >
                Reset Semua Filter
              </button>
            )}
          </div>

          {/* 12 Products Grid (4 columns on desktop matching user preference) */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-black/[0.04] shadow-sm max-w-lg mx-auto my-8">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl text-[#0D2B24] font-normal mb-2">
                Obat Tidak Ditemukan
              </h3>
              <p className="text-[#4B5E57] text-xs sm:text-sm leading-relaxed mb-6">
                Kami tidak menemukan obat yang cocok dengan pencarian Anda. Apoteker kami siap membantu mencarikan atau meracik formula yang Anda butuhkan.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('semua');
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Lihat Semua Obat
                </button>
                <a
                  href="https://wa.me/6282308230823?text=Halo%20Apoteker%20Rafa,%20saya%20mencari%20obat%20yang%20belum%20ada%20di%20katalog."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] transition-all w-full sm:w-auto cursor-pointer shadow-sm"
                >
                  Tanya Apoteker via WhatsApp ↗
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.number}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}

          {/* Need Pharmacist Help Banner */}
          <div className="mt-16 rounded-3xl bg-[#0D2B24] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase text-[#34D399] tracking-wider block mb-2">
                LAYANAN FARMASI KLINIS RAFA APOTEK
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-2">
                Butuh Konsultasi Obat atau Dosis Khusus?
              </h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm font-light leading-relaxed">
                Apoteker kami selalu siaga menjawab pertanyaan mengenai interaksi obat, aturan pakai, efek samping, dan verifikasi resep dokter Anda secara gratis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://wa.me/6282338611163?text=Halo%20Apoteker%20Rafa,%20saya%20ingin%20konsultasi%20obat."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 transition-all text-center cursor-pointer shadow-md"
              >
                Konsultasi Apoteker (082338611163) ↗
              </a>
              <Link
                href="/#layanan"
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-medium text-emerald-100 bg-white/10 hover:bg-white/15 border border-white/15 text-center transition-all cursor-pointer"
              >
                Pelajari Alur Apotek
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
