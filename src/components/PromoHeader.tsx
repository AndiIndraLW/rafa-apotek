'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Tag, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PROMO_SLIDES = [
  {
    id: 1,
    emoji: '🎉',
    text: 'Promo Baru: Diskon hingga 25% Pembelian Pertama',
  },
  {
    id: 2,
    emoji: '🚚',
    text: 'Bebas Biaya Ongkos Kirim ke Seluruh Indonesia',
  },
  {
    id: 3,
    emoji: '🏷️',
    text: 'Gunakan Kode Kupon:',
    code: 'RAFASEHAT25',
  },
  {
    id: 4,
    emoji: '🛡️',
    text: '100% Produk Farmasi Asli Berizin BPOM',
  },
];

export default function PromoHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-slide effect for mobile
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);
  };

  const handleCopyCode = async (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback if clipboard API is not available
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 40) {
        // Swiped left -> next
        handleNext();
      } else if (distance < -40) {
        // Swiped right -> prev
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  return (
    <header className="w-full bg-[#EAFBF1] border-b border-[#C3ECD3] text-[#0A3D2E] font-sans text-xs md:text-sm tracking-normal relative z-40 transition-colors select-none">
      
      {/* ======================================================== */}
      {/* 1. MOBILE VERSION: 1 Line Auto-Sliding Carousel          */}
      {/* ======================================================== */}
      <div
        className="flex md:hidden items-center justify-between h-9 px-2 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Prev Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Promo Sebelumnya"
          className="shrink-0 p-1 text-[#059669]/60 hover:text-[#059669] active:scale-95 transition-all z-10 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Carousel Slide Track Container (Strictly 1 line, overflow-hidden) */}
        <div
          className="overflow-hidden flex-1 mx-1 h-full flex items-center relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex w-full transition-transform duration-500 ease-out items-center"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {PROMO_SLIDES.map((slide) => (
              <div
                key={slide.id}
                className="w-full shrink-0 flex items-center justify-center gap-1.5 text-center text-[11px] sm:text-xs font-medium text-[#0A3D2E] whitespace-nowrap px-1"
              >
                <span className="text-xs leading-none shrink-0">{slide.emoji}</span>
                <span className="truncate">{slide.text}</span>
                {slide.code && (
                  <button
                    type="button"
                    onClick={(e) => handleCopyCode(slide.code!, e)}
                    className="inline-flex items-center gap-1 font-bold tracking-wide bg-[#D3F5E1] hover:bg-[#c2f0d4] text-[#064E3B] px-1.5 py-0.5 rounded border border-[#A6EBC0] active:scale-95 transition-all cursor-pointer shrink-0 text-[10px]"
                    title="Salin Kode Promo"
                  >
                    {copied ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-[#059669]" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Tag className="w-2.5 h-2.5 text-[#059669]" />
                        <span>{slide.code}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Promo Berikutnya"
          className="shrink-0 p-1 text-[#059669]/60 hover:text-[#059669] active:scale-95 transition-all z-10 cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP VERSION: 1 Line Full Promo Bar Centered       */}
      {/* ======================================================== */}
      <div className="hidden md:flex max-w-7xl mx-auto py-2.5 px-4 items-center justify-center text-center gap-2">
        <span className="shrink-0 text-base leading-none">🎉</span>
        <p className="font-medium text-balance leading-snug">
          <span>
            Promo Spesial Pelanggan Baru: Nikmati Diskon hingga 25% + Bebas Biaya Ongkos Kirim ke Seluruh Indonesia untuk Pembelian Pertama | Gunakan Kode:{' '}
          </span>
          <button
            type="button"
            onClick={(e) => handleCopyCode('RAFASEHAT25', e)}
            className="inline-flex items-center gap-1 font-bold tracking-wide bg-[#D3F5E1] hover:bg-[#c2f0d4] text-[#064E3B] px-2 py-0.5 rounded border border-[#A6EBC0] cursor-pointer transition-all active:scale-95 ml-1"
            title="Klik untuk menyalin kode voucher"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#059669]" />
                <span>Kode Tersalin!</span>
              </>
            ) : (
              <>
                <Tag className="w-3 h-3 text-[#059669]" />
                <span>RAFASEHAT25</span>
              </>
            )}
          </button>
        </p>
      </div>

    </header>
  );
}
