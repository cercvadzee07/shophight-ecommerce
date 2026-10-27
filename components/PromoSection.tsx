"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import { Tag, Sparkles, X, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function PromoSection() {
  const [code, setCode] = useState("");
  const { lang } = useLangStore();
  const { promoCode, discountRate, applyPromoCode, removePromoCode } =
    useCartStore();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const result = applyPromoCode(code);
    if (result.success) {
      toast.success(lang === "ka" ? result.messageKa : result.messageEn);
      setCode("");
    } else {
      toast.error(lang === "ka" ? result.messageKa : result.messageEn);
    }
  };

  const handleRemove = () => {
    removePromoCode();
    toast(lang === "ka" ? "პრომო-კოდი წაიშალა" : "Promo code removed", {
      icon: "ℹ️",
    });
  };

  return (
    <div className="bg-[#16161e]/80 border border-[#24283b] rounded-2xl p-3.5 my-4">
      <div className="flex items-center gap-1.5 mb-2.5 text-[#a9b1d6] text-xs font-bold uppercase tracking-wider">
        <Tag size={14} className="text-[#bb9af7]" />
        <span>{lang === "ka" ? "პრომო-კოდი" : "Promo Code"}</span>
      </div>

      {promoCode ? (
        <div className="flex items-center justify-between bg-[#1f2335] border border-[#9ece6a]/40 px-3.5 py-2 rounded-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[#9ece6a] animate-spin" />
            <span className="font-mono font-black text-[#9ece6a] tracking-wider text-sm">
              {promoCode}
            </span>
            <span className="text-[11px] text-[#9ece6a] bg-[#9ece6a]/15 px-2 py-0.5 rounded-md font-bold">
              -{discountRate * 100}%
            </span>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-1 rounded-lg text-[#565f89] hover:text-[#f7768e] hover:bg-[#f7768e]/10 transition-colors cursor-pointer"
            title={lang === "ka" ? "წაშლა" : "Remove"}
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleApply}
          className="relative flex items-center w-full"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="მაგ: NEON2026"
            className="w-full bg-[#1f2335] border border-[#24283b] focus:border-[#7aa2f7] outline-none text-white text-xs px-3.5 py-2.5 pr-28 rounded-xl font-mono uppercase tracking-wider placeholder:text-[#565f89] transition-all"
          />
          <button
            type="submit"
            className="absolute right-1 px-3 py-1.5 bg-[#7aa2f7] hover:bg-[#7aa2f7]/90 text-[#1a1b26] font-bold text-xs rounded-lg transition-all hover:shadow-[0_0_12px_rgba(122,162,247,0.4)] flex items-center gap-1 cursor-pointer"
          >
            <Check size={13} />
            <span>{lang === "ka" ? "აქტივაცია" : "Apply"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
