"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useLangStore } from "@/store/useLangStore";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";

export default function SearchBar() {
  const { lang } = useLangStore();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // ძებნა ყველა 20 პროდუქტზე: სათაურით, კატეგორიით და აღწერით
  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return false;

    const title = p.title.toLowerCase();
    const cat = p.category.toLowerCase();
    const desc = (
      lang === "ka" ? p.descriptionKa : p.descriptionEn
    ).toLowerCase();

    return title.includes(q) || cat.includes(q) || desc.includes(q);
  });

  // გარეთ დაკლიკებისას ჩამოსაშლელის დახურვა
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-sm z-50">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder={
            lang === "ka" ? "პროდუქტის ძებნა..." : "Search products..."
          }
          className="w-full bg-[#1a1b26]/80 backdrop-blur-md border border-[#24283b] text-white rounded-2xl py-2.5 pl-10 pr-10 focus:outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.2)] transition-all placeholder-[#414868]"
        />
        <Search className="absolute left-3 text-[#414868]" size={18} />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 text-[#414868] hover:text-[#f7768e] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#1f2335]/95 backdrop-blur-xl border border-[#24283b] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden max-h-[360px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#24283b] [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {filteredProducts.length > 0 ? (
              <div className="py-2">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-[#1a1b26] transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 rounded-xl object-cover bg-[#16161e] border border-[#24283b] group-hover:border-[#7aa2f7] transition-colors shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#7aa2f7] transition-colors truncate">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-[#9ece6a] font-bold">
                          {product.price} ₾
                        </span>
                        <span className="text-[10px] text-[#565f89] px-1.5 py-0.5 rounded bg-[#16161e] border border-[#24283b]">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-[#a9b1d6] text-sm">
                {lang === "ka" ? "პროდუქტი ვერ მოიძებნა" : "No products found"}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
