import React from 'react';

interface CtaBannerProps {
  onOpenAssessment?: () => void;
}

export default function CtaBanner({ onOpenAssessment }: CtaBannerProps) {
  return (
    <section data-theme="light" className="bg-[#EAFBF1] py-12 md:py-16 text-[#0D2B24] border-y border-[#C3ECD3]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Side */}
        <div>
          <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#059669] block mb-2">
            BUTUH BANTUAN OBAT HARI INI?
          </span>
          <h2 className="font-display font-light text-2xl sm:text-3xl md:text-4xl text-[#0D2B24] tracking-tight">
            Punya resep dokter atau butuh rekomendasi obat?
          </h2>
        </div>

        {/* Right Side Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a
            href="https://wa.me/6282308230823?text=Halo%20Rafa%20Apotek,%20saya%20ingin%20tebus%20resep%20dokter."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0D2B24] hover:bg-[#123A31] active:scale-95 transition-all shadow-md text-center cursor-pointer inline-flex items-center justify-center"
          >
            Tebus Resep Dokter
          </a>
          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 rounded-full text-xs font-semibold text-[#0D2B24] border border-[#0D2B24]/30 hover:bg-[#0D2B24]/5 active:scale-95 transition-all text-center cursor-pointer"
          >
            Konsultasi Apoteker
          </button>
        </div>
      </div>
    </section>
  );
}
