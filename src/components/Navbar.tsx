'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, Plus } from 'lucide-react';

interface NavbarProps {
  onOpenAssessment: () => void;
}

export default function Navbar({ onOpenAssessment }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Care', href: '#care' },
    { name: 'Science', href: '#science' },
    { name: 'Treatments', href: '#care' },
    { name: 'Pricing', href: '#care' },
    { name: 'About', href: '#science' },
  ];

  return (
    <header className="sticky top-4 md:top-6 z-50 w-full px-4 sm:px-6 md:px-8 max-w-6xl mx-auto transition-all duration-300">
      {/* Glassmorphic Navbar Container with Rounded Corners */}
      <nav className="relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#0b1c28]/70 backdrop-blur-xl backdrop-saturate-150 border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.12)]">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group pl-1">
          <div className="w-6 h-6 rounded-md bg-[#6ae7b8] flex items-center justify-center text-[#091f2c] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Plus className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-white text-base sm:text-lg font-medium tracking-tight">
            Verdant
          </span>
        </a>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.08] text-xs font-normal tracking-wide transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center pr-1">
          <button
            onClick={onOpenAssessment}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#7beea6] hover:brightness-110 hover:shadow-[0_0_20px_rgba(91,235,166,0.35)] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <span>Get started</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-5 bg-[#0b1c28]/90 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.45)] flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/[0.06] text-sm font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 mt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#7beea6] text-center shadow-sm cursor-pointer active:scale-95 transition-all"
            >
              <span>Get started</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
