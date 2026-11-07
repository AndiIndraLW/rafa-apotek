'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  ThermometerSnowflake,
  ShoppingBag,
  Plus,
  Minus,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Share2,
  Check,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS_DATA, ProductDetail } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  // Find product by id (number) or slug
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = PRODUCTS_DATA.find(
    (p) => p.number === id || p.slug === id || p.number.replace(/^0+/, '') === id
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0D2B24] text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-32 text-center">
          <div className="max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h1 className="font-display text-3xl mb-3">Obat Tidak Ditemukan</h1>
            <p className="text-emerald-100/80 text-sm mb-6 font-light">
              Produk farmasi yang Anda cari tidak tersedia atau tautan telah kedaluwarsa.
            </p>
            <Link
              href="/katalog-obat"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Katalog Obat</span>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCartWithQuantity = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // 4 Related products (different from current)
  const relatedProducts = PRODUCTS_DATA.filter((p) => p.number !== product.number).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0D2B24] text-slate-100 flex flex-col selection:bg-[#34D399] selection:text-[#0D2B24]">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Breadcrumb Navigation Header */}
      <div data-theme="dark" className="pt-24 sm:pt-32 pb-6 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <nav className="flex items-center gap-2 text-xs text-emerald-200/60 font-mono flex-wrap">
          <Link href="/" className="hover:text-emerald-300 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/katalog-obat" className="hover:text-emerald-300 transition-colors">
            Katalog Obat
          </Link>
          <span>/</span>
          <span className="text-[#34D399] truncate max-w-xs">{product.title}</span>
        </nav>
      </div>

      {/* Product Detail Main Section (Light Section for Clean Medical Reading) */}
      <section data-theme="light" className="bg-[#FBF9F5] py-10 sm:py-16 text-[#0D2B24] flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: FOTO OBAT */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-black/[0.04]">
                {/* Main Product Image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Price Tag Pill */}
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0D2B24] font-bold text-sm shadow-md">
                    {product.price}
                  </div>

                  {/* Category 2 Overlay Badge on Image */}
                  <div className="absolute bottom-4 left-4">
                    {product.prescriptionRequired ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 text-white font-mono text-[10px] font-bold tracking-wider shadow-md">
                        <AlertCircle className="w-3.5 h-3.5" />
                        WAJIB RESEP DOKTER
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-700 text-white font-mono text-[10px] font-bold tracking-wider shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        OBAT BEBAS (TANPA RESEP)
                      </span>
                    )}
                  </div>
                </div>

                {/* Packaging & Verification Badges */}
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <ThermometerSnowflake className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Kemasan Rantai Dingin</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>100% Produk Asli BPOM</span>
                  </div>
                </div>

                {/* BPOM Registration Note */}
                {product.bpomNumber && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-mono text-slate-600 flex items-center justify-between">
                    <span>Nomor Registrasi:</span>
                    <strong className="text-[#0D2B24]">{product.bpomNumber}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: DETAIL INFORMASI OBAT */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Badges & Share */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Kategori 1 */}
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-900 font-semibold bg-emerald-100/70 px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  {/* Kategori 2: Butuh Resep Dokter / Tidak */}
                  {product.prescriptionRequired ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-rose-800 font-semibold bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                      <AlertCircle className="w-3 h-3" />
                      Butuh Resep Dokter
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Tanpa Resep Dokter
                    </span>
                  )}
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0D2B24] transition-colors p-1.5 rounded-lg hover:bg-black/5"
                  title="Bagikan tautan obat"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Bagikan</span>
                    </>
                  )}
                </button>
              </div>

              {/* Judul Obat */}
              <div>
                <h1 className="font-display text-3xl sm:text-4xl text-[#0D2B24] font-normal tracking-tight leading-tight">
                  {product.title}
                </h1>
                <p className="text-[#4B5E57] text-sm mt-2 font-light">
                  {product.size} &bull; Sediaan Farmasi Klinis Terstandarisasi
                </p>
              </div>

              {/* Harga & Informasi Finansial */}
              <div className="p-5 rounded-2xl bg-white border border-black/[0.04] shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 uppercase font-mono">Harga Resmi Apotek</div>
                  <div className="font-sans text-3xl font-bold text-[#0D2B24] mt-0.5">
                    {product.price}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Kuitansi Asuransi Tersedia
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">Termasuk PPN & Jasa Apoteker</div>
                </div>
              </div>

              {/* Kategori 2 Explanation Alert Box */}
              {product.prescriptionRequired ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-xs text-rose-900 space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Perhatian: Obat Ini Memerlukan Resep Dokter</span>
                  </div>
                  <p className="text-rose-800 leading-relaxed font-light">
                    Sesuai regulasi Kemenkes RI, sediaan obat keras klinis ini wajib ditebus dengan resep dokter asli. Anda dapat langsung mengirim foto resep Anda kepada apoteker kami untuk diverifikasi dalam waktu &lt; 15 menit.
                  </p>
                  <a
                    href={`https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20untuk%20${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-900 bg-white px-3.5 py-1.5 rounded-lg border border-rose-300 hover:bg-rose-100 transition-colors shadow-xs"
                  >
                    <span>Kirim Resep Obat Ini via WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Obat Bebas &amp; Suplemen Terdaftar BPOM</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed font-light">
                    Produk ini dapat Anda beli secara langsung tanpa perlu menyertakan resep dokter. Tetap baca aturan pakai yang dianjurkan oleh apoteker kami di bawah.
                  </p>
                </div>
              )}

              {/* PEMBELIAN & AKSI KERANJANG (Pindah ke bawah Kategori 2 / Obat Bebas) */}
              <div className="bg-white rounded-2xl p-6 border border-black/[0.04] shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="text-slate-500 hover:text-slate-900 disabled:opacity-30 p-1"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-semibold text-[#0D2B24] px-2 min-w-[2ch] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-slate-500 hover:text-slate-900 p-1"
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCartWithQuantity}
                    className="flex-1 py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Tambah {quantity > 1 ? `(${quantity}) ` : ''}ke Keranjang Belanja</span>
                  </button>
                </div>

                {/* WhatsApp Direct Consult Button */}
                <a
                  href={`https://wa.me/6282338611163?text=Halo%20Apoteker%20Rafa,%20saya%20ingin%20konsultasi%20mengenai%20${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full text-xs font-semibold text-[#0D2B24] bg-white hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 border border-stone-200 cursor-pointer shadow-xs"
                >
                  <span>Tanya Apoteker tentang Obat Ini (082338611163)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* DESKRIPSI OBAT */}
              <div className="bg-white rounded-2xl p-6 border border-black/[0.04] shadow-sm space-y-3">
                <h2 className="font-display text-xl text-[#0D2B24] font-normal flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>Deskripsi &amp; Indikasi Obat</span>
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Komposisi Bahan Aktif */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-800 mb-2">Komposisi Zat Aktif Utama:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARA PEMAKAIAN OBAT */}
              <div className="bg-white rounded-2xl p-6 border border-black/[0.04] shadow-sm space-y-4">
                <h2 className="font-display text-xl text-[#0D2B24] font-normal flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span>Cara Pemakaian Obat &amp; Dosis</span>
                </h2>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-950 font-medium">
                  Aturan Dosis: <span className="font-normal">{product.dosage}</span>
                </div>

                <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-2">
                  <div className="font-semibold text-slate-900">Petunjuk Konsumsi dari Apoteker:</div>
                  <p className="font-light text-slate-600">{product.dosageInstructions}</p>
                </div>

                {/* Cara Penyimpanan */}
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <strong className="text-slate-900">Petunjuk Penyimpanan: </strong>
                  <span>{product.storage}</span>
                </div>
              </div>

            </div>
          </div>

          {/* RELATED PRODUCTS SECTION */}
          <div className="mt-20 pt-12 border-t border-black/[0.06]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-900/70 block mb-1">
                  REKOMENDASI APOTEKER
                </span>
                <h2 className="font-display text-2xl sm:text-3xl text-[#0D2B24] font-normal">
                  Obat &amp; Formula Terkait Lainnya
                </h2>
              </div>
              <Link
                href="/katalog-obat"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 hover:underline"
              >
                <span>Lihat Semua Katalog</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.number}
                  product={rel}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
