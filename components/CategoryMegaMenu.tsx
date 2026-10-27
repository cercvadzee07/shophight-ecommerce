"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid,
  ChevronDown,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Gamepad2,
  Tv,
  Camera,
  Shirt,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLangStore } from "@/store/useLangStore";

// მრავალდონიანი კატეგორიების სტრუქტურა 1000-ობით პროდუქტისთვის
const CATEGORIES_DATA = [
  {
    id: "laptops",
    icon: Laptop,
    nameKa: "ლეპტოპები და IT",
    nameEn: "Laptops & IT",
    badge: "Hot",
    subcategories: [
      {
        titleKa: "ლეპტოპები",
        titleEn: "Laptops",
        items: [
          {
            nameKa: "გეიმინგ ლეპტოპები",
            nameEn: "Gaming Laptops",
            href: "/products?cat=gaming-laptops",
          },
          {
            nameKa: "ულტრაბუკები",
            nameEn: "Ultrabooks",
            href: "/products?cat=ultrabooks",
          },
          {
            nameKa: "სამუშაო სადგურები",
            nameEn: "Workstations",
            href: "/products?cat=workstations",
          },
          {
            nameKa: "აქსესუარები",
            nameEn: "Laptop Accessories",
            href: "/products?cat=laptop-accessories",
          },
        ],
      },
      {
        titleKa: "კომპონენტები",
        titleEn: "PC Components",
        items: [
          {
            nameKa: "ვიდეობარათები (GPU)",
            nameEn: "Graphics Cards",
            href: "/products?cat=gpu",
          },
          {
            nameKa: "პროცესორები (CPU)",
            nameEn: "Processors",
            href: "/products?cat=cpu",
          },
          {
            nameKa: "დედაპლატები",
            nameEn: "Motherboards",
            href: "/products?cat=motherboards",
          },
          {
            nameKa: "ოპერატიული მეხსიერება",
            nameEn: "RAM",
            href: "/products?cat=ram",
          },
        ],
      },
    ],
  },
  {
    id: "smartphones",
    icon: Smartphone,
    nameKa: "სმარტფონები",
    nameEn: "Smartphones",
    subcategories: [
      {
        titleKa: "ტელეფონები",
        titleEn: "Phones",
        items: [
          {
            nameKa: "Apple iPhone",
            nameEn: "Apple iPhone",
            href: "/products?cat=iphone",
          },
          {
            nameKa: "Samsung Galaxy",
            nameEn: "Samsung Galaxy",
            href: "/products?cat=samsung",
          },
          {
            nameKa: "Xiaomi / POCO",
            nameEn: "Xiaomi / POCO",
            href: "/products?cat=xiaomi",
          },
          {
            nameKa: "Google Pixel",
            nameEn: "Google Pixel",
            href: "/products?cat=pixel",
          },
        ],
      },
      {
        titleKa: "აქსესუარები",
        titleEn: "Accessories",
        items: [
          {
            nameKa: "დამტენები და კაბელები",
            nameEn: "Chargers & Cables",
            href: "/products?cat=chargers",
          },
          {
            nameKa: "ქეისები და შუშები",
            nameEn: "Cases & Glass",
            href: "/products?cat=cases",
          },
          {
            nameKa: "Power Bank-ები",
            nameEn: "Power Banks",
            href: "/products?cat=powerbanks",
          },
        ],
      },
    ],
  },
  {
    id: "audio",
    icon: Headphones,
    nameKa: "აუდიო და აკუსტიკა",
    nameEn: "Audio & Sound",
    subcategories: [
      {
        titleKa: "ყურსასმენები",
        titleEn: "Headphones",
        items: [
          {
            nameKa: "უსადენო ყურსასმენი",
            nameEn: "Wireless Earbuds",
            href: "/products?cat=earbuds",
          },
          {
            nameKa: "Over-Ear ყურსასმენი",
            nameEn: "Over-Ear Headphones",
            href: "/products?cat=overear",
          },
          {
            nameKa: "გეიმინგ ჰედსეტები",
            nameEn: "Gaming Headsets",
            href: "/products?cat=gaming-headsets",
          },
        ],
      },
      {
        titleKa: "დინამიკები",
        titleEn: "Speakers",
        items: [
          {
            nameKa: "პორტატული დინამიკები",
            nameEn: "Bluetooth Speakers",
            href: "/products?cat=bt-speakers",
          },
          {
            nameKa: "საუნდბარები",
            nameEn: "Soundbars",
            href: "/products?cat=soundbars",
          },
        ],
      },
    ],
  },
  {
    id: "gaming",
    icon: Gamepad2,
    nameKa: "გეიმინგი და კონსოლები",
    nameEn: "Gaming & Consoles",
    badge: "Sale",
    subcategories: [
      {
        titleKa: "კონსოლები",
        titleEn: "Consoles",
        items: [
          {
            nameKa: "PlayStation 5",
            nameEn: "PlayStation 5",
            href: "/products?cat=ps5",
          },
          {
            nameKa: "Xbox Series X / S",
            nameEn: "Xbox Series X / S",
            href: "/products?cat=xbox",
          },
          {
            nameKa: "Nintendo Switch",
            nameEn: "Nintendo Switch",
            href: "/products?cat=switch",
          },
        ],
      },
      {
        titleKa: "გეიმინგ პერიფერია",
        titleEn: "Gaming Gear",
        items: [
          {
            nameKa: "მექანიკური კლავიატურები",
            nameEn: "Keyboards",
            href: "/products?cat=keyboards",
          },
          {
            nameKa: "გეიმინგ მაუსები",
            nameEn: "Mice",
            href: "/products?cat=mice",
          },
          {
            nameKa: "გეიმპადები (ჯოისტიკები)",
            nameEn: "Controllers",
            href: "/products?cat=controllers",
          },
        ],
      },
    ],
  },
  {
    id: "wearables",
    icon: Watch,
    nameKa: "ჭკვიანი საათები",
    nameEn: "Smart Watches",
    subcategories: [
      {
        titleKa: "საათები და სამაჯურები",
        titleEn: "Watches & Bands",
        items: [
          {
            nameKa: "Apple Watch",
            nameEn: "Apple Watch",
            href: "/products?cat=apple-watch",
          },
          {
            nameKa: "Galaxy Watch",
            nameEn: "Galaxy Watch",
            href: "/products?cat=galaxy-watch",
          },
          {
            nameKa: "ფიტნეს სამაჯურები",
            nameEn: "Fitness Trackers",
            href: "/products?cat=fitness-trackers",
          },
        ],
      },
    ],
  },
  {
    id: "lifestyle",
    icon: Shirt,
    nameKa: "მოდა და აქსესუარები",
    nameEn: "Fashion & Lifestyle",
    subcategories: [
      {
        titleKa: "ჩანთები და ფეხსაცმელი",
        titleEn: "Bags & Footwear",
        items: [
          {
            nameKa: "ზურგჩანთები",
            nameEn: "Backpacks",
            href: "/products?cat=backpacks",
          },
          {
            nameKa: "სპორტული ფეხსაცმელი",
            nameEn: "Sneakers",
            href: "/products?cat=sneakers",
          },
        ],
      },
    ],
  },
];

export default function CategoryMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES_DATA[0]);
  const { lang } = useLangStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // მენიუს გარეთ დაკლიკებისას დახურვა
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* მთავარი კატალოგის ღილაკი */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer border ${
          isOpen
            ? "bg-[#7aa2f7] text-[#1a1b26] border-[#7aa2f7] shadow-[0_0_15px_rgba(122,162,247,0.4)]"
            : "bg-[#1f2335]/90 text-white border-[#24283b] hover:border-[#7aa2f7] hover:bg-[#1a1b26]"
        }`}
      >
        <Grid
          size={18}
          className={isOpen ? "text-[#1a1b26]" : "text-[#7aa2f7]"}
        />
        <span>{lang === "ka" ? "კატალოგი" : "Catalog"}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* მეგა მენიუს ჩამოსაშლელი ფანჯარა */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-3 w-[880px] bg-[#16161e]/98 backdrop-blur-2xl border border-[#24283b] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 overflow-hidden flex"
          >
            {/* მარცხენა სვეტი: მთავარი კატეგორიები */}
            <div className="w-72 bg-[#1a1b26]/80 border-r border-[#24283b] p-3 space-y-1">
              <span className="text-[10px] font-bold text-[#565f89] uppercase tracking-wider px-3 py-1.5 block">
                {lang === "ka" ? "ძირითადი განყოფილებები" : "Main Departments"}
              </span>

              {CATEGORIES_DATA.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#7aa2f7]/15 text-[#7aa2f7] border border-[#7aa2f7]/30 shadow-sm"
                        : "text-[#a9b1d6] hover:text-white hover:bg-[#1f2335]/60 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={
                          isActive ? "text-[#7aa2f7]" : "text-[#565f89]"
                        }
                      />
                      <span>{lang === "ka" ? cat.nameKa : cat.nameEn}</span>
                    </div>

                    {cat.badge && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#f7768e]/15 text-[#f7768e] border border-[#f7768e]/20">
                        {cat.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* მარჯვენა სვეტი: შერჩეული კატეგორიის ქვეკატეგორიები და ბანერი */}
            <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-br from-[#16161e] to-[#1a1b26]/40">
              <div>
                <div className="flex items-center justify-between border-b border-[#24283b] pb-4 mb-6">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <activeCategory.icon size={22} className="text-[#bb9af7]" />
                    {lang === "ka"
                      ? activeCategory.nameKa
                      : activeCategory.nameEn}
                  </h3>
                  <Link
                    href={`/products?cat=${activeCategory.id}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-bold text-[#7aa2f7] hover:underline flex items-center gap-1 group"
                  >
                    {lang === "ka" ? "ყველას ნახვა" : "View All"}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                {/* ქვეკატეგორიების ბადე */}
                <div className="grid grid-cols-2 gap-8">
                  {activeCategory.subcategories.map((sub, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#9ece6a] border-b border-[#24283b]/60 pb-1.5">
                        {lang === "ka" ? sub.titleKa : sub.titleEn}
                      </h4>
                      <ul className="space-y-2">
                        {sub.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="text-xs sm:text-sm text-[#a9b1d6] hover:text-white hover:translate-x-1 transition-all inline-block"
                            >
                              {lang === "ka" ? item.nameKa : item.nameEn}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* ქვედა პრომო ბანერი მენიუში */}
              <div className="mt-8 p-4 rounded-2xl bg-[#1f2335]/70 border border-[#24283b] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#bb9af7]/10 text-[#bb9af7] border border-[#bb9af7]/20">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      {lang === "ka"
                        ? "Cyber Monday 2026 ფასდაკლება"
                        : "Cyber Monday 2026 Deals"}
                    </h5>
                    <p className="text-[11px] text-[#a9b1d6]">
                      {lang === "ka"
                        ? "გამოიყენე კოდი NEON2026 კალათაში"
                        : "Use code NEON2026 at checkout"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#9ece6a] bg-[#9ece6a]/10 px-3 py-1 rounded-lg">
                  -20%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
