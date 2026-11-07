import React from 'react';
import { Plus } from 'lucide-react';

export default function Footer() {
  const links = {
    company: [
      { name: 'About us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    care: [
      { name: 'Metabolic health', href: '#' },
      { name: 'Hormonal health', href: '#' },
      { name: 'Longevity', href: '#' },
      { name: 'Labs & diagnostics', href: '#' },
    ],
    legal: [
      { name: 'Privacy policy', href: '#' },
      { name: 'Terms of service', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Accessibility', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-[#08141d] text-white pt-16 md:pt-20 pb-4 overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Brand & Info */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-5 h-5 rounded-md bg-[#6ae7b8] flex items-center justify-center text-[#091f2c]">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-white text-base font-medium tracking-tight">
                Verdant
              </span>
            </a>

            <p className="mt-4 text-slate-400 text-xs font-light leading-relaxed max-w-xs">
              Metabolic, hormonal and longevity care — delivered from one connected system.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400 block mb-4">
                COMPANY
              </span>
              <ul className="space-y-2.5">
                {links.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-xs text-slate-400 hover:text-white transition-colors font-light"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400 block mb-4">
                CARE
              </span>
              <ul className="space-y-2.5">
                {links.care.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-xs text-slate-400 hover:text-white transition-colors font-light"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-400 block mb-4">
                LEGAL
              </span>
              <ul className="space-y-2.5">
                {links.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-xs text-slate-400 hover:text-white transition-colors font-light"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Status & Copyright */}
        <div className="pt-8 pb-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <div>
            © 2026 Verdant Health, Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      {/* Massive Ambient Verdant Wordmark */}
      <div className="w-full flex justify-center pointer-events-none select-none opacity-25 translate-y-3">
        <span className="font-serif text-[18vw] leading-none text-[#1b3547] tracking-tight">
          Verdant
        </span>
      </div>
    </footer>
  );
}
