"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  inWishlist: boolean;
  onToggleWishlist: (product: Product) => void;
  lang: string;
  t: any;
}

export default function ProductCard3D({
  product,
  inWishlist,
  onToggleWishlist,
  lang,
  t,
}: ProductCardProps) {
  return (
    <div className="relative bg-[#1f2335]/90 backdrop-blur-xl rounded-3xl border border-[#24283b] overflow-hidden hover:border-[#7aa2f7] hover:shadow-[0_10px_30px_rgba(122,162,247,0.2)] transition-all duration-500 group h-full flex flex-col">
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleWishlist(product);
          if (inWishlist) {
            toast.error(
              lang === "ka" ? "წაიშალა რჩეულებიდან" : "Removed from wishlist",
              { icon: "💔" },
            );
          } else {
            toast.success(
              lang === "ka" ? "დაემატა რჩეულებში!" : "Added to wishlist!",
            );
          }
        }}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1a1b26]/80 backdrop-blur-md text-[#a9b1d6] hover:text-[#f7768e] border border-[#414868]/50 transition-all hover:scale-110"
      >
        <Heart
          size={20}
          fill={inWishlist ? "#f7768e" : "none"}
          color={inWishlist ? "#f7768e" : "currentColor"}
        />
      </button>

      <Link
        href={`/products/${product.id}`}
        className="flex flex-col flex-grow"
      >
        <div className="relative h-56 overflow-hidden bg-[#16161e]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f2335] via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <span className="inline-block text-[#bb9af7] text-xs font-bold uppercase tracking-wider mb-2 px-2.5 py-1 rounded-lg bg-[#bb9af7]/10 border border-[#bb9af7]/20">
              {t[product.category as keyof typeof t]}
            </span>
            <h3 className="text-white font-bold text-xl group-hover:text-[#7aa2f7] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#24283b]">
            <span className="text-[#9ece6a] font-black text-2xl">
              ${product.price}
            </span>
            <span className="text-xs text-[#a9b1d6] group-hover:text-white transition-colors flex items-center gap-1 font-medium">
              დეტალურად →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
