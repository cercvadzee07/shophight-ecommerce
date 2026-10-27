import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  discountRate: number; // მაგ: 0.20 ნიშნავს 20%-ს
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => {
    success: boolean;
    messageKa: string;
    messageEn: string;
  };
  removePromoCode: () => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotalPrice: () => number;
}

const PROMO_CODES: Record<string, number> = {
  NEON2026: 0.2,
  CYBER10: 0.1,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountRate: 0,

      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [], promoCode: null, discountRate: 0 }),

      applyPromoCode: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (PROMO_CODES[cleanCode]) {
          const rate = PROMO_CODES[cleanCode];
          set({ promoCode: cleanCode, discountRate: rate });
          return {
            success: true,
            messageKa: `პრომო-კოდი გააქტიურდა! -${rate * 100}%`,
            messageEn: `Promo code applied! -${rate * 100}%`,
          };
        }
        return {
          success: false,
          messageKa: "არასწორი ან ვადაგასული პრომო-კოდი",
          messageEn: "Invalid or expired promo code",
        };
      },

      removePromoCode: () => {
        set({ promoCode: null, discountRate: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        return subtotal * get().discountRate;
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        return Math.max(0, subtotal - discount);
      },
    }),
    {
      name: "cyber-cart-storage",
    },
  ),
);
