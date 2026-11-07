'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductDetail } from '@/data/products';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';

export interface CartItem extends ProductDetail {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  addToCart: (product: ProductDetail) => void;
  updateQuantity: (number: string, delta: number) => void;
  removeItem: (number: string) => void;
  clearCart: () => void;
  totalCartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      number: '01',
      category: 'PEREMAJAAN SEL',
      categorySlug: 'peptida',
      title: 'Tinktur Pembaruan Seluler & Peptida',
      price: 'Rp 640.000',
      priceNumber: 640000,
      image: '/images/service-2.png',
      alt: 'Botol kaca amber obat peracikan apotek klinis',
      size: 'Botol Kaca Amber Pipet 50ml',
      ingredients: ['Peptida Bioidentik', 'Adaptogen Alami'],
      indication: 'Mendukung regenerasi jaringan seluler',
      dosage: '1 pipet (1ml) per hari',
      quantity: 1,
    },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rafa_apotek_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('rafa_apotek_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  const addToCart = (product: ProductDetail) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.number === product.number);
      if (existing) {
        return prev.map((i) =>
          i.number === product.number ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (number: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.number === number ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (number: string) => {
    setCartItems((prev) => prev.filter((i) => i.number !== number));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        checkoutOpen,
        setCheckoutOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalCartCount,
      }}
    >
      {children}

      {/* Global Interactive Cart Drawer & Checkout */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onProceedCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          clearCart();
        }}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
