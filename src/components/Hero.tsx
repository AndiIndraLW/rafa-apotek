import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface HeroProps {
  onOpenAssessment: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenAssessment, onOpenVideo }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] md:text-xs text-slate-300 font-light tracking-wide mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Metabolic</span>
              <span className="text-slate-500">•</span>
              <span>Hormonal</span>
              <span className="text-slate-500">•</span>
              <span>Longevity care</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#f4f7f6] font-normal">
              A calmer, clearer path to <br className="hidden sm:inline" />
              feeling like yourself.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-slate-300/85 text-sm md:text-base max-w-xl font-light leading-relaxed">
              Verdant unites clinicians, pharmacies and labs in one connected system —
              so your care arrives on time, in one place, and entirely on your terms.
            </p>

            {/* CTA Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAssessment}
                className="px-6 py-3 rounded-full text-xs md:text-sm font-semibold text-[#081822] bg-gradient-to-r from-[#5eeaa4] to-[#a4f57c] hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                Start your assessment
              </button>

              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-normal text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 active:scale-95 transition-all cursor-pointer"
              >
                <span>How it works</span>
                <Play className="w-3 h-3 fill-slate-200 stroke-none" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Portrait */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[4/5] sm:aspect-[3/4] lg:aspect-[790/930]">
              <Image
                src="/images/hero-portrait.png"
                alt="Verdant patient experiencing calm, clear healthcare"
                fill
                priority
                className="object-cover object-center rounded-2xl lg:rounded-none"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Soft overlay gradients to blend into background */}
              <div className="hidden lg:block absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0e2334] via-transparent to-transparent w-24"></div>
              <div className="hidden lg:block absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0e2334] via-transparent to-transparent h-24 top-auto"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
