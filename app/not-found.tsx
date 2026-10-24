"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Terminal } from "lucide-react";
import { useLangStore } from "@/store/useLangStore";

export default function NotFound() {
  const { lang } = useLangStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // სქროლის მოსაშორებლად ვითვლით ეკრანის სიმაღლეს მინუს ნავბარის მიახლოებითი ზომა
    <div className="flex flex-col items-center justify-center relative px-4 overflow-hidden min-h-[calc(100vh-120px)]">
      {/* ფონური მანათობელი ეფექტი ცოტა დაპატარავებული */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-[#f7768e]/15 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        // დავაპატარავეთ პადინგები (p-8 sm:p-12) და მაქსიმალური სიგანე (max-w-xl)
        className="relative z-10 flex flex-col items-center text-center bg-[#1f2335]/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-[#24283b] shadow-2xl max-w-xl w-full"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Terminal className="text-[#f7768e]" size={24} />
          <span className="text-[#f7768e] font-mono tracking-widest uppercase text-xs font-bold">
            System Error
          </span>
        </div>

        {/* Glitch 404 ტექსტი შემცირებული ზომით */}
        <motion.h1
          animate={{
            textShadow: [
              "2px 2px 0px #f7768e, -2px -2px 0px #7dcfff",
              "-3px -1px 0px #f7768e, 3px 1px 0px #7dcfff",
              "1px -2px 0px #f7768e, -1px 2px 0px #7dcfff",
              "0px 0px 0px transparent, 0px 0px 0px transparent",
            ],
            x: [0, -2, 2, -1, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
            repeatDelay: 2,
          }}
          className="text-7xl sm:text-[110px] font-black text-white mb-2 tracking-tighter leading-none"
        >
          404
        </motion.h1>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
          {lang === "ka" ? "გვერდი ვერ მოიძებნა" : "Page Not Found"}
        </h2>

        <p className="text-[#a9b1d6] mb-8 max-w-sm mx-auto text-xs sm:text-sm leading-relaxed border-b border-[#24283b] pb-6">
          {lang === "ka"
            ? "სისტემაში შეცდომაა. როგორც ჩანს, ის მისამართი, რომელსაც ეძებთ, წაშლილია ან არასოდეს არსებობდა ჩვენს კიბერ-სივრცეში."
            : "System malfunction. The address you are looking for has been deleted or never existed in our cyberspace."}
        </p>

        <Link
          href="/"
          className="group relative px-6 py-3.5 bg-[#1a1b26] border border-[#7aa2f7] rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(122,162,247,0.3)]"
        >
          {/* ღილაკის შევსების ანიმაცია ჰოვერზე */}
          <div className="absolute inset-0 bg-[#7aa2f7] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

          <div className="relative z-10 flex items-center gap-2 text-[#7aa2f7] group-hover:text-[#1a1b26] font-bold transition-colors text-sm">
            <Home size={18} />
            <span>
              {lang === "ka" ? "მთავარზე დაბრუნება" : "Return to Home"}
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
