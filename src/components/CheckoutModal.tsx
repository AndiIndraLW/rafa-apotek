'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CreditCard, ShieldCheck, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { ProductDetail } from './Products';

interface CartItem extends ProductDetail {
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}: CheckoutModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<'shipping' | 'payment' | 'complete'>('shipping');
  const [formData, setFormData] = useState({
    name: 'Budi Santoso',
    email: 'budi@example.com',
    address: 'Jl. Senopati No. 45',
    city: 'Jakarta Selatan',
    state: 'DKI Jakarta',
    zip: '12190',
  });

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
      setStep('shipping');
    }
  }, [isOpen]);

  const subtotal = items.reduce((acc, item) => {
    const rawNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 500000;
    return acc + rawNum * item.quantity;
  }, 0);

  const shipping = subtotal >= 750000 ? 0 : 35000;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('complete');
    onOrderSuccess();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="m-auto p-0 bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-md max-w-xl w-[92vw] text-slate-100 rounded-3xl outline-none border-none shadow-2xl overflow-hidden"
    >
      <div className="bg-[#0D2B24] border border-white/15 rounded-3xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-emerald-100 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step !== 'complete' ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase text-[#34D399]">
              <Lock className="w-3.5 h-3.5" />
              <span>PEMBAYARAN AMAN TERENKRIPSI 256-BIT</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-white font-normal mb-6">
              {step === 'shipping' ? 'Detail Pengiriman' : 'Metode Pembayaran'}
            </h3>

            {/* Stepper indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`flex-1 h-1.5 rounded-full ${
                  step === 'shipping' || step === 'payment'
                    ? 'bg-[#34D399]'
                    : 'bg-white/10'
                }`}
              />
              <div
                className={`flex-1 h-1.5 rounded-full ${
                  step === 'payment'
                    ? 'bg-[#34D399]'
                    : 'bg-white/10'
                }`}
              />
            </div>

            {/* Order Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Pesanan ({items.reduce((s, i) => s + i.quantity, 0)} produk):</span>
                <span className="font-semibold text-white ml-1.5">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <span className="text-emerald-300 font-mono text-[11px]">
                {shipping === 0 ? 'GRATIS Ongkir Dingin' : `Ongkir: Rp ${shipping.toLocaleString('id-ID')}`}
              </span>
            </div>

            {step === 'shipping' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep('payment');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Email untuk Pelacakan</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Alamat Pengiriman</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Kota</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Provinsi</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">Kode Pos</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Lanjut ke pembayaran ↗
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-medium text-white">Transfer Bank / QRIS / Kartu</div>
                      <div className="text-[11px] text-slate-400">Pembayaran terverifikasi otomatis</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full">
                    SIMULASI DEMO
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ini adalah simulasi demo e-commerce. Tidak ada saldo yang akan terpotong.</span>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Buat Pesanan Demo (Rp {total.toLocaleString('id-ID')})
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="py-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 block mb-2">
              NO. PESANAN #RFA-84920
            </span>

            <h3 className="font-serif text-3xl text-white font-normal mb-3">
              Pesanan Dikonfirmasi!
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed mb-6">
              Terima kasih, <strong className="text-white">{formData.name}</strong>. Resep peracikan obat Anda
              telah diteruskan ke tim apoteker klinis berizin kami.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left max-w-sm mx-auto mb-8 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Alamat Pengiriman:</span>
                <span className="text-white font-medium">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimasi Pengiriman:</span>
                <span className="text-emerald-300 font-medium">Besok, Pukul 10:00 WIB</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Pembayaran:</span>
                <span className="text-white font-serif font-medium">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-7 py-2.5 rounded-full text-xs font-semibold text-[#0D2B24] bg-[#34D399] hover:bg-[#2bc28a] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Lanjutkan Berbelanja
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
