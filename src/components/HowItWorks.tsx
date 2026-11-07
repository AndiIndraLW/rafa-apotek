import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: "Tell us what's going on",
      description:
        "A five-minute assessment covers your history, your goals, and how you're actually sleeping.",
    },
    {
      number: '02',
      title: 'Meet your clinician',
      description:
        'A licensed provider reviews everything first, then meets you by video — usually the same week.',
    },
    {
      number: '03',
      title: 'Care that keeps up',
      description:
        'Medication, labs and follow-ups live in one plan, adjusted as your body responds.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#daf5f0] py-20 md:py-28 text-[#091f2c]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-teal-900/60 block mb-3">
            HOW IT WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#091f2c] tracking-tight">
            Care that starts with a conversation.
          </h2>
        </div>

        {/* 3 Steps with horizontal rule above */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-8 border-t border-teal-900/10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-start">
              {/* Step Number Circle */}
              <div className="w-8 h-8 rounded-full bg-[#c9f0e8] border border-teal-800/15 flex items-center justify-center text-[11px] font-mono text-[#091f2c] font-semibold mb-5">
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="font-serif text-xl md:text-2xl font-normal text-[#091f2c] tracking-tight mb-2.5">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
