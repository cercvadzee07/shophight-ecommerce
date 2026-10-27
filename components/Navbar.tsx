"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import SearchBar from "./SearchBar";
import { useState } from "react";
import MiniCart from "./MiniCart";
import CategoryMegaMenu from "@/components/CategoryMegaMenu";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { lang, toggleLang } = useLangStore();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  return (
    <nav className="bg-[#1f2335]/95 backdrop-blur-xl border-b border-[#24283b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* მარცხენა ბლოკი: ლოგო და კატალოგი */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link
            href="/"
            className="text-2xl font-black text-white tracking-tight flex items-center gap-1 group"
          >
            Shop
            <span className="text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors">
              Night
            </span>
          </Link>

          {/* კატალოგის ღილაკი / მეგა მენიუ */}
          <div className="hidden md:block">
            <CategoryMegaMenu />
          </div>
        </div>

        {/* ცენტრალური ბლოკი: საძიებო ზოლი */}
        <div className="flex-1 max-w-lg hidden sm:flex justify-center">
          <SearchBar />
        </div>

        {/* მარჯვენა ბლოკი: ენა და კალათა */}
        <div className="flex items-center gap-3 shrink-0">
          {/* ენის გადამრთველი */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-2 bg-[#1a1b26] rounded-xl border border-[#24283b] hover:border-[#7aa2f7] transition-all text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
          >
            <span className="text-base leading-none">
              {lang === "ka" ? "🇬🇧" : "🇬🇪"}
            </span>
            <span>{lang === "ka" ? "ENG" : "GEO"}</span>
          </button>

          {/* კალათის ღილაკი ბეიჯით */}
          <button
            onClick={() => setIsMiniCartOpen(true)}
            className="relative p-2.5 text-[#a9b1d6] hover:text-white bg-[#1a1b26] border border-[#24283b] hover:border-[#7aa2f7] rounded-xl transition-all cursor-pointer"
            title={lang === "ka" ? "კალათა" : "Cart"}
          >
            <ShoppingCart size={20} />
            {items.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#f7768e] text-[#1a1b26] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(247,118,142,0.5)]">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* მობილურის საძიებო ზოლი (გამოჩნდება მხოლოდ პატარა ეკრანებზე ნავბარის ქვეშ) */}
      <div className="sm:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* მინი-კალათის კომპონენტი */}
      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
      />
    </nav>
  );
}
