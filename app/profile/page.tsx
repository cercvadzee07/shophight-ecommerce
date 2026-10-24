"use client";

import { useState, useEffect } from "react";
import { useLangStore } from "@/store/useLangStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  MapPin,
  LogOut,
  Settings,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// დროებითი მონაცემები
const MOCK_USER = {
  name: "ბექა წერცვაძე",
  email: "beka@neondev.ge",
  phone: "+995 555 12 34 56",
  joinDate: "2026-05-20",
};

const MOCK_ORDERS = [
  {
    id: "ORD-8923",
    date: "2026-10-22",
    total: 129.99,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-8744",
    date: "2026-10-15",
    total: 349.98,
    status: "processing",
    items: 2,
  },
];

export default function ProfilePage() {
  const { lang } = useLangStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tabs = [
    {
      id: "profile",
      icon: <User size={20} />,
      labelKa: "პირადი ინფო",
      labelEn: "Personal Info",
    },
    {
      id: "orders",
      icon: <Package size={20} />,
      labelKa: "შეკვეთები",
      labelEn: "My Orders",
    },
    {
      id: "addresses",
      icon: <MapPin size={20} />,
      labelKa: "მისამართები",
      labelEn: "Addresses",
    },
    {
      id: "settings",
      icon: <Settings size={20} />,
      labelKa: "პარამეტრები",
      labelEn: "Settings",
    },
  ];

  const handleLogout = () => {
    toast.success(
      lang === "ka" ? "წარმატებით გამოხვედით" : "Logged out successfully",
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          {lang === "ka" ? "ჩემი პროფილი" : "My Profile"}
        </h1>
        <p className="text-[#a9b1d6] mt-2">
          {lang === "ka"
            ? "მართეთ თქვენი მონაცემები და შეკვეთები"
            : "Manage your data and orders"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-grow">
        {/* მარცხენა მენიუ */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-2">
          <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-4 shadow-xl mb-4">
            <div className="flex items-center gap-4 mb-6 p-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#7aa2f7] to-[#bb9af7] p-0.5">
                <div className="w-full h-full bg-[#16161e] rounded-full flex items-center justify-center">
                  <User className="text-[#7aa2f7]" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">{MOCK_USER.name}</h3>
                <span className="text-[#a9b1d6] text-xs">
                  {MOCK_USER.email}
                </span>
              </div>
            </div>

            <nav className="space-y-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#7aa2f7]/10 text-[#7aa2f7] border border-[#7aa2f7]/20"
                      : "text-[#a9b1d6] hover:bg-[#1a1b26] hover:text-white border border-transparent"
                  }`}
                >
                  {tab.icon}
                  {lang === "ka" ? tab.labelKa : tab.labelEn}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-4 rounded-3xl text-sm font-semibold text-[#f7768e] bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] hover:bg-[#f7768e]/10 hover:border-[#f7768e]/30 transition-all shadow-lg cursor-pointer"
          >
            <LogOut size={20} />
            {lang === "ka" ? "გამოსვლა" : "Log Out"}
          </button>
        </div>

        {/* მარჯვენა კონტენტი */}
        <div className="flex-grow bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* ფონური მანათობელი ეფექტი */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7aa2f7]/5 rounded-full blur-[100px] pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">
                  {lang === "ka" ? "პირადი ინფორმაცია" : "Personal Information"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider">
                      {lang === "ka" ? "სრული სახელი" : "Full Name"}
                    </label>
                    <div className="p-4 bg-[#1a1b26] border border-[#414868] rounded-2xl text-white">
                      {MOCK_USER.name}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider">
                      {lang === "ka" ? "ელ. ფოსტა" : "Email Address"}
                    </label>
                    <div className="p-4 bg-[#1a1b26] border border-[#414868] rounded-2xl text-white">
                      {MOCK_USER.email}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider">
                      {lang === "ka" ? "ტელეფონი" : "Phone Number"}
                    </label>
                    <div className="p-4 bg-[#1a1b26] border border-[#414868] rounded-2xl text-white">
                      {MOCK_USER.phone}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider">
                      {lang === "ka" ? "რეგისტრაციის თარიღი" : "Member Since"}
                    </label>
                    <div className="p-4 bg-[#1a1b26] border border-[#414868] rounded-2xl text-[#a9b1d6]">
                      {MOCK_USER.joinDate}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <h2 className="text-xl font-bold text-white mb-6">
                  {lang === "ka" ? "შეკვეთების ისტორია" : "Order History"}
                </h2>

                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-[#1a1b26] border border-[#414868] rounded-2xl hover:border-[#7aa2f7] transition-colors gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-bold">
                            {order.id}
                          </span>
                          {order.status === "delivered" ? (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#9ece6a] bg-[#9ece6a]/10 px-2 py-1 rounded-md">
                              <CheckCircle2 size={12} />{" "}
                              {lang === "ka" ? "ჩაბარებული" : "Delivered"}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-[#e0af68] bg-[#e0af68]/10 px-2 py-1 rounded-md">
                              <Clock size={12} />{" "}
                              {lang === "ka" ? "მზადდება" : "Processing"}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#a9b1d6]">
                          {order.date} • {order.items}{" "}
                          {lang === "ka" ? "ნივთი" : "Items"}
                        </span>
                      </div>
                      <div className="text-xl font-black text-[#7aa2f7]">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === "addresses" || activeTab === "settings") && (
              <motion.div
                key="other"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center justify-center py-20 text-center text-[#a9b1d6]"
              >
                <Settings size={48} className="mb-4 opacity-50" />
                <p>
                  {lang === "ka"
                    ? "ეს სექცია მუშავდება..."
                    : "This section is under construction..."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
