"use client";

import { motion } from "framer-motion";
import { useLangStore } from "@/store/useLangStore";
import { CheckCircle2, Clock, Truck, PackageCheck } from "lucide-react";

export type OrderStatus = "placed" | "processing" | "in_transit" | "delivered";

interface OrderTrackerProps {
  orderId: string;
  status: OrderStatus;
  date: string;
  total: number;
  itemsCount: number;
}

const STEPS = [
  { key: "placed", ka: "მიღებულია", en: "Order Placed", icon: Clock },
  { key: "processing", ka: "მუშავდება", en: "Processing", icon: CheckCircle2 },
  { key: "in_transit", ka: "გზაშია", en: "In Transit", icon: Truck },
  { key: "delivered", ka: "ჩაბარებულია", en: "Delivered", icon: PackageCheck },
];

const STATUS_INDEX_MAP: Record<OrderStatus, number> = {
  placed: 0,
  processing: 1,
  in_transit: 2,
  delivered: 3,
};

export default function OrderTracker({
  orderId,
  status,
  date,
  total,
  itemsCount,
}: OrderTrackerProps) {
  const { lang } = useLangStore();
  const currentStepIndex = STATUS_INDEX_MAP[status];

  // პროგრეს-ბარის სიგრძე პროცენტებში
  const progressPercent = (currentStepIndex / (STEPS.length - 1)) * 100;

  return (
    <div className="bg-[#1f2335]/80 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-8 hover:border-[#414868] transition-all duration-300">
      {/* ზედა ზოლი: შეკვეთის ნომერი და ფასი */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#24283b]">
        <div>
          <span className="text-xs uppercase font-extrabold text-[#7aa2f7] tracking-wider">
            {lang === "ka" ? "შეკვეთა" : "Order"} #{orderId}
          </span>
          <p className="text-xs text-[#565f89] mt-0.5">{date}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-[#a9b1d6] block">
              {itemsCount} {lang === "ka" ? "ნივთი" : "items"}
            </span>
            <span className="text-lg font-black text-[#9ece6a]">
              ${total.toFixed(2)}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              status === "delivered"
                ? "bg-[#9ece6a]/10 border-[#9ece6a]/30 text-[#9ece6a]"
                : "bg-[#7aa2f7]/10 border-[#7aa2f7]/30 text-[#7aa2f7] animate-pulse"
            }`}
          >
            {STEPS[currentStepIndex][lang === "ka" ? "ka" : "en"]}
          </span>
        </div>
      </div>

      {/* თაიმლაინის ვიზუალი */}
      <div className="mt-8 px-2 sm:px-6">
        <div className="relative">
          {/* ფონური ნაცრისფერი ხაზი */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 bg-[#16161e] rounded-full z-0" />

          {/* მანათობელი ნეონის პროგრეს-ხაზი */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] shadow-[0_0_12px_rgba(122,162,247,0.6)] rounded-full z-0"
          />

          {/* ეტაპების წერტილები */}
          <div className="relative z-10 flex justify-between items-center">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center group"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isCurrent ? 1.15 : 1 }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-[#1a1b26] border-[#7aa2f7] text-[#7aa2f7] shadow-[0_0_15px_rgba(122,162,247,0.35)]"
                        : "bg-[#16161e] border-[#24283b] text-[#565f89]"
                    } ${isCurrent ? "border-[#bb9af7] text-[#bb9af7] shadow-[0_0_20px_rgba(187,154,247,0.5)]" : ""}`}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <span
                    className={`mt-3 text-[11px] sm:text-xs font-bold text-center transition-colors ${
                      isCompleted ? "text-white" : "text-[#565f89]"
                    } ${isCurrent ? "text-[#bb9af7]" : ""}`}
                  >
                    {step[lang === "ka" ? "ka" : "en"]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
