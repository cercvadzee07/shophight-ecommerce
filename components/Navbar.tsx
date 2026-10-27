"use client";

import Link from "next/link";
import { ShoppingCart, Heart, LogIn } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useLangStore } from "@/store/useLangStore";
import SearchBar from "./SearchBar";
import { useState } from "react";
import MiniCart from "./MiniCart";
import CategoryMegaMenu from "@/components/CategoryMegaMenu";
import { useSession } from "next-auth/react";
import { sfx } from "@/utils/soundFX";

export default function Navbar() {
  const items = useCartStore((state) => state.items || []);
  const wishlistItems = useWishlistStore((state) => state.items || []);
  const { lang, toggleLang } = useLangStore();
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { data: session, status } = useSession();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="bg-[#1f2335]/95 backdrop-blur-xl border-b border-[#24283b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* მარცხენა ბლოკი: ლოგო და კატალოგი */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link
            href="/"
            onClick={() => sfx.playClick()}
            className="text-2xl font-black text-white tracking-tight flex items-center gap-1 group"
          >
            Shop
            <span className="text-[#7aa2f7] group-hover:text-[#bb9af7] transition-colors">
              Night
            </span>
          </Link>

          <div className="hidden md:block">
            <CategoryMegaMenu />
          </div>
        </div>

        {/* ცენტრალური ბლოკი: საძიებო ზოლი */}
        <div className="flex-1 max-w-lg hidden sm:flex justify-center">
          <SearchBar />
        </div>

        {/* მარჯვენა ბლოკი: ენა, პროფილი/შესვლა, რჩეულები და კალათა */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* ენის გადამრთველი */}
          <button
            onClick={() => {
              sfx.playClick();
              toggleLang();
            }}
            className="flex items-center gap-2 px-3 py-2 bg-[#1a1b26] rounded-xl border border-[#24283b] hover:border-[#7aa2f7] transition-all text-white font-bold text-xs sm:text-sm cursor-pointer shadow-sm"
          >
            <span className="text-base leading-none">
              {lang === "ka" ? "🇬🇧" : "🇬🇪"}
            </span>
            <span>{lang === "ka" ? "ENG" : "GEO"}</span>
          </button>

          {/* ავტორიზაცია */}
          {status === "authenticated" && session?.user ? (
            <Link
              href="/profile"
              onClick={() => sfx.playClick()}
              className="relative p-0.5 rounded-full bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] transition-all hover:scale-105 shadow-[0_0_15px_rgba(122,162,247,0.3)] flex items-center justify-center shrink-0"
              title={lang === "ka" ? "ჩემი პროფილი" : "My Profile"}
            >
              <img
                src={
                  session.user.image ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Beka&backgroundColor=1f2335"
                }
                alt={session.user.name || "User Avatar"}
                className="w-9 h-9 rounded-full border-2 border-[#1a1b26] object-cover bg-[#16161e]"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => sfx.playClick()}
              className="flex items-center gap-2 px-3 py-2 text-[#a9b1d6] hover:text-[#7aa2f7] bg-[#1a1b26] border border-[#24283b] hover:border-[#7aa2f7]/50 rounded-xl transition-all shadow-sm"
              title={lang === "ka" ? "ავტორიზაცია" : "Sign In"}
            >
              <LogIn size={18} />
              <span className="hidden sm:inline-block text-xs font-bold">
                {lang === "ka" ? "შესვლა" : "Login"}
              </span>
            </Link>
          )}

          {/* რჩეულები */}
          <Link
            href="/wishlist"
            onClick={() => sfx.playClick()}
            className="relative p-2.5 text-[#a9b1d6] hover:text-[#f7768e] bg-[#1a1b26] border border-[#24283b] hover:border-[#f7768e]/50 rounded-xl transition-all shadow-sm"
            title={lang === "ka" ? "რჩეულები" : "Wishlist"}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#f7768e] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(247,118,142,0.6)]">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* კალათა */}
          <button
            onClick={() => {
              sfx.playClick();
              setIsMiniCartOpen(true);
            }}
            className="relative p-2.5 text-[#a9b1d6] hover:text-white bg-[#1a1b26] border border-[#24283b] hover:border-[#7aa2f7] rounded-xl transition-all cursor-pointer shadow-sm"
            title={lang === "ka" ? "კალათა" : "Cart"}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#7aa2f7] text-[#1a1b26] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(122,162,247,0.5)]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* მობილურის საძიებო ზოლი */}
      <div className="sm:hidden px-4 pb-3">
        <SearchBar />
      </div>

      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
      />
    </nav>
  );
}
