"use client";

import { motion } from "framer-motion";

export default function ProductSkeleton() {
  return (
    <div className="relative bg-[#1f2335]/90 backdrop-blur-xl rounded-3xl border border-[#24283b] overflow-hidden h-full flex flex-col">
      {/* ჰოლოგრამული ლაზერის სკანირების ეფექტი */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-[150%] bg-gradient-to-r from-transparent via-[#7aa2f7]/20 to-transparent z-20 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />

      {/* სურათის პლეისჰოლდერი */}
      <div className="h-60 w-full bg-[#16161e] border-b border-[#24283b]"></div>

      {/* დეტალების პლეისჰოლდერი */}
      <div className="p-6 pt-5 flex flex-col flex-grow justify-between relative z-10">
        <div>
          {/* კატეგორია */}
          <div className="h-6 w-24 bg-[#1a1b26] rounded-xl mb-5 shadow-inner"></div>

          {/* სათაურის ხაზები */}
          <div className="h-4 bg-[#24283b] rounded-md w-full mb-3"></div>
          <div className="h-4 bg-[#24283b] rounded-md w-3/4 mb-6"></div>

          {/* ვარსკვლავები */}
          <div className="flex gap-1.5 mb-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 bg-[#24283b] rounded-full"
              ></div>
            ))}
          </div>
        </div>

        {/* ფასი და ღილაკი */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-7 w-24 bg-[#24283b] rounded-lg"></div>
          <div className="h-10 w-10 bg-[#1a1b26] rounded-xl border border-[#24283b]"></div>
        </div>
      </div>
    </div>
  );
}
