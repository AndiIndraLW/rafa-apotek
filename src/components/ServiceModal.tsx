'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Check, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';

export interface ServiceDetail {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  details?: {
    overview: string;
    highlights: string[];
    turnaround: string;
    coverage: string;
  };
}

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onOpenAssessment: () => void;
}

export default function ServiceModal({
  service,
  onClose,
  onOpenAssessment,
}: ServiceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (service) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = '';
      }
    }
  }, [service]);

  if (!service) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto p-0 bg-transparent backdrop:bg-black/75 backdrop:backdrop-blur-md max-w-2xl w-[92vw] text-slate-100 rounded-3xl outline-none border-none shadow-2xl overflow-hidden"
    >
      <div className="bg-[#0e2334] border border-white/10 rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close service details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Number Badge */}
        <span className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 block mb-2">
          SERVICE {service.number}
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
          {service.title}
        </h3>

        {/* Thumbnail Preview */}
        <div className="relative w-full aspect-[409/190] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-6">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>

        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Highlights & Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium text-white">Scheduling Speed</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Appointments available within 48–72 hours across 40 states.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-medium text-white">Board-Certified Clinicians</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Specialists in endocrinology, longevity and metabolic vitality.</div>
            </div>
          </div>
        </div>

        {/* Clinical Protocol list */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            What is included in this protocol
          </h4>
          <ul className="space-y-2.5">
            {[
              'Direct video consultation with dedicated licensed physician',
              'Comprehensive diagnostic biomarker evaluation & lab prescription',
              'Custom compounding pharmacy delivery with temperature safeguards',
              'Continuous dose adjustments and proactive bi-monthly check-ins',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                <div className="w-4 h-4 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close overview
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenAssessment();
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#081822] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            Start your assessment
          </button>
        </div>
      </div>
    </dialog>
  );
}
