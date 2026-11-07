'use client';

import React from 'react';
import Image from 'next/image';

const BRAND_LOGOS = [
  { name: 'Kimia Farma', src: '/images/logo-brand/kimiafarma.webp', width: 140, height: 50 },
  { name: 'Kalbe Farma', src: '/images/logo-brand/kalbe.webp', width: 130, height: 50 },
  { name: 'Pfizer', src: '/images/logo-brand/pfizer.webp', width: 120, height: 50 },
  { name: 'GSK', src: '/images/logo-brand/gsk.webp', width: 110, height: 50 },
  { name: 'Sanofi', src: '/images/logo-brand/sanofi.webp', width: 130, height: 50 },
  { name: 'Merck', src: '/images/logo-brand/merck.webp', width: 120, height: 50 },
  { name: 'Eli Lilly', src: '/images/logo-brand/lilly.webp', width: 110, height: 50 },
  { name: 'Century', src: '/images/logo-brand/century.webp', width: 130, height: 50 },
];

export default function SocialProof() {
  // Duplicated list to create a seamless infinite loop
  const marqueeList = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section className="pt-4 pb-12 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <p className="text-[#0D2B24]/70 text-xs md:text-sm font-medium tracking-wide mb-8">
          Bekerja sama dengan distributor resmi dan produsen farmasi berstandar BPOM
        </p>

        {/* Auto Sliding Marquee Container */}
        <div className="relative w-full overflow-hidden mask-linear-gradient">
          {/* Subtle Left & Right Gradient Shadows for seamless fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10" />

          {/* Marquee Track */}
          <div className="animate-marquee flex items-center gap-14 sm:gap-20 md:gap-24 py-2">
            {marqueeList.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="flex items-center justify-center shrink-0 h-14 sm:h-16 md:h-20 w-36 sm:w-44 md:w-52 transition-all duration-300 filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={brand.width * 1.5}
                  height={brand.height * 1.5}
                  className="max-h-10 sm:max-h-12 md:max-h-14 w-auto object-contain select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
