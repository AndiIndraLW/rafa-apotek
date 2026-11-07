import React from 'react';

interface CtaBannerProps {
  onOpenAssessment?: () => void;
}

export default function CtaBanner({ onOpenAssessment }: CtaBannerProps) {
  return (
    <section className="bg-[#e8f5d6] py-12 md:py-16 text-[#091f2c]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Side */}
        <div>
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-900/60 block mb-2">
            READY WHEN YOU ARE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#091f2c] tracking-tight">
            Interested in care that keeps up?
          </h2>
        </div>

        {/* Right Side Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenAssessment}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-105 active:scale-95 transition-all shadow-sm text-center cursor-pointer"
          >
            Start your assessment
          </button>
          <a
            href="#assessment"
            onClick={(e) => {
              e.preventDefault();
              onOpenAssessment?.();
            }}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs font-medium text-[#091f2c] border border-[#091f2c]/20 hover:bg-[#091f2c]/5 active:scale-95 transition-all text-center cursor-pointer"
          >
            Talk to our team
          </a>
        </div>
      </div>
    </section>
  );
}
