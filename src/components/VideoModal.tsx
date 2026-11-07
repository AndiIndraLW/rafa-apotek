'use client';

import React, { useEffect, useRef } from 'react';
import { X, Play, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
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
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="m-auto p-0 bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-md max-w-2xl w-[92vw] text-slate-100 rounded-3xl outline-none border-none shadow-2xl overflow-hidden"
    >
      <div className="bg-[#0b1c2b] border border-white/10 rounded-3xl p-6 sm:p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          aria-label="Close walkthrough"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-400 block mb-2">
          SYSTEM WALKTHROUGH
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
          How Verdant transforms your care.
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
          A preview of what happens once you start your assessment.
        </p>

        {/* Video placeholder presentation */}
        <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-[#122e42] to-[#0a1824] border border-white/10 flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
          <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg cursor-pointer">
            <Play className="w-7 h-7 fill-emerald-300 ml-1 stroke-none" />
          </div>
          <span className="text-xs text-slate-300 font-medium">Watch the 2-minute overview</span>
          <span className="text-[11px] text-slate-400 mt-1">Presented by Dr. Amara Osei, Medical Director</span>

          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-emerald-400" /> 2:15 min</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-emerald-400" /> Certified Care Model</span>
          </div>
        </div>

        {/* 3 Key Takeaways */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          {[
            { title: 'Unified Records', desc: 'No repeated tests or disjointed doctor communications.' },
            { title: 'Compounded Rx', desc: 'Direct-to-door precision pharmacy formulations.' },
            { title: 'Continuous Follow-up', desc: 'Routine biometric tracking adjusted monthly.' },
          ].map((item) => (
            <div key={item.title} className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}
