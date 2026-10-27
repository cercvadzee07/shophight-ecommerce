"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import { DICTIONARY } from "@/utils/dictionary";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  const { lang } = useLangStore();
  const t = DICTIONARY[lang];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
              clearWishlist();
              toast.error(
                lang === "ka" ? "რჩეულები გასუფთავდა" : "Wishlist cleared",
              );
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#f7768e] hover:text-white bg-[#f7768e]/10 hover:bg-[#f7768e]/20 px-4 py-2 rounded-xl transition-all border border-[#f7768e]/20 cursor-pointer"
          >
            <Trash2 size={16} />
            {lang === "ka" ? "სიის გასუფთავება" : "Clear Wishlist"}
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#1f2335] rounded-2xl border border-[#24283b] text-[#f7768e]">
          <Heart size={28} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          {lang === "ka" ? "რჩეული პროდუქტები" : "Favorite Products"}
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#1f2335]/50 backdrop-blur-xl rounded-3xl border border-[#24283b]">
          <Heart size={48} className="mx-auto text-[#414868] mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            {lang === "ka"
              ? "თქვენი რჩეულების სია ცარიელია"
              : "Your wishlist is empty"}
          </h2>
          <p className="text-[#a9b1d6] text-sm mb-6">
            {lang === "ka"
              ? "მთავარ გვერდზე დაამატეთ სასურველი პროდუქტები გულის აკონით"
              : "Add products to your wishlist using the heart icon"}
          </p>
          <Link
            href="/"
            className="inline-block bg-[#7aa2f7] text-[#1a1b26] font-bold px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:scale-105 transition-all"
          >
            {lang === "ka" ? "პროდუქტების ნახვა" : "Browse Products"}
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((product) => (
            <div
              key={product.id}
              className="relative bg-[#1f2335]/90 backdrop-blur-xl rounded-3xl border border-[#24283b] overflow-hidden hover:border-[#7aa2f7] transition-all group h-full flex flex-col"
            >
              {/* წაშლის ღილაკი */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(product.id);
                  toast.error(
                    lang === "ka"
                      ? "წაიშალა რჩეულებიდან"
                      : "Removed from wishlist",
                    { icon: "💔" },
                  );
                }}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#1a1b26]/90 backdrop-blur-md text-[#f7768e] border border-[#414868]/50 transition-all hover:scale-110 cursor-pointer shadow-lg"
              >
                <Heart size={20} fill="currentColor" />
              </button>

              {/* სურათის ლინკი */}
              <Link
                href={`/products/${product.id}`}
                className="relative h-56 overflow-hidden bg-[#16161e] block"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f2335] via-transparent to-transparent opacity-60"></div>
              </Link>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="inline-block text-[#bb9af7] text-xs font-bold uppercase tracking-wider mb-2 px-2.5 py-1 rounded-lg bg-[#bb9af7]/10 border border-[#bb9af7]/20">
                    {t[product.category as keyof typeof t] || product.category}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-white font-bold text-xl hover:text-[#7aa2f7] transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#24283b]">
                  <span className="text-[#9ece6a] font-black text-2xl">
                    {product.price} ₾
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      toast.success(
                        lang === "ka" ? "დაემატა კალათაში!" : "Added to cart!",
                      );
                    }}
                    className="p-3 bg-[#7aa2f7] text-[#1a1b26] rounded-xl hover:shadow-[0_0_15px_rgba(122,162,247,0.5)] transition-all hover:scale-105 cursor-pointer"
                    title={lang === "ka" ? "კალათაში დამატება" : "Add to cart"}
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
