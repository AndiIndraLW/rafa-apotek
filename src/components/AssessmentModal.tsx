'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{
    kategori: string[];
    kondisi: string[];
    waktu: string;
    kontak: string;
  }>({
    kategori: [],
    kondisi: [],
    waktu: '',
    kontak: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const toggleSelection = (field: 'kategori' | 'kondisi', item: string) => {
    setAnswers((prev) => {
      const exists = prev[field].includes(item);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((i) => i !== item) : [...prev[field], item],
      };
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentStep(1);
      setSubmitted(false);
      setAnswers({ kategori: [], kondisi: [], waktu: '', kontak: '' });
    }, 300);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={resetAndClose}
      className="m-auto p-0 bg-transparent backdrop:bg-black/70 backdrop:backdrop-blur-sm max-w-xl w-[92vw] text-slate-100 rounded-3xl outline-none border-none shadow-2xl overflow-hidden transition-all"
    >
      <div className="bg-[#0D2B24] border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-emerald-100 hover:text-white transition-colors cursor-pointer"
          aria-label="Tutup formulir"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header & Step progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-[#34D399] font-mono mb-2">
                <span>LANGKAH {currentStep} DARI 4 • RAFA APOTEK</span>
                <span>{Math.round((currentStep / 4) * 100)}% SELESAI</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#34D399] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Kategori Kebutuhan */}
            {currentStep === 1 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  Layanan obat apa yang Anda butuhkan?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  Pilih opsi yang sesuai agar apoteker kami dapat segera menyiapkan kebutuhan Anda.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'Tebus Resep Dokter Resmi',
                    'Obat Rutin Kronis',
                    'Vitamin & Suplemen Imunitas',
                    'Obat Flu, Batuk & Demam',
                    'Kesehatan Lambung / Maag',
                    'Tanya / Rekomendasi Apoteker',
                  ].map((item) => {
                    const isSelected = answers.kategori.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSelection('kategori', item)}
                        className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#34D399]/20 border-[#34D399] text-white font-medium'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Riwayat Alergi / Kondisi Pasien */}
            {currentStep === 2 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  Apakah ada riwayat alergi obat?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  Informasi ini sangat penting untuk keselamatan konsumsi dan pencegahan kontraindikasi.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    'Tidak ada riwayat alergi obat',
                    'Alergi obat golongan penisilin',
                    'Alergi obat pereda nyeri (NSAID)',
                    'Memiliki riwayat maag / GERD',
                    'Sedang hamil / menyusui',
                    'Pasien anak-anak atau lansia',
                  ].map((item) => {
                    const isSelected = answers.kondisi.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSelection('kondisi', item)}
                        className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#34D399]/20 border-[#34D399] text-white font-medium'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Waktu Pengiriman */}
            {currentStep === 3 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  Kapan Anda memerlukan obat ini?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  Rafa Apotek siap melayani pengiriman langsung ke alamat Anda.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { title: 'Segera (Pengiriman Instan)', desc: 'Obat disiapkan dan dikirimkan langsung dalam 1–2 jam' },
                    { title: 'Hari Ini (Pengiriman Reguler Same-Day)', desc: 'Pengiriman di hari yang sama untuk kenyamanan Anda' },
                    { title: 'Konsultasi Resep Terlebih Dahulu', desc: 'Apoteker akan menghubungi Anda untuk konfirmasi obat & dosis' },
                  ].map((item) => {
                    const isSelected = answers.waktu === item.title;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setAnswers({ ...answers, waktu: item.title })}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#34D399]/20 border-[#34D399] text-white'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-sm text-white">{item.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-400 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Kontak WhatsApp / Email */}
            {currentStep === 4 && (
              <div className="animate-in fade-in duration-300">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2">
                  Nomor WhatsApp untuk konfirmasi apoteker
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
                  Apoteker kami akan mengirimkan konfirmasi ketersediaan obat dan petunjuk aturan minum.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Nomor WhatsApp Aktif
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={answers.kontak}
                      onChange={(e) => setAnswers({ ...answers, kontak: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed">
                    🔒 <strong className="text-slate-300">Jaminan Keamanan Farmasi</strong>: Seluruh resep dan data pasien tersimpan aman dan hanya digunakan untuk keperluan pelayanan kefarmasian resmi Rafa Apotek.
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={currentStep === 4 && answers.kontak.length < 9}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
              >
                <span>{currentStep === 4 ? 'Kirimkan ke Apoteker' : 'Lanjut'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation Success State */
          <div className="py-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/30 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-display text-3xl text-white font-normal mb-3">
              Permintaan Obat Diterima!
            </h3>
            <p className="text-emerald-100/80 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed mb-8">
              Apoteker kami di <strong className="text-white">Rafa Apotek</strong> sedang menyiapkan rincian obat Anda.
              Kami akan menghubungi nomor <span className="text-[#34D399] font-semibold">{answers.kontak}</span> dalam waktu singkat untuk konfirmasi pengantaran.
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
