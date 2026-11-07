import React from 'react';

export default function SocialProof() {
  const brands = [
    'VERDANT CARE',
    'HELIA',
    'NORTHWELL LABS',
    'MERIDIAN RX',
    'OAK & ALDER',
  ];

  return (
    <section className="pt-8 pb-16 md:pb-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="text-slate-400/80 text-xs md:text-sm font-light tracking-wide mb-8">
          Over 100,000 lives impacted through our brands
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 lg:gap-20">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-slate-400/60 hover:text-slate-300 transition-colors text-[11px] md:text-xs tracking-[0.25em] font-medium"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
