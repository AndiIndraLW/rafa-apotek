'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { ProductDetail } from './Products';

interface CartItem extends ProductDetail {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (number: string, delta: number) => void;
  onRemoveItem: (number: string) => void;
  onProceedCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}: CartDrawerProps) {
  // Lock body scroll when open and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const subtotal = items.reduce((acc, item) => {
    const rawNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 500000;
    return acc + rawNum * item.quantity;
  }, 0);

  const freeShippingThreshold = 750000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-400 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      {/* Smooth Backdrop with hardware-accelerated fade and blur */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-400 ease-out cursor-pointer ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 pointer-events-none">
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Keranjang Belanja"
          style={{
            transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
            transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
          className="pointer-events-auto w-screen max-w-md bg-[#0b1c28] border-l border-white/10 h-full flex flex-col justify-between p-6 sm:p-7 relative shadow-[0_0_60px_rgba(0,0,0,0.6)] text-slate-100 motion-reduce:transition-none"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <h3 className="font-serif text-xl text-white font-normal">Keranjang Belanja Anda</h3>
                <span className="text-xs font-mono text-slate-400">
                  ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Keranjang"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="py-3.5 border-b border-white/10 text-xs">
              <div className="flex items-center justify-between text-slate-300 text-[11px] mb-1.5 font-light">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-300 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Anda mendapatkan Gratis Ongkir Suhu Dingin!
                  </span>
                ) : (
                  <span>
                    Tambah{' '}
                    <strong className="text-white">
                      Rp {(freeShippingThreshold - subtotal).toLocaleString('id-ID')}
                    </strong>{' '}
                    lagi untuk bebas ongkir ekspres
                  </span>
                )}
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5beba6] to-[#aef773] h-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-sm font-light">Keranjang belanja Anda masih kosong.</p>
                <p className="text-xs text-slate-500 mt-1">Jelajahi produk peracikan apotek klinis kami.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.number}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <Image src={item.image} alt={item.alt} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono uppercase text-emerald-400 tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-medium text-white truncate">{item.title}</h4>
                    <div className="text-xs font-serif text-slate-200 mt-0.5">{item.price}</div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.number, -1)}
                          className="text-slate-400 hover:text-white px-1 font-mono transition-colors"
                          aria-label="Kurangi jumlah"
                        >
                          -
                        </button>
                        <span className="text-white text-[11px] font-mono px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.number, 1)}
                          className="text-slate-400 hover:text-white px-1 font-mono transition-colors"
                          aria-label="Tambah jumlah"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.number)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        aria-label="Hapus produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Estimasi Subtotal</span>
              <span className="font-serif text-lg text-white font-medium">
                Rp {subtotal.toLocaleString('id-ID')}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-light flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kuitansi resmi apotek dapat digunakan untuk klaim asuransi</span>
            </p>

            <button
              onClick={onProceedCheckout}
              disabled={items.length === 0}
              className="w-full py-3 rounded-full text-xs font-semibold text-[#091a24] bg-gradient-to-r from-[#5beba6] to-[#aef773] hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Pembayaran Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
