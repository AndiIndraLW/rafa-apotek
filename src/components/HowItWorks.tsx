import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Pilih Obat atau Foto Resep',
      description:
        'Pilih obat bebas dan vitamin dari katalog, atau cukup unggah foto resep dokter Anda melalui formulir apotek online kami.',
    },
    {
      number: '02',
      title: 'Pemeriksaan oleh Apoteker',
      description:
        'Apoteker berizin kami memverifikasi keaslian resep, kecocokan dosis, dan interaksi obat demi keamanan konsumsi Anda.',
    },
    {
      number: '03',
      title: 'Kemasan Farmasi & Antar Cepat',
      description:
        'Obat dikemas higienis dengan segel keamanan berstandar apotek dan dikirimkan langsung ke alamat Anda dengan cepat.',
    },
  ];

  return (
    <section id="layanan" data-theme="light" className="bg-[#F3EFE6] py-20 md:py-28 text-[#0D2B24] scroll-mt-6 border-t border-[#0D2B24]/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#059669] block mb-3">
            CARA BELI OBAT &amp; TEBUS RESEP
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#0D2B24] tracking-tight">
            Mudah, cepat, dan terjamin aman sampai ke tangan Anda.
          </h2>
        </div>

        {/* 3 Steps with horizontal rule above */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-8 border-t border-[#0D2B24]/10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start">
              {/* Step Number Circle */}
              <div className="w-9 h-9 rounded-full bg-[#0D2B24] text-white flex items-center justify-center text-xs font-mono font-semibold mb-5 shadow-xs">
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="font-display font-normal text-xl md:text-2xl text-[#0D2B24] tracking-tight mb-2.5">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-[#4B5E57] text-xs md:text-sm leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
