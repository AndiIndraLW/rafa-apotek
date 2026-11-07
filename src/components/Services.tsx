'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import ServiceModal, { ServiceDetail } from './ServiceModal';

interface ServicesProps {
  onOpenAssessment: () => void;
}

export default function Services({ onOpenAssessment }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const services: ServiceDetail[] = [
    {
      number: '01',
      title: 'Telehealth, without the wait',
      description:
        'Same-week video visits with licensed clinicians across 40 states. No waiting room, no commute, no half-answered questions.',
      image: '/images/service-1.png',
      alt: 'Patient having a comfortable telehealth consultation from home',
    },
    {
      number: '02',
      title: 'One connected experience',
      description:
        'Prescriptions, labs and results in a single record. Every clinician you see is working from the same, complete picture.',
      image: '/images/service-2.png',
      alt: 'Compounded prescriptions and laboratory precision bottles',
    },
    {
      number: '03',
      title: 'Effective, reliable, affordable',
      description:
        'Transparent pricing, medication compounded in our own pharmacy, and care built to keep working long after the first month.',
      image: '/images/service-3.png',
      alt: 'Thriving Verdant patient in renewed vitality and health',
    },
  ];

  return (
    <section id="care" className="bg-[#f5fbdf] py-20 md:py-28 text-[#0a202d] scroll-mt-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-emerald-900/60 block mb-3">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] leading-[1.12] tracking-tight font-normal text-[#091f2c]">
              One system for the whole of <br className="hidden sm:inline" />
              your care.
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Clinicians, pharmacy and labs working from one record — so nothing about you gets lost between visits.
            </p>
            <button
              onClick={() => setSelectedService(services[0])}
              className="inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-[#091f2c] mt-4 hover:opacity-75 transition-opacity cursor-pointer"
            >
              <span>Explore all services</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-4">
          {services.map((service) => (
            <div
              key={service.number}
              onClick={() => setSelectedService(service)}
              className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div>
                {/* Card Thumbnail Image */}
                <div className="relative w-full aspect-[409/211] rounded-xl md:rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Number Badge */}
                <span className="text-[11px] font-mono text-slate-400 block mt-6 mb-2 tracking-wider">
                  {service.number}
                </span>

                {/* Card Title */}
                <h3 className="font-serif text-xl md:text-2xl font-normal text-[#091f2c] tracking-tight mb-3 group-hover:text-emerald-800 transition-colors">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View clinical details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenAssessment={onOpenAssessment}
      />
    </section>
  );
}
