"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import SearchBar from "./SearchBar";
import { useState } from "react";
import MiniCart from "./MiniCart";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { lang, toggleLang } = useLangStore();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  return (
    <nav className="bg-[#1f2335] border-b border-[#24283b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold text-white flex items-center gap-2"
        >
          Shop<span className="text-[#7aa2f7]">Night</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* ენის გადამრთველი ღილაკი დროშებით */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 p-2 bg-[#1a1b26] rounded-xl border border-[#414868] hover:border-[#bb9af7] transition-all text-white font-bold text-sm cursor-pointer"
          >
            <span className="text-lg leading-none">
              {lang === "ka" ? "🇬🇧" : "🇬🇪"}
            </span>
            {lang === "ka" ? "ENG" : "GEO"}
          </button>

          {/* კალათის ღილაკი, რომელიც ხსნის მინი-კალათას */}
          <button
            onClick={() => setIsMiniCartOpen(true)}
            className="relative p-2 text-[#a9b1d6] hover:text-white transition-colors cursor-pointer"
          >
            <ShoppingCart size={24} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f7768e] text-[#1a1b26] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* მინი-კალათის კომპონენტი */}
      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
      />
    </nav>
  );
}
