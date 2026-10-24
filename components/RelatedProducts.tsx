"use client";

import { useRef } from "react";
import { useLangStore } from "@/store/useLangStore";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ProductCard3D from "./ProductCard3D";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "უსადენო ყურსასმენი (Wireless Headphones)",
    price: 129.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80",
  },
  {
    id: 2,
    title: "ჭკვიანი საათი (Smart Watch)",
    price: 199.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80",
  },
  {
    id: 3,
    title: "მინიმალისტური ზურგჩანთა (Backpack)",
    price: 59.99,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80",
  },
  {
    id: 4,
    title: "სპორტული ფეხსაცმელი (Sneakers)",
    price: 89.99,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80",
  },
  {
    id: 5,
    title: "მექანიკური კლავიატურა (Mechanical Keyboard)",
    price: 149.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&q=80",
  },
  {
    id: 6,
    title: "მზის სათვალე (Sunglasses)",
    price: 39.99,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=80",
  },
];

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

  let related = MOCK_PRODUCTS.filter(
    (p) => p.category === category && p.id !== currentProductId,
  );

  if (related.length < 4) {
    const others = MOCK_PRODUCTS.filter(
      (p) => p.id !== currentProductId && !related.find((r) => r.id === p.id),
    );
    related = [...related, ...others].slice(0, 5);
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
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-xl bg-[#1f2335]/80 backdrop-blur-md border border-[#24283b] text-[#a9b1d6] hover:text-[#bb9af7] hover:border-[#bb9af7] hover:shadow-[0_0_15px_rgba(187,154,247,0.3)] transition-all cursor-pointer"
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
            <ProductCard3D product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
