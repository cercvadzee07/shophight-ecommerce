"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import { ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductCard3D({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const { lang } = useLangStore();

  const CATEGORY_MAP: Record<string, { ka: string; en: string }> = {
    Electronics: { ka: "ელექტრონიკა", en: "Electronics" },
    Accessories: { ka: "აქსესუარები", en: "Accessories" },
    Fashion: { ka: "მოდა", en: "Fashion" },
    Footwear: { ka: "ფეხსაცმელი", en: "Footwear" },
    ელექტრონიკა: { ka: "ელექტრონიკა", en: "Electronics" },
    აქსესუარები: { ka: "აქსესუარები", en: "Accessories" },
    მოდა: { ka: "მოდა", en: "Fashion" },
    ფეხსაცმელი: { ka: "ფეხსაცმელი", en: "Footwear" },
  };

  const displayCategory =
    CATEGORY_MAP[product.category]?.[lang as "ka" | "en"] || product.category;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(lang === "ka" ? "დაემატა კალათაში!" : "Added to cart!");
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col flex-1 group h-full"
    >
      <div className="relative bg-[#1f2335]/90 backdrop-blur-xl rounded-3xl border border-[#24283b] transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(122,162,247,0.2)] hover:-translate-y-2 flex flex-col h-full">
        <div className="relative h-60 overflow-hidden bg-[#16161e] shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2335] via-[#1f2335]/20 to-transparent opacity-80"></div>
        </div>

        <div className="p-6 pt-5 flex flex-col flex-1 justify-between relative z-10">
          <div className="flex flex-col w-full overflow-hidden">
            <span className="inline-block self-start text-[#bb9af7] text-[10px] font-bold uppercase tracking-wider mb-4 px-3 py-1.5 rounded-xl bg-[#1a1b26] border border-[#bb9af7]/20 shadow-md">
              {displayCategory}
            </span>

            {/* ეს ხაზი აგვარებს პრობლემას: truncate w-full block უზრუნველყოფს ერთ ხაზზე გაყინვას */}
            <h3 className="text-white font-extrabold text-lg group-hover:text-[#7aa2f7] transition-colors truncate w-full block mb-3">
              {product.title}
            </h3>

            <div className="flex items-center gap-1 text-[#e0af68] mb-4">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-2xl font-black text-[#9ece6a]">
              ${product.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="p-3 bg-[#7aa2f7]/10 text-[#7aa2f7] rounded-xl hover:bg-[#7aa2f7] hover:text-[#1a1b26] transition-colors shadow-sm"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
