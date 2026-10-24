"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useLangStore } from "@/store/useLangStore";
import { motion, AnimatePresence } from "framer-motion";

// დროებითი პროდუქტების ბაზა საძიებო სისტემისთვის
// (მომავალში შეგიძლია შემოიტანო შენი რეალური `products` მასივი)
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "ჭკვიანი საათი (Smart Watch)",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 2,
    title: "უსადენო ყურსასმენი (Wireless Headphones)",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 3,
    title: "მექანიკური კლავიატურა (Mechanical Keyboard)",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 4,
    title: "გეიმინგ მაუსი (Gaming Mouse)",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-379381547939?auto=format&fit=crop&q=80&w=100",
  },
];

export default function SearchBar() {
  const { lang } = useLangStore();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // ძებნის ლოგიკა (ეძებს სათაურის მიხედვით)
  const filteredProducts = MOCK_PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );

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
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#1f2335]/95 backdrop-blur-xl border border-[#24283b] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden max-h-[320px] overflow-y-auto"
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
                      className="w-12 h-12 rounded-xl object-cover bg-[#16161e] border border-[#24283b] group-hover:border-[#7aa2f7] transition-colors"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#7aa2f7] transition-colors line-clamp-1">
                        {product.title}
                      </h4>
                      <span className="text-xs text-[#9ece6a] font-bold">
                        ${product.price}
                      </span>
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
