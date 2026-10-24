"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useLangStore } from "@/store/useLangStore";

export default function LoginPage() {
  const { lang } = useLangStore();
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* ფონური ნათება */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7aa2f7]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#7aa2f7] hover:text-[#bb9af7] transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft size={16} />{" "}
          {lang === "ka" ? "მთავარზე დაბრუნება" : "Back to Home"}
        </Link>

        <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl shadow-2xl overflow-hidden">
          {/* ტაბები შესვლა/რეგისტრაცია */}
          <div className="flex border-b border-[#24283b]">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-bold transition-colors relative ${
                isLogin ? "text-white" : "text-[#414868] hover:text-[#a9b1d6]"
              }`}
            >
              {lang === "ka" ? "შესვლა" : "Log In"}
              {isLogin && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7aa2f7] shadow-[0_0_10px_#7aa2f7]"
                />
              )}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-bold transition-colors relative ${
                !isLogin ? "text-white" : "text-[#414868] hover:text-[#a9b1d6]"
              }`}
            >
              {lang === "ka" ? "რეგისტრაცია" : "Sign Up"}
              {!isLogin && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#bb9af7] shadow-[0_0_10px_#bb9af7]"
                />
              )}
            </button>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {!isLogin && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#a9b1d6] uppercase tracking-wider">
                      {lang === "ka" ? "სახელი" : "Name"}
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414868]"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder={
                          lang === "ka" ? "ბექა წერცვაძე" : "John Doe"
                        }
                        className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#bb9af7] focus:shadow-[0_0_15px_rgba(187,154,247,0.2)] transition-all placeholder-[#414868]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#a9b1d6] uppercase tracking-wider">
                    {lang === "ka" ? "ელ. ფოსტა" : "Email"}
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414868]"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="beka@neondev.ge"
                      className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.2)] transition-all placeholder-[#414868]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-[#a9b1d6] uppercase tracking-wider">
                      {lang === "ka" ? "პაროლი" : "Password"}
                    </label>
                    {isLogin && (
                      <a
                        href="#"
                        className="text-[10px] text-[#7aa2f7] hover:underline"
                      >
                        {lang === "ka" ? "დაგავიწყდა?" : "Forgot?"}
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414868]"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.2)] transition-all placeholder-[#414868]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 mt-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-sm ${
                    isLogin
                      ? "bg-[#7aa2f7] text-[#1a1b26] hover:shadow-[0_0_20px_rgba(122,162,247,0.4)]"
                      : "bg-[#bb9af7] text-[#1a1b26] hover:shadow-[0_0_20px_rgba(187,154,247,0.4)]"
                  }`}
                >
                  {isLogin
                    ? lang === "ka"
                      ? "სისტემაში შესვლა"
                      : "Sign In"
                    : lang === "ka"
                      ? "ანგარიშის შექმნა"
                      : "Create Account"}
                  <ArrowRight size={18} />
                </button>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
