'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS_DATA, ProductDetail } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export type { ProductDetail };

interface ProductsProps {
  onOpenAssessment?: () => void;
  onAddToCart?: (product: ProductDetail) => void;
}

export default function Products({ onAddToCart }: ProductsProps) {
  const cart = useCart();
  const handleAddToCart = onAddToCart || ((product: ProductDetail) => cart.addToCart(product));

  return (
    <section id="products" data-theme="light" className="bg-[#FBF9F5] py-20 md:py-28 text-[#0D2B24] scroll-mt-6 border-t border-[#0D2B24]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#059669] block">
                PRODUK KAMI
              </span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl leading-[1.12] tracking-tight text-[#0D2B24]">
              Formula klinis untuk kesehatan <br className="hidden sm:inline" />
              menyeluruh Anda.
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-[#4B5E57] text-xs md:text-sm leading-relaxed">
              Resep peracikan apotek internal, zat aktif bioidentik, dan nutrisi umur panjang — diracik khusus untuk presisi seluler Anda.
            </p>
            <Link
              href="/katalog-obat"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D2B24] hover:text-[#059669] mt-4 hover:gap-3 transition-all group cursor-pointer"
            >
              <span>Jelajahi semua produk</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 12 Product Cards (2 per row on mobile, 4 per row on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8 mt-6">
          {PRODUCTS_DATA.map((product) => (
            <ProductCard
              key={product.number}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
