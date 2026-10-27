"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniCart({ isOpen, onClose }: MiniCartProps) {
  const { lang } = useLangStore();

  const items = useCartStore((state: any) => state.items || []);
  const removeItem = useCartStore(
    (state: any) => state.removeItem || (() => {}),
  );
  const updateQuantity = useCartStore(
    (state: any) => state.updateQuantity || (() => {}),
  );

  const totalItemCount = items.reduce(
    (acc: number, item: any) => acc + (item.quantity || 1),
    0,
  );

  const total = items.reduce(
    (acc: number, item: any) => acc + item.price * (item.quantity || 1),
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* დაბინდული მუქი ფონი მთელ ეკრანზე */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f111a]/80 backdrop-blur-sm cursor-pointer"
          />

          {/* გვერდითა სრული პანელი (ეკრანის თავიდან ბოლომდე) */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 h-screen w-full sm:w-[440px] bg-[#16161e] border-l border-[#24283b] shadow-[-25px_0_50px_rgba(0,0,0,0.8)] flex flex-col z-[101]"
          >
            {/* 1. ზედა ჰედერი (არ იკუმშება - shrink-0) */}
            <div className="h-20 px-6 border-b border-[#24283b] flex items-center justify-between bg-[#1a1b26] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#7aa2f7]/10 text-[#7aa2f7] rounded-xl border border-[#7aa2f7]/20">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">
                    {lang === "ka" ? "ჩემი კალათა" : "My Cart"}
                  </h2>
                  <span className="text-xs text-[#7aa2f7] font-semibold">
                    {totalItemCount} {lang === "ka" ? "პროდუქტი" : "items"}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[#a9b1d6] hover:text-[#f7768e] hover:bg-[#f7768e]/10 rounded-xl transition-all cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            {/* 2. შუა ნაწილი: პროდუქტების სია (სქროლვადი და ყოველთვის ხილვადი) */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-[#16161e] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#24283b] [&::-webkit-scrollbar-thumb]:rounded-full">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#a9b1d6] gap-3">
                  <ShoppingBag
                    size={56}
                    className="text-[#24283b] stroke-[1.5]"
                  />
                  <p className="font-bold text-white text-base">
                    {lang === "ka" ? "კალათა ცარიელია" : "Your cart is empty"}
                  </p>
                  <p className="text-xs text-[#565f89]">
                    {lang === "ka"
                      ? "დაამატეთ სასურველი ნივთები კატალოგიდან"
                      : "Add items from the store to see them here"}
                  </p>
                </div>
              ) : (
                items.map((item: any) => {
                  const qty = item.quantity || 1;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3.5 bg-[#1a1b26] border border-[#24283b] p-3 rounded-2xl hover:border-[#414868] transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-xl bg-[#0f111a] border border-[#24283b] shrink-0"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {item.title}
                          </h4>
                          <span className="text-sm font-black text-[#9ece6a] block mt-1">
                            ₾{(item.price * qty).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#24283b]/60">
                          {/* რაოდენობის კონტროლი */}
                          <div className="flex items-center gap-1.5 bg-[#16161e] border border-[#24283b] rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, qty - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#a9b1d6] hover:text-white rounded hover:bg-[#24283b] transition-colors cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-white text-xs font-bold px-1.5 min-w-[1.2rem] text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, qty + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#a9b1d6] hover:text-white rounded hover:bg-[#24283b] transition-colors cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* წაშლა */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#565f89] hover:text-[#f7768e] p-1.5 rounded-lg hover:bg-[#f7768e]/10 transition-colors cursor-pointer"
                            title={lang === "ka" ? "წაშლა" : "Remove"}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* 3. ქვედა ნაწილი: ჯამი და შეკვეთა (არ იკუმშება - shrink-0) */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#24283b] bg-[#1a1b26] shrink-0 space-y-4">
                <div className="flex items-center justify-between bg-[#16161e] p-3.5 rounded-xl border border-[#24283b]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a9b1d6]">
                    {lang === "ka" ? "სულ ჯამი:" : "Subtotal:"}
                  </span>
                  <span className="text-2xl font-black text-[#9ece6a] drop-shadow-[0_0_12px_rgba(158,206,106,0.3)]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full py-3.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-[#1a1b26] rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(122,162,247,0.3)] hover:scale-[1.01] transition-transform"
                  >
                    <span>
                      {lang === "ka" ? "შეკვეთის გაფორმება" : "Checkout"}
                    </span>
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="w-full py-3 border border-[#24283b] hover:border-[#414868] text-[#a9b1d6] hover:text-white rounded-xl font-bold text-xs flex items-center justify-center transition-colors bg-[#16161e]/50"
                  >
                    {lang === "ka"
                      ? "კალათის დეტალურად ნახვა"
                      : "View Full Cart"}
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
