"use client";

import { useState } from "react";
import { useLangStore } from "@/store/useLangStore";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowDownUp } from "lucide-react";
import ProductCard3D from "@/components/ProductCard3D";
import HeroSlider from "@/components/HeroSlider";
import { PRODUCTS } from "@/data/products";

const CATEGORIES = [
  "All",
  "ელექტრონიკა",
  "გეიმინგი",
  "აქსესუარები",
  "მოდა",
  "ფეხსაცმელი",
];

const CATEGORY_TRANSLATIONS: Record<string, { ka: string; en: string }> = {
  All: { ka: "ყველა", en: "All" },
  ელექტრონიკა: { ka: "ელექტრონიკა", en: "Electronics" },
  გეიმინგი: { ka: "გეიმინგი", en: "Gaming" },
  აქსესუარები: { ka: "აქსესუარები", en: "Accessories" },
  მოდა: { ka: "მოდა", en: "Fashion" },
  ფეხსაცმელი: { ka: "ფეხსაცმელი", en: "Footwear" },
};

export default function HomePage() {
  const { lang } = useLangStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // ფილტრაცია კატეგორიის მიხედვით
  let filteredProducts = PRODUCTS.filter((product) =>
    activeCategory === "All" ? true : product.category === activeCategory,
  );

  // ფასის სორტირება
  if (sortOrder === "low-to-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* ანიმაციური სლაიდერი */}
      <HeroSlider />

      {/* ფილტრაციის პანელი */}
      <div className="bg-[#1f2335]/80 backdrop-blur-xl border border-[#24283b] rounded-3xl p-4 sm:p-6 mb-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between shadow-lg">
        {/* კატეგორიები */}
        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          <Filter size={20} className="text-[#7aa2f7] min-w-[20px]" />
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#7aa2f7] text-[#1a1b26] shadow-[0_0_15px_rgba(122,162,247,0.4)]"
                    : "bg-[#1a1b26] text-[#a9b1d6] border border-[#414868] hover:border-[#7aa2f7] hover:text-white"
                }`}
              >
                {CATEGORY_TRANSLATIONS[cat]?.[lang as "ka" | "en"] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* სორტირება */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <ArrowDownUp size={20} className="text-[#bb9af7]" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full lg:w-48 bg-[#1a1b26] border border-[#414868] text-[#a9b1d6] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#bb9af7] focus:ring-1 focus:ring-[#bb9af7] transition-all cursor-pointer appearance-none"
          >
            <option value="default">
              {lang === "ka" ? "ნაგულისხმევი" : "Default Sorting"}
            </option>
            <option value="low-to-high">
              {lang === "ka" ? "ფასი: ზრდადობით" : "Price: Low to High"}
            </option>
            <option value="high-to-low">
              {lang === "ka" ? "ფასი: კლებადობით" : "Price: High to Low"}
            </option>
          </select>
        </div>
      </div>

      {/* პროდუქტების გრიდი 20 ნივთით */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
            >
              <ProductCard3D product={product as any} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-[#a9b1d6]">
            {lang === "ka"
              ? "ამ კატეგორიაში პროდუქცია ვერ მოიძებნა"
              : "No products found in this category"}
          </div>
        )}
      </motion.div>
    </div>
  );
}
