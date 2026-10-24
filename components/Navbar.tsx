"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#1a1b26]/80 backdrop-blur-md border-b border-[#24283b] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
        >
          <span className="w-3 h-3 rounded-full bg-[#7aa2f7] shadow-[0_0_10px_#7aa2f7]"></span>
          Shop<span className="text-[#bb9af7]">Night</span>
        </Link>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7aa2f7]">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="მოძებნე პროდუქტები..."
              className="w-full pl-10 pr-4 py-2 bg-[#24283b] border border-[#414868] rounded-full text-sm text-white placeholder-[#565f89] focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="relative p-2 text-[#7aa2f7] hover:text-[#bb9af7] transition-colors bg-[#24283b] rounded-full border border-[#414868]"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f7768e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_8px_#f7768e]">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
