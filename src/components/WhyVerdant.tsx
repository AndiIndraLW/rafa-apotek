import React from 'react';

export default function WhyVerdant() {
  const stats = [
    {
      value: '100% Asli',
      label: 'Jaminan resmi BPOM & Kemenkes',
    },
    {
      value: '15.000+',
      label: 'Resep dokter terlayani',
    },
    {
      value: '< 15 Menit',
      label: 'Respon konsultasi apoteker',
    },
  ];

  return (
    <section id="tentang" data-theme="dark" className="bg-[#0D2B24] py-24 md:py-32 text-white scroll-mt-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#34D399] block mb-4">
            KENAPA MEMILIH RAFA APOTEK
          </span>
          <h2 className="font-display text-4xl sm:text-3xl md:text-4xl lg:text-[48px] leading-[1.16] font-light tracking-tight text-white">
            Keaslian obat terjamin, didampingi apoteker, <br className="hidden sm:inline" />
            dan siap melayani kesehatan keluarga.
          </h2>
          <p className="mt-6 text-emerald-100/80 text-xs md:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Kesehatan Anda adalah prioritas medis kami. Kami memastikan setiap butir obat disimpan sesuai standar farmasi suhu dingin,
            memiliki izin edar resmi BPOM, serta selalu berada di bawah pengawasan apoteker berdedikasi.
          </p>
        </div>

        {/* 3 Stats with vertical dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto mt-16 md:mt-20 divide-y md:divide-y-0 md:divide-x divide-white/15 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 md:py-0 md:px-6">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-emerald-200/70 text-[11px] tracking-wider font-light mt-2 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pharmacist Guarantee Quote Card */}
        <div className="max-w-2xl mx-auto mt-14 sm:mt-18">
          <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <blockquote className="font-display italic text-base sm:text-lg text-emerald-50 font-light leading-relaxed mb-6">
              “Kami tidak hanya menyerahkan obat, tetapi memastikan pasien memahami dosis yang tepat, jadwal konsumsi yang benar, serta terhindar dari interaksi obat yang membahayakan.”
            </blockquote>

            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#34D399] text-[#0D2B24] font-bold text-xs flex items-center justify-center tracking-wide">
                RA
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  apt. Rafa Andika, S.Farm
                </div>
                <div className="text-[11px] text-emerald-200/70 font-light">
                  Apoteker Pengelola Apotek (APA), Rafa Apotek
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
