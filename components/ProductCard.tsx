"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-[#1a1b26] rounded-xl border border-[#24283b] hover:border-[#7aa2f7]/50 shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      <Link
        href={`/products/${product.id}`}
        className="relative h-48 bg-[#24283b] overflow-hidden block"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-2 right-2 bg-[#1a1b26]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#414868]">
          <span className="text-[10px] font-semibold text-[#bb9af7] uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-white group-hover:text-[#7aa2f7] transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#9ece6a]">
            ${product.price}
          </span>
          <button
            onClick={() => addItem(product)}
            className="bg-[#7aa2f7] hover:bg-[#89b4fa] text-[#1a1b26] font-semibold text-xs px-3.5 py-2 rounded-lg shadow-[0_0_10px_rgba(122,162,247,0.3)] transition-all cursor-pointer"
          >
            კალათაში
          </button>
        </div>
      </div>
    </div>
  );
}
