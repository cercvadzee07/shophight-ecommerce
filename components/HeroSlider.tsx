"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLangStore } from "@/store/useLangStore";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    titleKa: "კიბერპანკ კოლექცია",
    titleEn: "Cyberpunk Collection",
    descKa:
      "აღმოაჩინე მომავლის ტექნოლოგიები და პრემიუმ აქსესუარები შენი იდეალური Setup-ისთვის.",
    descEn:
      "Discover future technologies and premium accessories for your ideal setup.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80",
    btnKa: "ყიდვა",
    btnEn: "Shop Now",
    accentText: "text-[#7aa2f7]",
    accentBg: "bg-[#7aa2f7]",
    shadow: "shadow-[0_0_20px_rgba(122,162,247,0.4)]",
  },
  {
    id: 2,
    titleKa: "ახალი თაობის ხმა",
    titleEn: "Next-Gen Audio",
    descKa:
      "შეიგრძენი მუსიკა სივრცითი ჟღერადობითა და ხმაურის აქტიური ჩახშობით.",
    descEn:
      "Experience music with spatial audio and active noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1600&q=80",
    btnKa: "აღმოაჩინე",
    btnEn: "Explore",
    accentText: "text-[#bb9af7]",
    accentBg: "bg-[#bb9af7]",
    shadow: "shadow-[0_0_20px_rgba(187,154,247,0.4)]",
  },
  {
    id: 3,
    titleKa: "მინიმალისტური მოდა",
    titleEn: "Minimalist Fashion",
    descKa:
      "დახვეწილი სტილი და მაქსიმალური კომფორტი ყოველდღიური თავგადასავლებისთვის.",
    descEn: "Refined style and maximum comfort for everyday adventures.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=80",
    btnKa: "კოლექცია",
    btnEn: "Collection",
    accentText: "text-[#9ece6a]",
    accentBg: "bg-[#9ece6a]",
    shadow: "shadow-[0_0_20px_rgba(158,206,106,0.4)]",
  },
];

export default function HeroSlider() {
  const { lang } = useLangStore();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-[#24283b] mb-12 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f111a] via-[#0f111a]/80 to-transparent"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 pl-20 sm:pl-24 lg:pl-32 w-full">
              <div className="max-w-md lg:max-w-lg">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 ${SLIDES[current].accentText}`}
                  >
                    <Zap size={14} />
                    {lang === "ka" ? "ახალი სეზონი" : "New Arrival"}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                    {lang === "ka"
                      ? SLIDES[current].titleKa
                      : SLIDES[current].titleEn}
                  </h2>

                  <p className="text-[#a9b1d6] text-xs sm:text-sm lg:text-base mb-6 leading-relaxed line-clamp-3">
                    {lang === "ka"
                      ? SLIDES[current].descKa
                      : SLIDES[current].descEn}
                  </p>

                  <Link
                    href="#products"
                    className={`inline-flex px-6 py-3 rounded-xl text-sm text-[#1a1b26] font-bold transition-all hover:scale-105 ${SLIDES[current].accentBg} ${SLIDES[current].shadow}`}
                  >
                    {lang === "ka"
                      ? SLIDES[current].btnKa
                      : SLIDES[current].btnEn}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1f2335]/50 backdrop-blur-md border border-[#24283b] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#7aa2f7] hover:text-[#1a1b26] z-10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1f2335]/50 backdrop-blur-md border border-[#24283b] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#7aa2f7] hover:text-[#1a1b26] z-10"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? `w-6 h-1.5 ${SLIDES[current].accentBg}`
                : "w-1.5 h-1.5 bg-[#414868]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
