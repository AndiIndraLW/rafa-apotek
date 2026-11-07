'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS_DATA, ProductDetail } from '@/data/products';
import { useCart } from '@/context/CartContext';

export type { ProductDetail };

interface ProductsProps {
  onOpenAssessment?: () => void;
  onAddToCart?: (product: ProductDetail) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const cart = useCart();
  const handleAddToCart = onAddToCart || ((product: ProductDetail) => cart.addToCart(product));

  return (
    <section id="products" data-theme="light" className="bg-[#f5fbdf] py-20 md:py-28 text-[#0a202d] scroll-mt-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-900/70 block">
                PRODUK KAMI
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.12] tracking-tight font-normal text-[#091f2c]">
              Formula klinis untuk kesehatan <br className="hidden sm:inline" />
              menyeluruh Anda.
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Resep peracikan apotek internal, zat aktif bioidentik, dan nutrisi umur panjang — diracik khusus untuk presisi seluler Anda.
            </p>
            <Link
              href="/katalog-obat"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#091f2c] mt-4 hover:gap-3 transition-all group cursor-pointer"
            >
              <span>Jelajahi semua produk</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 12 Product Cards (4 cards per row on large screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-4">
          {PRODUCTS_DATA.map((product) => (
            <div
              key={product.number}
              onClick={() => handleAddToCart(product)}
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
                </div>

                {/* Category Tag */}
                <div className="mt-4 mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-800/80 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Product Title */}
                <h3 className="font-serif text-base sm:text-lg font-normal text-[#091f2c] tracking-tight leading-snug mb-2 group-hover:text-emerald-800 transition-colors line-clamp-2 min-h-[2.6rem]">
                  {product.title}
                </h3>
              </div>

              {/* Card Footer: Clean Price & Add to Cart Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-serif text-sm sm:text-base font-medium text-[#091f2c]">
                  {product.price}
                </span>

                <div className="flex items-center gap-1 text-[11px] text-emerald-900 font-semibold group-hover:underline">
                  <span className="hidden xl:inline">Tambah</span>
                  <span className="xl:hidden">+ Keranjang</span>
                  <div className="w-6 h-6 rounded-full bg-[#091f2c]/5 group-hover:bg-[#091f2c] group-hover:text-white transition-all flex items-center justify-center text-slate-700 ml-1">
                    <ShoppingBag className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
