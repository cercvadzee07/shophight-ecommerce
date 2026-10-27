"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  CreditCard,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import { DICTIONARY } from "@/utils/dictionary";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import PromoSection from "@/components/PromoSection";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);

  // ყველა მნიშვნელობა კალათის სთორიდან გამოვიტანეთ ერთად, კომპონენტის დასაწყისში
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    discountRate,
    getDiscountAmount,
  } = useCartStore();

  const { lang } = useLangStore();
  const t = DICTIONARY[lang];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // გამოთვლები
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 10.0 : 0;
  const discount = getDiscountAmount ? getDiscountAmount() : 0;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ზედა ნაწილი: უკან დაბრუნება */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7aa2f7] hover:underline text-sm font-medium"
        >
          <ArrowLeft size={16} />{" "}
          {lang === "ka" ? "უკან მთავარზე" : "Back to Home"}
        </Link>

        {items.length > 0 && (
          <button
            onClick={() => {
              clearCart();
              toast.error(lang === "ka" ? "კალათა გასუფთავდა" : "Cart cleared");
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#f7768e] hover:text-white bg-[#f7768e]/10 hover:bg-[#f7768e]/20 px-4 py-2 rounded-xl transition-all border border-[#f7768e]/20 cursor-pointer"
          >
            <Trash2 size={16} />
            {lang === "ka" ? "კალათის გასუფთავება" : "Clear Cart"}
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#1f2335] rounded-2xl border border-[#24283b] text-[#7aa2f7]">
          <ShoppingCart size={28} />
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          {lang === "ka" ? "სავაჭრო კალათა" : "Shopping Cart"}
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#1f2335]/50 backdrop-blur-xl rounded-3xl border border-[#24283b]">
          <ShoppingCart size={48} className="mx-auto text-[#414868] mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            {lang === "ka" ? "თქვენი კალათა ცარიელია" : "Your cart is empty"}
          </h2>
          <p className="text-[#a9b1d6] text-sm mb-6">
            {lang === "ka"
              ? "დაამატეთ პროდუქტები კალათაში შეკვეთის გასაფორმებლად"
              : "Add products to your cart to proceed with checkout"}
          </p>
          <Link
            href="/"
            className="inline-block bg-[#7aa2f7] text-[#1a1b26] font-bold px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:scale-105 transition-all"
          >
            {lang === "ka" ? "პროდუქტების ნახვა" : "Browse Products"}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* პროდუქტების სია */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1f2335]/90 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-[#24283b] flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-2xl bg-[#16161e] border border-[#24283b]"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {item.title}
                    </h3>
                    <span className="text-[#9ece6a] font-black text-lg">
                      ₾{item.price}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* რაოდენობის მართვა */}
                  <div className="flex items-center gap-2 bg-[#1a1b26] border border-[#414868] rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-[#a9b1d6] hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-white font-bold px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-[#a9b1d6] hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* წაშლა */}
                  <button
                    onClick={() => {
                      removeItem(item.id);
                      toast.error(
                        lang === "ka" ? "პროდუქტი წაიშალა" : "Item removed",
                      );
                    }}
                    className="p-2 text-[#f7768e] hover:bg-[#f7768e]/10 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* შეკვეთის ჯამი */}
          <div className="bg-[#1f2335]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#24283b] h-fit">
            <h2 className="text-xl font-bold text-white mb-6">
              {lang === "ka" ? "შეკვეთის დეტალები" : "Order Summary"}
            </h2>

            <div className="space-y-3 text-sm text-[#a9b1d6] mb-4">
              <div className="flex justify-between">
                <span>
                  {lang === "ka" ? "პროდუქტების ღირებულება" : "Subtotal"}
                </span>
                <span className="text-white font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{lang === "ka" ? "მიწოდება" : "Shipping"}</span>
                <span className="text-white font-semibold">
                  ${shipping.toFixed(2)}
                </span>
              </div>
            </div>

            {/* პრომო-კოდის ჩასაწერი ველი */}
            <PromoSection />

            {/* თუ პრომო-კოდი გააქტიურებულია, გამოჩნდება ფასდაკლების ხაზი */}
            {discountRate > 0 && (
              <div className="flex justify-between text-sm text-[#9ece6a] font-bold py-2 border-t border-[#24283b]/60">
                <span>{lang === "ka" ? "ფასდაკლება" : "Discount"}</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-bold text-white my-6 pt-4 border-t border-[#24283b]">
              <span>{lang === "ka" ? "სულ ჯამში" : "Total"}</span>
              <span className="text-[#9ece6a] text-2xl">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-[#7aa2f7] text-[#1a1b26] font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:scale-[1.02] transition-all"
            >
              <CreditCard size={20} />
              {lang === "ka" ? "შეკვეთის გაფორმება" : "Proceed to Checkout"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
