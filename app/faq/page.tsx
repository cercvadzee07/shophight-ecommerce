"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLangStore } from "@/store/useLangStore";
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: number;
  category: "shipping" | "payment" | "security" | "returns";
  questionKa: string;
  questionEn: string;
  answerKa: string;
  answerEn: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: "shipping",
    questionKa: "რამდენ ხანში ჩამოდის შეკვეთა?",
    questionEn: "How long does shipping take?",
    answerKa:
      "თბილისის მასშტაბით მიწოდება ხდება შეკვეთიდან 2-4 საათში კიბერ-ექსპრეს კურიერით. რეგიონებში ჩაბარება ხორციელდება 24-48 საათის განმავლობაში.",
    answerEn:
      "Delivery within Tbilisi takes 2-4 hours via our Cyber-Express courier. Regional shipments arrive within 24-48 hours.",
  },
  {
    id: 2,
    category: "shipping",
    questionKa: "რა ღირს საკურიერო მომსახურება?",
    questionEn: "What are the shipping fees?",
    answerKa:
      "100 ლარზე ზემოთ შეკვეთებზე მიწოდება სრულიად უფასოა მთელი საქართველოს მასშტაბით. სხვა შემთხვევაში სტანდარტული მიწოდების ტარიფია 5 ლარი.",
    answerEn:
      "Orders above $50 qualify for completely free shipping across Georgia. For smaller orders, a standard fee of $3 applies.",
  },
  {
    id: 3,
    category: "payment",
    questionKa: "გადახდის რა მეთოდებია ხელმისაწვდომი?",
    questionEn: "What payment methods are supported?",
    answerKa:
      "ვიღებთ ყველა წამყვან საბანკო ბარათს (Visa, Mastercard, Amex), Apple Pay-ს, Google Pay-ს და კრიპტო გადახდებს (Solana, BTC, ETH) უსაფრთხო კიბერ-პროტოკოლით.",
    answerEn:
      "We support all major cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and crypto transactions (Solana, BTC, ETH) via secure protocols.",
  },
  {
    id: 4,
    category: "security",
    questionKa: "რამდენად დაცულია ჩემი პირადი და საბანკო მონაცემები?",
    questionEn: "How secure is my personal and banking data?",
    answerKa:
      "ShopNight იყენებს ბოლო თაობის End-to-End დაშიფვრას და დაცულ SSL/TLS არხებს. საბანკო რეკვიზიტები ჩვენს სერვერებზე არ ინახება და მუშავდება დამოწმებული საგადახდო შლუზით.",
    answerEn:
      "ShopNight uses state-of-the-art end-to-end encryption and verified SSL/TLS channels. Payment credentials are never stored on our servers.",
  },
  {
    id: 5,
    category: "returns",
    questionKa: "როგორია პროდუქტის დაბრუნების ან გადაცვლის პოლიტიკა?",
    questionEn: "What is your return and exchange policy?",
    answerKa:
      "პროდუქტის მიღებიდან 14 კალენდარული დღის განმავლობაში შეგიძლიათ ნივთის დაბრუნება ან გადაცვლა, თუ შენარჩუნებულია ქარხნული შეფუთვა და სასაქონლო იერსახე.",
    answerEn:
      "You can request a full refund or exchange within 14 calendar days of delivery, provided the item retains its original packaging and condition.",
  },
  {
    id: 6,
    category: "security",
    questionKa: "როგორ მოქმედებს გარანტია ტექნიკაზე?",
    questionEn: "How does the warranty work for electronics?",
    answerKa:
      "ყველა გაჯეტსა და ელექტრონიკაზე ვრცელდება ოფიციალური 1-დან 2 წლამდე გარანტია. გაუმართაობის შემთხვევაში სერვის-ცენტრი უზრუნველყოფს სწრაფ შეკეთებას ან ახლით ჩანაცვლებას.",
    answerEn:
      "All gadgets and electronic accessories come with an official 1 to 2 year warranty, including prompt repairs or full device replacement.",
  },
];

export default function FAQPage() {
  const { lang } = useLangStore();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [openIds, setOpenIds] = useState<number[]>([1]); // პირველი კითხვა ღიაა თავიდან

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredFaqs =
    activeTab === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeTab);

  const categories = [
    { key: "all", labelKa: "ყველა", labelEn: "All", icon: HelpCircle },
    { key: "shipping", labelKa: "მიწოდება", labelEn: "Shipping", icon: Truck },
    {
      key: "payment",
      labelKa: "გადახდები",
      labelEn: "Payments",
      icon: CreditCard,
    },
    {
      key: "security",
      labelKa: "უსაფრთხოება",
      labelEn: "Security",
      icon: ShieldCheck,
    },
    {
      key: "returns",
      labelKa: "დაბრუნება",
      labelEn: "Returns",
      icon: RotateCcw,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 min-h-[calc(100vh-100px)] relative">
      {/* ფონური განათებები */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-[#7aa2f7]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#bb9af7]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* სათაური */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-3 bg-[#7aa2f7]/10 px-4 py-1 rounded-full border border-[#7aa2f7]/30 text-[#7aa2f7] text-xs font-bold uppercase tracking-wider"
        >
          <HelpCircle size={15} />
          {lang === "ka" ? "ცოდნის ბაზა" : "Knowledge Base"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4"
        >
          {lang === "ka"
            ? "ხშირად დასმული კითხვები"
            : "Frequently Asked Questions"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#a9b1d6] text-sm sm:text-base max-w-xl mx-auto"
        >
          {lang === "ka"
            ? "მიიღეთ პასუხი შეკვეთებთან, უსაფრთხოებასთან და მიწოდებასთან დაკავშირებულ მთავარ საკითხებზე."
            : "Find quick answers regarding shipments, crypto/card payments, guarantees, and returns."}
        </motion.p>
      </div>

      {/* კატეგორიების ფილტრი */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 relative z-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#7aa2f7] text-[#1a1b26] shadow-[0_0_15px_rgba(122,162,247,0.35)]"
                  : "bg-[#1f2335]/70 text-[#a9b1d6] border border-[#24283b] hover:border-[#414868] hover:text-white"
              }`}
            >
              <Icon size={16} />
              {lang === "ka" ? cat.labelKa : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* აკორდეონის სია */}
      <div className="space-y-4 relative z-10">
        <AnimatePresence mode="wait">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="bg-[#1f2335]/80 backdrop-blur-xl border border-[#24283b] rounded-2xl overflow-hidden hover:border-[#414868] transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-white font-bold text-base sm:text-lg">
                    {lang === "ka" ? faq.questionKa : faq.questionEn}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1.5 rounded-lg bg-[#1a1b26] border border-[#24283b] text-[#7aa2f7] shrink-0"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-[#a9b1d6] text-sm sm:text-base leading-relaxed border-t border-[#24283b]/60 pt-4">
                        {lang === "ka" ? faq.answerKa : faq.answerEn}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ქვედა დახმარების ბლოკი */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1f2335] to-[#1a1b26] border border-[#24283b] text-center relative z-10"
      >
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === "ka"
            ? "ვერ იპოვეთ თქვენთვის საინტერესო პასუხი?"
            : "Couldn't find what you're looking for?"}
        </h3>
        <p className="text-[#a9b1d6] text-sm mb-6">
          {lang === "ka"
            ? "მოგვწერეთ პირდაპირ ჩვენს გუნდს და მიიღეთ დეტალური პასუხი რამდენიმე წუთში."
            : "Reach out to our support team directly and we will respond within minutes."}
        </p>
        <Link
          href="/contact"
          className="inline-flex px-6 py-3 rounded-xl bg-[#7aa2f7] text-[#1a1b26] font-bold text-sm hover:shadow-[0_0_20px_rgba(122,162,247,0.4)] transition-all hover:scale-105"
        >
          {lang === "ka" ? "დაგვიკავშირდით" : "Contact Support"}
        </Link>
      </motion.div>
    </div>
  );
}
