"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
  Sparkles,
  Heart,
  CreditCard,
  Edit3,
  Save,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Plus,
  Trash2,
  Clock,
  Bell,
  Lock,
  Truck,
  Cpu,
  TerminalSquare,
} from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useLangStore } from "@/store/useLangStore";
import toast from "react-hot-toast";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface AddressItem {
  id: number;
  title: string;
  city: string;
  address: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const { lang, toggleLang } = useLangStore();
  const wishlistItems = useWishlistStore((state) => state.items || []);

  const [activeTab, setActiveTab] = useState<
    "info" | "orders" | "addresses" | "settings"
  >("orders");
  const [isEditing, setIsEditing] = useState(false);

  // 1. პირადი მონაცემები
  const [userData, setUserData] = useState({
    fullName: "ბექა წერცვაძე",
    email: "beka@neondev.ge",
    phone: "+995 555 12 34 56",
    joinDate: "2026-05-20",
    vipStatus: "Cyber VIP Member",
  });

  // 2. შეკვეთების ისტორია (Tracking ვიზუალით)
  const orders = [
    {
      id: "SN-9428",
      date: "2026-10-24",
      status: "გზაშია",
      statusEn: "In Transit",
      statusColor:
        "text-[#7aa2f7] bg-[#7aa2f7]/15 border-[#7aa2f7]/30 shadow-[0_0_10px_rgba(122,162,247,0.3)]",
      currentStep: 3,
      total: "219.98 ₾",
      items: [
        {
          name: "Viper Neon მაუსი",
          qty: 1,
          image:
            "https://images.unsplash.com/photo-1527814050087-379381547939?auto=format&fit=crop&q=80&w=200",
        },
        {
          name: "RGB მექანიკური კლავიატურა",
          qty: 1,
          image:
            "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=200",
        },
      ],
    },
    {
      id: "SN-8112",
      date: "2026-09-15",
      status: "ჩაბარებულია",
      statusEn: "Delivered",
      statusColor:
        "text-[#9ece6a] bg-[#9ece6a]/15 border-[#9ece6a]/30 shadow-[0_0_10px_rgba(158,206,106,0.3)]",
      currentStep: 4,
      total: "129.99 ₾",
      items: [
        {
          name: "CyberSound Pro",
          qty: 1,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200",
        },
      ],
    },
  ];

  const trackingSteps = [
    { id: 1, labelKa: "მიღებულია", labelEn: "Placed", icon: Package },
    { id: 2, labelKa: "მუშავდება", labelEn: "Processing", icon: Cpu },
    { id: 3, labelKa: "გზაშია", labelEn: "Shipped", icon: Truck },
    { id: 4, labelKa: "ჩაბარებულია", labelEn: "Delivered", icon: CheckCircle2 },
  ];

  // 3. მისამართები
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: 1,
      title: "HQ ბაზა (სახლი)",
      city: "თბილისი",
      address: "ჭავჭავაძის გამზ. 42, სადარბაზო 2, ბინა 15",
      isDefault: true,
    },
    {
      id: 2,
      title: "NEONDEV ლაბორატორია",
      city: "თბილისი",
      address: "კოსტავას ქ. 14, სართული 4, ოთახი 402",
      isDefault: false,
    },
  ]);

  const [newCity, setNewCity] = useState("თბილისი");
  const [newTitle, setNewTitle] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newStreet) {
      toast.error(
        lang === "ka" ? "შეავსეთ ყველა ველი" : "Please fill all fields",
      );
      return;
    }
    const newAddress: AddressItem = {
      id: Date.now(),
      title: newTitle,
      city: newCity,
      address: newStreet,
      isDefault: addresses.length === 0,
    };
    setAddresses([newAddress, ...addresses]);
    setNewTitle("");
    setNewStreet("");
    setIsAddingAddress(false);
    toast.success(
      lang === "ka" ? "ახალი ლოკაცია დაემატა!" : "New location added!",
      { icon: "🛰️" },
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success(
      lang === "ka" ? "პროფილი სინქრონიზებულია!" : "Profile Synced!",
    );
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success(
      lang === "ka" ? "მთავარი ბაზა განახლდა" : "Primary base updated",
    );
  };

  const handleDeleteAddress = (id: number) => {
    if (addresses.length <= 1)
      return toast.error(
        lang === "ka" ? "მინიმუმ ერთი ბაზა საჭიროა" : "One base required",
      );
    setAddresses(addresses.filter((a) => a.id !== id));
    toast(lang === "ka" ? "ლოკაცია წაიშალა" : "Location purged", {
      icon: "🗑️",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7aa2f7]/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mb-10 flex items-center gap-4">
        <div className="p-3 bg-[#1f2335] rounded-2xl border border-[#24283b] text-[#bb9af7] shadow-[0_0_20px_rgba(187,154,247,0.2)]">
          <TerminalSquare size={32} />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            {lang === "ka" ? "ოპერატიული პანელი" : "Command Center"}
          </h1>
          <p className="text-[#a9b1d6] text-sm mt-1 font-mono">
            {lang === "ka"
              ? "NEONDEV • მომხმარებლის სისტემა / V2.1"
              : "NEONDEV • User System / V2.1"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* მარცხენა პანელი (Sidebar) */}
        <div className="space-y-4 sticky top-28">
          <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] opacity-80" />

            <div className="relative w-24 h-24 mx-auto mb-5 mt-2">
              <div className="w-full h-full rounded-2xl bg-[#16161e] border-2 border-[#7aa2f7] flex items-center justify-center text-[#7aa2f7] shadow-[0_0_20px_rgba(122,162,247,0.4)] group-hover:scale-105 transition-transform duration-500">
                <User size={44} />
              </div>
              <span className="absolute -bottom-2 -right-2 p-1.5 bg-[#9ece6a] text-[#1a1b26] rounded-xl shadow-[0_0_15px_rgba(158,206,106,0.6)]">
                <CheckCircle2 size={16} />
              </span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-white">
                {userData.fullName}
              </h3>
              <p className="text-xs text-[#7aa2f7] font-mono">
                {userData.email}
              </p>
            </div>

            <div className="flex justify-center mt-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#bb9af7]/20 to-[#7aa2f7]/20 border border-[#bb9af7]/30 text-[#bb9af7] text-xs font-bold shadow-[0_0_15px_rgba(187,154,247,0.2)]">
                <Sparkles size={14} className="animate-pulse" />
                <span>{userData.vipStatus}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1f2335]/80 backdrop-blur-xl border border-[#24283b] rounded-3xl p-3 shadow-xl flex flex-col gap-1.5 relative">
            {[
              { id: "orders", icon: Package, ka: "შეკვეთები", en: "Orders" },
              {
                id: "info",
                icon: User,
                ka: "პერსონალური ინფო",
                en: "Personal Info",
              },
              {
                id: "addresses",
                icon: MapPin,
                ka: "ლოკაციები",
                en: "Locations",
              },
              { id: "settings", icon: Settings, ka: "სისტემა", en: "System" },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all relative overflow-hidden ${
                    isActive
                      ? "text-[#1a1b26]"
                      : "text-[#a9b1d6] hover:text-white hover:bg-[#1a1b26]/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <Icon size={18} />
                    <span>{lang === "ka" ? tab.ka : tab.en}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={async () => {
              toast(
                lang === "ka" ? "სისტემიდან გასვლა..." : "Disconnecting...",
                { icon: "🔌" },
              );
              await signOut({ callbackUrl: "/" }); // გათიშავს სესიას და გადაგიყვანს მთავარ გვერდზე
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#f7768e]/10 border border-[#f7768e]/20 text-[#f7768e] hover:bg-[#f7768e] hover:text-[#1a1b26] rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(247,118,142,0.1)] hover:shadow-[0_0_20px_rgba(247,118,142,0.4)]"
          >
            <LogOut size={16} />
            <span>
              {lang === "ka" ? "გამოსვლა (Disconnect)" : "Disconnect"}
            </span>
          </button>
        </div>

        {/* მარჯვენა მთავარი კონტენტი */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* ==================== ტაბი 1: შეკვეთები ==================== */}
              {activeTab === "orders" && (
                <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <Truck className="text-[#7aa2f7]" />
                      {lang === "ka"
                        ? "შეკვეთების ტრანსპორტირება"
                        : "Logistics & Tracking"}
                    </h2>
                    <p className="text-xs text-[#a9b1d6] mt-1 font-mono">
                      {lang === "ka"
                        ? "ცოცხალი მონიტორინგი"
                        : "Live synchronization active"}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-3xl bg-[#16161e]/80 border border-[#24283b] overflow-hidden shadow-lg relative group backdrop-blur-sm"
                      >
                        <div className="p-5 sm:p-6 border-b border-[#24283b] flex flex-wrap items-center justify-between gap-4 bg-[#1a1b26]/50">
                          <div>
                            <span className="text-xs text-[#565f89] font-mono block mb-1">
                              {lang === "ka"
                                ? "ტრანზაქციის ID"
                                : "Transaction ID"}
                            </span>
                            <span className="font-mono text-lg font-black text-white tracking-widest group-hover:text-[#7aa2f7] transition-colors">
                              {order.id}
                            </span>
                          </div>

                          <div className="text-right">
                            <span
                              className={`inline-block text-xs font-bold px-3 py-1.5 rounded-xl border ${order.statusColor}`}
                            >
                              {lang === "ka" ? order.status : order.statusEn}
                            </span>
                            <div className="text-[#565f89] text-xs font-mono mt-2 flex items-center justify-end gap-1.5">
                              <Clock size={12} />
                              {order.date}
                            </div>
                          </div>
                        </div>

                        <div className="p-6 sm:p-8">
                          <div className="relative">
                            <div className="absolute top-5 left-0 w-full h-1 bg-[#24283b] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${((order.currentStep - 1) / (trackingSteps.length - 1)) * 100}%`,
                                }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] shadow-[0_0_10px_rgba(122,162,247,0.8)]"
                              />
                            </div>

                            <div className="relative flex justify-between">
                              {trackingSteps.map((step) => {
                                const isCompleted =
                                  order.currentStep >= step.id;
                                const isCurrent = order.currentStep === step.id;
                                const StepIcon = step.icon;

                                return (
                                  <div
                                    key={step.id}
                                    className="flex flex-col items-center gap-3 z-10 w-20"
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                                        isCompleted
                                          ? isCurrent
                                            ? "bg-[#1a1b26] border-[#bb9af7] text-[#bb9af7] shadow-[0_0_15px_rgba(187,154,247,0.5)] scale-110"
                                            : "bg-[#7aa2f7] border-[#7aa2f7] text-[#1a1b26] shadow-[0_0_15px_rgba(122,162,247,0.4)]"
                                          : "bg-[#16161e] border-[#24283b] text-[#565f89]"
                                      }`}
                                    >
                                      <StepIcon
                                        size={18}
                                        className={
                                          isCurrent ? "animate-pulse" : ""
                                        }
                                      />
                                    </div>
                                    <span
                                      className={`text-[10px] sm:text-xs font-bold text-center ${
                                        isCurrent
                                          ? "text-[#bb9af7]"
                                          : isCompleted
                                            ? "text-white"
                                            : "text-[#565f89]"
                                      }`}
                                    >
                                      {lang === "ka"
                                        ? step.labelKa
                                        : step.labelEn}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#1a1b26]/80 p-5 sm:p-6 border-t border-[#24283b]">
                          <h4 className="text-xs font-bold text-[#a9b1d6] uppercase tracking-wider mb-4 flex items-center justify-between">
                            <span>{lang === "ka" ? "პროდუქცია" : "Items"}</span>
                            <span className="text-[#9ece6a] text-base">
                              {order.total}
                            </span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-4 bg-[#16161e] p-3 rounded-2xl border border-[#24283b] hover:border-[#414868] transition-colors"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-[#24283b]"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs sm:text-sm font-bold text-white truncate block">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-[#565f89] font-mono mt-0.5">
                                    QTY: {item.qty}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== ტაბი 2: პირადი ინფო ==================== */}
              {activeTab === "info" && (
                <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-[#bb9af7]/5 rounded-full blur-[100px] pointer-events-none" />

                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#24283b] relative z-10">
                    <div>
                      <h2 className="text-2xl font-black text-white">
                        {lang === "ka" ? "მონაცემთა ბაზა" : "Data Core"}
                      </h2>
                      <p className="text-xs text-[#a9b1d6] mt-1 font-mono">
                        {lang === "ka"
                          ? "ავტორიზებული მომხმარებლის პროფილი"
                          : "Authorized User Profile"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-xs font-bold shadow-lg ${
                        isEditing
                          ? "bg-[#f7768e]/10 text-[#f7768e] border border-[#f7768e]/30 hover:bg-[#f7768e]/20"
                          : "bg-[#7aa2f7]/10 text-[#7aa2f7] border border-[#7aa2f7]/30 hover:bg-[#7aa2f7] hover:text-[#1a1b26]"
                      }`}
                    >
                      {isEditing ? (
                        <>
                          <Save size={14} />{" "}
                          <span>{lang === "ka" ? "დაბლოკვა" : "Lock"}</span>
                        </>
                      ) : (
                        <>
                          <Edit3 size={14} />{" "}
                          <span>{lang === "ka" ? "განბლოკვა" : "Unlock"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <form
                    onSubmit={handleSaveProfile}
                    className="space-y-6 relative z-10"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        {
                          label:
                            lang === "ka"
                              ? "ოპერატორის სახელი"
                              : "Operator Name",
                          icon: User,
                          key: "fullName",
                          type: "text",
                        },
                        {
                          label:
                            lang === "ka"
                              ? "კომუნიკაციის არხი (Email)"
                              : "Comms Channel (Email)",
                          icon: Mail,
                          key: "email",
                          type: "email",
                        },
                        {
                          label:
                            lang === "ka"
                              ? "სიგნალის მიმღები (ტელეფონი)"
                              : "Signal Receiver (Phone)",
                          icon: Phone,
                          key: "phone",
                          type: "text",
                        },
                      ].map((field) => (
                        <div key={field.key} className="relative group">
                          <label className="flex items-center gap-2 text-xs font-bold text-[#bb9af7] uppercase tracking-wider mb-2">
                            <field.icon size={14} />
                            <span>{field.label}</span>
                          </label>
                          <input
                            type={field.type}
                            disabled={!isEditing}
                            value={(userData as any)[field.key]}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                [field.key]: e.target.value,
                              })
                            }
                            className={`w-full bg-[#16161e]/80 border rounded-2xl py-3.5 px-4 text-sm font-mono text-white transition-all outline-none ${
                              isEditing
                                ? "border-[#bb9af7] shadow-[0_0_15px_rgba(187,154,247,0.15)] focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.3)]"
                                : "border-[#24283b] opacity-70 cursor-not-allowed"
                            }`}
                          />
                        </div>
                      ))}

                      <div>
                        <label className="flex items-center gap-2 text-xs font-bold text-[#bb9af7] uppercase tracking-wider mb-2">
                          <Calendar size={14} />
                          <span>
                            {lang === "ka"
                              ? "ინიციალიზაციის თარიღი"
                              : "System Init Date"}
                          </span>
                        </label>
                        <div className="w-full bg-[#16161e]/80 border border-[#24283b] rounded-2xl py-3.5 px-4 text-sm text-[#565f89] font-mono cursor-not-allowed opacity-70 flex items-center justify-between">
                          {userData.joinDate}
                          <Lock size={14} />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end pt-4 border-t border-[#24283b]"
                      >
                        <button
                          type="submit"
                          className="px-8 py-3.5 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-[#1a1b26] font-black rounded-2xl text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:scale-105 transition-all"
                        >
                          <Cpu size={18} />
                          <span>
                            {lang === "ka"
                              ? "მონაცემების სინქრონიზაცია"
                              : "Sync Data"}
                          </span>
                        </button>
                      </motion.div>
                    )}
                  </form>
                </div>
              )}

              {/* ==================== ტაბი 3: მისამართები ==================== */}
              {activeTab === "addresses" && (
                <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#24283b]">
                    <div>
                      <h2 className="text-2xl font-black text-white">
                        {lang === "ka" ? "ლოკაციები" : "Drop Zones"}
                      </h2>
                      <p className="text-xs text-[#a9b1d6] mt-1 font-mono">
                        {lang === "ka"
                          ? "მიწოდების კოორდინატები"
                          : "Delivery Coordinates"}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingAddress(!isAddingAddress)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg ${
                        isAddingAddress
                          ? "bg-[#f7768e]/10 text-[#f7768e] border border-[#f7768e]/30 hover:bg-[#f7768e]/20"
                          : "bg-[#7aa2f7] text-[#1a1b26] shadow-[0_0_15px_rgba(122,162,247,0.3)] hover:scale-105"
                      }`}
                    >
                      <Plus
                        size={16}
                        className={
                          isAddingAddress
                            ? "rotate-45 transition-transform"
                            : "transition-transform"
                        }
                      />
                      <span>
                        {isAddingAddress
                          ? lang === "ka"
                            ? "დახურვა"
                            : "Abort"
                          : lang === "ka"
                            ? "ახალი კოორდინატი"
                            : "New Zone"}
                      </span>
                    </button>
                  </div>

                  {/* ახალი ლოკაციის დამატების ფორმა ანიმაციით */}
                  <AnimatePresence>
                    {isAddingAddress && (
                      <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleAddAddress}
                        className="overflow-hidden bg-[#16161e]/80 backdrop-blur-sm border border-[#7aa2f7]/40 rounded-3xl p-5 sm:p-6 space-y-5 shadow-[0_0_20px_rgba(122,162,247,0.1)]"
                      >
                        <h4 className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider mb-2 flex items-center gap-2">
                          <MapPin size={14} />
                          {lang === "ka"
                            ? "ახალი ლოკაციის მონაცემები"
                            : "New Location Data"}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] text-[#a9b1d6] block mb-1 uppercase font-bold tracking-wider">
                              {lang === "ka"
                                ? "დასახელება (მაგ: ბაზა 2)"
                                : "Title (e.g. Base 2)"}
                            </label>
                            <input
                              type="text"
                              required
                              value={newTitle}
                              onChange={(e) => setNewTitle(e.target.value)}
                              className="w-full bg-[#1a1b26] border border-[#24283b] focus:border-[#7aa2f7] outline-none text-white text-xs py-3 px-4 rounded-xl transition-all"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] text-[#a9b1d6] block mb-1 uppercase font-bold tracking-wider">
                              {lang === "ka" ? "ქალაქი" : "City"}
                            </label>
                            <select
                              value={newCity}
                              onChange={(e) => setNewCity(e.target.value)}
                              className="w-full bg-[#1a1b26] border border-[#24283b] focus:border-[#7aa2f7] outline-none text-white text-xs py-3 px-4 rounded-xl transition-all"
                            >
                              <option value="თბილისი">თბილისი</option>
                              <option value="ბათუმი">ბათუმი</option>
                              <option value="ქუთაისი">ქუთაისი</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] text-[#a9b1d6] block mb-1 uppercase font-bold tracking-wider">
                            {lang === "ka"
                              ? "ზუსტი კოორდინატები (ქუჩა, ბინა)"
                              : "Exact Coordinates"}
                          </label>
                          <input
                            type="text"
                            required
                            value={newStreet}
                            onChange={(e) => setNewStreet(e.target.value)}
                            className="w-full bg-[#1a1b26] border border-[#24283b] focus:border-[#7aa2f7] outline-none text-white text-xs py-3 px-4 rounded-xl transition-all"
                          />
                        </div>

                        <div className="flex justify-end pt-2 border-t border-[#24283b]">
                          <button
                            type="submit"
                            className="px-6 py-2.5 mt-2 bg-[#9ece6a] hover:bg-[#9ece6a]/90 text-[#1a1b26] font-black text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(158,206,106,0.3)] hover:scale-105"
                          >
                            {lang === "ka"
                              ? "ბაზაში დამატება"
                              : "Add to Database"}
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`relative p-6 rounded-3xl bg-[#16161e]/80 backdrop-blur-sm border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                          addr.isDefault
                            ? "border-[#9ece6a] shadow-[0_0_20px_rgba(158,206,106,0.15)]"
                            : "border-[#24283b] hover:border-[#7aa2f7]/50"
                        }`}
                      >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`p-2 rounded-lg ${addr.isDefault ? "bg-[#9ece6a]/20 text-[#9ece6a]" : "bg-[#1a1b26] text-[#7aa2f7]"}`}
                              >
                                <MapPin size={18} />
                              </div>
                              <h4 className="text-sm font-black text-white tracking-wide">
                                {addr.title}
                              </h4>
                            </div>
                            {addr.isDefault && (
                              <span className="text-[10px] font-black text-[#1a1b26] bg-[#9ece6a] px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(158,206,106,0.4)]">
                                MAIN BASE
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-[#bb9af7] block mb-1">
                            CITY // {addr.city}
                          </span>
                          <p className="text-sm text-[#a9b1d6]">
                            {addr.address}
                          </p>
                        </div>

                        <div className="relative z-10 flex items-center justify-between mt-6 pt-4 border-t border-[#24283b]">
                          {!addr.isDefault ? (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-xs text-[#7aa2f7] hover:text-[#9ece6a] font-bold transition-colors"
                            >
                              {lang === "ka"
                                ? "მთავარ ბაზად ქცევა"
                                : "Set as Main Base"}
                            </button>
                          ) : (
                            <span className="text-xs font-mono text-[#565f89]">
                              ACTIVE COORDINATE
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-2 bg-[#1a1b26] text-[#565f89] hover:text-[#f7768e] hover:bg-[#f7768e]/10 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== ტაბი 4: პარამეტრები ==================== */}
              {activeTab === "settings" && (
                <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
                  <div className="pb-4 border-b border-[#24283b]">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                      <Settings className="text-[#a9b1d6]" />
                      {lang === "ka" ? "სისტემის პარამეტრები" : "System Config"}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* ენის შეცვლა */}
                    <div className="p-5 rounded-2xl bg-[#16161e]/80 border border-[#24283b] flex items-center justify-between hover:border-[#7aa2f7]/50 transition-colors">
                      <div>
                        <h5 className="text-sm font-bold text-white">
                          {lang === "ka"
                            ? "პროტოკოლის ენა"
                            : "Protocol Language"}
                        </h5>
                        <p className="text-[11px] font-mono text-[#565f89] mt-1">
                          ACTIVE: {lang === "ka" ? "GEO" : "ENG"}
                        </p>
                      </div>
                      <button
                        onClick={toggleLang}
                        className="px-5 py-2 bg-[#1a1b26] border border-[#7aa2f7]/30 text-[#7aa2f7] hover:bg-[#7aa2f7] hover:text-[#1a1b26] rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(122,162,247,0.15)]"
                      >
                        {lang === "ka" ? "SWITCH TO ENG" : "SWITCH TO GEO"}
                      </button>
                    </div>

                    {/* უსაფრთხოება 2FA */}
                    <div className="p-5 rounded-2xl bg-[#16161e]/80 border border-[#24283b] flex items-center justify-between hover:border-[#bb9af7]/50 transition-colors">
                      <div>
                        <h5 className="text-sm font-bold text-white flex items-center gap-2">
                          <ShieldCheck size={16} className="text-[#bb9af7]" />
                          {lang === "ka"
                            ? "კვანტური დაცვა (2FA)"
                            : "Quantum Security (2FA)"}
                        </h5>
                        <p className="text-[11px] font-mono text-[#565f89] mt-1">
                          STATUS: SECURED
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-[#9ece6a]/20 border border-[#9ece6a] rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(158,206,106,0.3)]">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-[#9ece6a] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
