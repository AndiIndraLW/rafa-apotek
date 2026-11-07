import React from 'react';

export default function WhyVerdant() {
  const stats = [
    {
      value: '100,000+',
      label: 'lives impacted',
    },
    {
      value: '40+',
      label: 'states covered',
    },
    {
      value: '4.9/5',
      label: 'average visit rating',
    },
  ];

  return (
    <section id="science" className="bg-[#0e2334] py-24 md:py-32 text-white scroll-mt-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-emerald-400 block mb-4">
            WHY VERDANT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.12] font-normal tracking-tight text-[#f4f7f6]">
            Care should be continuous, personal, <br className="hidden sm:inline" />
            and quietly excellent.
          </h2>
          <p className="mt-6 text-slate-300/85 text-xs md:text-sm font-light leading-relaxed max-w-xl mx-auto">
            We built Verdant because healthcare asks too much of people who are already tired.
            One team, one record, one plan that moves with you.
          </p>
        </div>

        {/* 3 Stats with vertical dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto mt-16 md:mt-20 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 md:py-0 md:px-6">
              <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-slate-400/80 text-[11px] tracking-wider font-light mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Quote Card */}
        <div className="max-w-2xl mx-auto mt-14 sm:mt-18">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <blockquote className="font-serif italic text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-6">
              “The difference is what happens between appointments. Our patients stop repeating themselves.”
            </blockquote>

            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#5beba6] text-[#091a24] font-bold text-xs flex items-center justify-center tracking-wide">
                AO
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-white">
                  Dr. Amara Osei
                </div>
                <div className="text-[11px] text-slate-400 font-light">
                  Medical Director, Verdant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
