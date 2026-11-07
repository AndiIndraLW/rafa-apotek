'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductDetail } from '@/data/products';

interface ProductCardProps {
  product: ProductDetail;
  onAddToCart: (product: ProductDetail) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/produk/${product.slug}`)}
      className="group cursor-pointer flex flex-col justify-between transition-all"
    >
      <div>
        {/* 1. Image Container (Full with Object Fit Cover) */}
        <div className="relative w-full aspect-square bg-[#F4F4F6] rounded-xl sm:rounded-3xl overflow-hidden transition-colors">
          
          {/* Top-Left: Prescription Required Badge */}
          {product.prescriptionRequired && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-rose-600 border border-rose-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Resep
            </div>
          )}

          {/* Product Image - Full & Object Cover */}
          <Image
            src={product.image}
            alt={product.alt || product.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* 2. Title & Price in Rupiah */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 mt-2.5 sm:mt-4">
          <h3 className="font-sans font-semibold text-xs sm:text-base text-stone-900 tracking-tight leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
            {product.title}
          </h3>
          <span className="font-sans font-bold text-xs sm:text-base text-[#0D2B24] shrink-0 whitespace-nowrap">
            {product.price}
          </span>
        </div>

        {/* 3. Subtitle / Indication (tanpa rating) */}
        <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 line-clamp-1 font-normal leading-relaxed">
          {product.indication || product.size}
        </p>
      </div>

      {/* 4. Action: Add to Cart Pill Button */}
      <div className="mt-2.5 sm:mt-3.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold text-stone-900 border border-stone-800 hover:bg-[#0D2B24] hover:border-[#0D2B24] hover:text-white active:scale-95 transition-all duration-150 cursor-pointer"
          aria-label={`Tambah ${product.title} ke keranjang`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
