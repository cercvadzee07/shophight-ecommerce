"use client";

import { useRef } from "react";
import { useLangStore } from "@/store/useLangStore";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProductCard3D from "./ProductCard3D";
import { PRODUCTS } from "@/data/products";

interface RelatedProductsProps {
  currentProductId: number;
  category: string;
}

export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const { lang } = useLangStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // ჯერ ვეძებთ იგივე კატეგორიის ნივთებს მიმდინარე პროდუქტის გარდა
  let related = PRODUCTS.filter(
    (p) => p.category === category && p.id !== currentProductId,
  );

  // თუ იმავე კატეგორიაში 4-ზე ნაკლებია, ვამატებთ სხვა საინტერესო ნივთებს მთლიანი კატალოგიდან
  if (related.length < 6) {
    const others = PRODUCTS.filter(
      (p) => p.id !== currentProductId && !related.some((r) => r.id === p.id),
    );
    related = [...related, ...others].slice(0, 8);
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (related.length === 0) return null;

  return (
    <div className="mt-24 border-t border-[#24283b] pt-16 relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <Sparkles className="text-[#bb9af7]" size={28} />
          {lang === "ka" ? "შეიძლება მოგეწონოს" : "You Might Also Like"}
        </h3>

        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-xl bg-[#1f2335]/80 backdrop-blur-md border border-[#24283b] text-[#a9b1d6] hover:text-[#bb9af7] hover:border-[#bb9af7] hover:shadow-[0_0_15px_rgba(187,154,247,0.3)] transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-xl bg-[#1f2335]/80 backdrop-blur-md border border-[#24283b] text-[#a9b1d6] hover:text-[#bb9af7] hover:border-[#bb9af7] hover:shadow-[0_0_15px_rgba(187,154,247,0.3)] transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden scroll-smooth items-stretch"
      >
        {related.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] sm:min-w-[320px] snap-start flex-shrink-0 flex flex-col"
          >
            <ProductCard3D product={product as any} />
          </div>
        ))}
      </div>
    </div>
  );
}
