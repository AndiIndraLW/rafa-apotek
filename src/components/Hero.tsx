import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface HeroProps {
  onOpenAssessment: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenAssessment, onOpenVideo }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 z-10">
            {/* Pill Tag - Pharmacy Badges */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] md:text-xs text-slate-300 font-light tracking-wide mb-8">
              <span>Apotek Berizin Resmi</span>
              <span className="text-slate-500">•</span>
              <span>Obat 100% Asli</span>
              <span className="text-slate-500">•</span>
              <span>Tebus Resep Cepat</span>
            </div>

            {/* Main Headline - Strict 2 lines */}
            <h1 className="font-serif text-[32px] sm:text-[42px] md:text-5xl lg:text-[54px] xl:text-[60px] leading-[1.08] tracking-tight text-[#f4f7f6] font-normal">
              <span className="block">Apotek terpercaya untuk kebutuhan obat</span>
              <span className="block">dan kesehatan keluarga Anda.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-slate-300/85 text-sm md:text-base max-w-xl font-light leading-relaxed">
              Rafa Apotek menyediakan obat resep resmi dokter, obat bebas harian, vitamin, dan suplemen berstandar BPOM —
              dijamin 100% asli, diawasi langsung oleh apoteker berizin, dan dikirimkan dengan cepat serta aman ke rumah Anda.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-xs md:text-sm font-semibold text-[#081822] bg-gradient-to-r from-[#5eeaa4] to-[#a4f57c] hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer inline-flex items-center justify-center"
              >
                Tebus Resep Online
              </a>

              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-normal text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 active:scale-95 transition-all cursor-pointer"
              >
                <span>Tanya Apoteker</span>
                <Play className="w-3 h-3 fill-slate-200 stroke-none" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Pharmacy Image with Atmospheric Vignette matching #0e2334 */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[790/930] rounded-3xl overflow-hidden">
              <Image
                src="/images/apotek.jpg"
                alt="Apotek Rafa Apotek melayani kebutuhan obat asli dan konsultasi apoteker"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Radial Vignette Effect matching background #0e2334 */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 30%, rgba(14, 35, 52, 0.4) 60%, rgba(14, 35, 52, 0.95) 100%)',
                }}
              />

              {/* Edge Blends matching background #0e2334 */}
              <div className="absolute inset-y-0 left-0 w-20 sm:w-28 pointer-events-none bg-gradient-to-r from-[#0e2334] via-[#0e2334]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 pointer-events-none bg-gradient-to-t from-[#0e2334] via-[#0e2334]/70 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-16 sm:h-20 pointer-events-none bg-gradient-to-b from-[#0e2334]/70 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-14 sm:w-20 pointer-events-none bg-gradient-to-l from-[#0e2334]/80 to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
