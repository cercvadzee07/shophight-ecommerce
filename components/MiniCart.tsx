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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f111a]/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#1f2335]/95 backdrop-blur-2xl border-l border-[#24283b] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-[70] flex flex-col"
          >
            <div className="px-6 py-6 border-b border-[#24283b] flex items-center justify-between bg-[#1a1b26]/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#7aa2f7]" size={24} />
                <h2 className="text-xl font-bold text-white">
                  {lang === "ka" ? "ჩემი კალათა" : "My Cart"}
                </h2>
                <span className="bg-[#7aa2f7]/20 text-[#7aa2f7] text-xs font-extrabold px-3 py-1 rounded-full">
                  {totalItemCount}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#a9b1d6] hover:text-[#f7768e] hover:bg-[#f7768e]/10 rounded-xl transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#414868] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#7aa2f7]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-[#a9b1d6] gap-4">
                  <ShoppingBag size={56} className="opacity-20 mb-2" />
                  <p className="font-medium text-lg">
                    {lang === "ka" ? "კალათა ცარიელია" : "Your cart is empty"}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 text-[#7aa2f7] hover:underline text-sm cursor-pointer"
                  >
                    {lang === "ka" ? "განაგრძეთ შოპინგი" : "Continue Shopping"}
                  </button>
                </div>
              ) : (
                items.map((item: any) => {
                  const qty = item.quantity || 1;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id}
                      className="flex gap-4 bg-[#1a1b26] border border-[#24283b] p-3 rounded-2xl hover:border-[#414868] transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-xl bg-[#16161e] shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-[#7aa2f7] transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[#9ece6a] font-black text-sm block mt-1">
                            ${(item.price * qty).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#24283b]/60">
                          <div className="flex items-center gap-1.5 bg-[#1f2335] border border-[#24283b] rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, qty - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#a9b1d6] hover:text-white rounded hover:bg-[#24283b] transition-colors cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="text-white text-xs font-bold px-1.5 min-w-[1.2rem] text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, qty + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#a9b1d6] hover:text-white rounded hover:bg-[#24283b] transition-colors cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#414868] hover:text-[#f7768e] bg-[#1f2335] p-1.5 rounded-lg transition-colors border border-[#24283b] hover:border-[#f7768e]/40 cursor-pointer"
                            title={lang === "ka" ? "წაშლა" : "Remove"}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-[#24283b] bg-[#1a1b26]">
                <div className="flex items-center justify-between mb-6 bg-[#1f2335] p-4 rounded-xl border border-[#24283b]">
                  <span className="text-[#a9b1d6] font-medium uppercase text-sm tracking-wider">
                    {lang === "ka" ? "სულ ჯამი:" : "Subtotal:"}
                  </span>
                  <span className="text-3xl font-black text-[#9ece6a] drop-shadow-[0_0_10px_rgba(158,206,106,0.2)]">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="w-full py-4 bg-[#7aa2f7] text-[#1a1b26] rounded-xl font-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(122,162,247,0.4)]"
                  >
                    {lang === "ka" ? "ყიდვა" : "Checkout"}{" "}
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="w-full py-4 border border-[#414868] text-[#a9b1d6] rounded-xl font-bold flex items-center justify-center transition-all hover:bg-[#24283b] hover:text-white"
                  >
                    {lang === "ka"
                      ? "კალათის დეტალურად ნახვა"
                      : "View Full Cart"}
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
