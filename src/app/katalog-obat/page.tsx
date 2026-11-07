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
  FileText,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    <main className="min-h-screen bg-[#0e2334] text-slate-100 flex flex-col selection:bg-[#5beba6] selection:text-[#081822]">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Header Section */}
      <section data-theme="dark" className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 md:px-12 bg-gradient-to-b from-[#091a24] to-[#0e2334] border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="text-emerald-300">Katalog Obat Farmasi</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% OBAT ASLI & PENGAWASAN APOTEKER</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] text-white font-normal tracking-tight">
                Katalog Obat & Formula <br />
                Kesehatan Rafa Apotek.
              </h1>
              <p className="mt-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Temukan sediaan obat terdaftar BPOM, peracikan farmasi klinis, nutrisi umur panjang, dan tebus resep dokter dengan jaminan rantai dingin (*cold-chain*) serta konsultasi apoteker berizin.
              </p>
            </div>

            {/* Quick Prescription Banner on Header */}
            <div className="lg:max-w-md w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-semibold text-white">Punya Resep Dokter?</h2>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Tidak perlu mencari obat satu per satu. Foto resep Anda dan kirim langsung ke apoteker kami melalui WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter%20dari%20katalog."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#aef773] px-4 py-1.5 rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Kirim Foto Resep ke WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
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
      <section data-theme="light" className="flex-1 bg-[#f5fbdf] py-12 sm:py-16 text-[#091f2c]">
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
                  className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-[#091f2c] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
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
                  className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#091f2c] font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
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
                        ? 'bg-[#091f2c] text-white shadow-sm'
                        : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
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
              Menampilkan <strong className="text-[#091f2c]">{filteredProducts.length}</strong> formula farmasi
              {searchQuery && (
                <span>
                  {' '}untuk kata kunci &ldquo;<strong className="text-[#091f2c]">{searchQuery}</strong>&rdquo;
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
              <h3 className="font-serif text-2xl text-[#091f2c] font-normal mb-2">
                Obat Tidak Ditemukan
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                Kami tidak menemukan obat yang cocok dengan pencarian Anda. Apoteker kami siap membantu mencarikan atau meracik formula yang Anda butuhkan.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('semua');
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Lihat Semua Obat
                </button>
                <a
                  href="https://wa.me/6282308230823?text=Halo%20Apoteker%20Rafa,%20saya%20mencari%20obat%20yang%20belum%20ada%20di%20katalog."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-105 transition-all w-full sm:w-auto cursor-pointer"
                >
                  Tanya Apoteker via WhatsApp ↗
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.number}
                  onClick={() => router.push(`/produk/${product.slug}`)}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative"
                >
                  <div>
                    {/* Card Thumbnail Image */}
                    <div className="relative w-full aspect-[409/240] rounded-xl overflow-hidden bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Price Tag Pill */}
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#091f2c] font-semibold text-[11px] shadow-sm">
                        {product.price}
                      </div>

                      {product.prescriptionRequired && (
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-500/90 text-white font-mono text-[9px] font-bold shadow-sm">
                          RESEP DOKTER
                        </div>
                      )}
                    </div>

                    {/* Category Tag */}
                    <div className="mt-4 mb-2 flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-800/80 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {product.size.split('(')[0]}
                      </span>
                    </div>

                    {/* Product Title (Kecilkan font judul obat) */}
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#091f2c] tracking-tight leading-snug mb-1.5 group-hover:text-emerald-800 transition-colors line-clamp-2 min-h-[2.6rem]">
                      {product.title}
                    </h3>

                    {/* Indication */}
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {product.indication}
                    </p>
                  </div>

                  {/* Card Footer: Price & Add to Cart */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-serif text-sm sm:text-base font-medium text-[#091f2c]">
                      {product.price}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="flex items-center gap-1 text-[11px] text-emerald-900 font-semibold group-hover:underline cursor-pointer"
                      aria-label={`Tambah ${product.title} ke keranjang`}
                    >
                      <span className="hidden xl:inline">Tambah</span>
                      <span className="xl:hidden">+ Keranjang</span>
                      <div className="w-6 h-6 rounded-full bg-[#091f2c]/5 group-hover:bg-[#091f2c] group-hover:text-white transition-all flex items-center justify-center text-slate-700 ml-1">
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Need Pharmacist Help Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0e2334] to-[#122e44] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider block mb-2">
                LAYANAN FARMASI KLINIS RAFA APOTEK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                Butuh Konsultasi Obat atau Dosis Khusus?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                Apoteker kami selalu siaga menjawab pertanyaan mengenai interaksi obat, aturan pakai, efek samping, dan verifikasi resep dokter Anda secara gratis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href="https://wa.me/6282308230823?text=Halo%20Apoteker%20Rafa,%20saya%20ingin%20konsultasi%20obat."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-110 active:scale-95 transition-all text-center cursor-pointer shadow-sm"
              >
                Konsultasi Apoteker (082308230823) ↗
              </a>
              <Link
                href="/#layanan"
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all cursor-pointer"
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
