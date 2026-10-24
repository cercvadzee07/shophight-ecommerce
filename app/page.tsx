"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useLangStore } from "@/store/useLangStore";
import { DICTIONARY } from "@/utils/dictionary";
import ProductCard3D from "@/components/ProductCard3D";
import { motion } from "framer-motion";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 129.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 199.99,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80",
  },
  {
    id: 3,
    title: "Minimalist Backpack",
    price: 59.99,
    category: "fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80",
  },
  {
    id: 4,
    title: "Sports Sneakers",
    price: 89.99,
    category: "shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80",
  },
];

const CATEGORY_KEYS = ["all", "electronics", "accessories", "fashion", "shoes"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMounted, setIsMounted] = useState(false);

  const { items, toggleWishlist, isInWishlist } = useWishlistStore();
  const { lang } = useLangStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentLang = isMounted ? lang : "ka";
  const t = isMounted ? DICTIONARY[lang] : DICTIONARY.ka;

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* ზედა ნაწილი: სათაური და Wishlist */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-white">{t.products}</h1>

        <Link
          href="/wishlist"
          className="relative p-3 bg-[#1f2335]/90 backdrop-blur-xl rounded-2xl border border-[#24283b] hover:border-[#7aa2f7] transition-all flex items-center gap-2 shadow-lg"
        >
          <Heart className="text-[#f7768e]" size={24} />
          <span className="text-white font-medium hidden sm:block">
            {t.wishlist}
          </span>
          {isMounted && items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#7aa2f7] text-[#1a1b26] text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
              {items.length}
            </span>
          )}
        </Link>
      </div>

      {/* ძებნა და კატეგორიები */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-[#1f2335]/90 backdrop-blur-xl p-4 rounded-3xl border border-[#24283b] shadow-xl">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a9b1d6]"
            size={20}
          />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#7aa2f7] transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORY_KEYS.map((catKey) => (
            <button
              key={catKey}
              onClick={() => setActiveCategory(catKey)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeCategory === catKey
                  ? "bg-[#7aa2f7] text-[#1a1b26] shadow-[0_0_20px_rgba(122,162,247,0.4)]"
                  : "bg-[#24283b] text-[#a9b1d6] hover:text-white hover:bg-[#414868]"
              }`}
            >
              {t[catKey as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* პროდუქტების ბადე 3D ბარათებით */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-[#a9b1d6] py-20 bg-[#1f2335]/50 rounded-3xl border border-[#24283b]">
          {t.notFound}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => {
            const inWishlist = isMounted ? isInWishlist(product.id) : false;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <ProductCard3D
                  product={product}
                  inWishlist={inWishlist}
                  onToggleWishlist={(p) => toggleWishlist(p as any)}
                  lang={currentLang}
                  t={t}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
