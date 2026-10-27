"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLangStore } from "@/store/useLangStore";
import { motion } from "framer-motion";
import {
  TerminalSquare,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLangStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(lang === "ka" ? "შეავსეთ ყველა ველი" : "Fill in all fields");
      return;
    }

    setIsLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(
        lang === "ka" ? "არასწორი ელ. ფოსტა ან პაროლი" : "Invalid credentials",
      );
      setIsLoading(false);
    } else {
      toast.success(
        lang === "ka" ? "სისტემაში წარმატებით შეხვედით!" : "Login successful!",
        { icon: "⚡" },
      );
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* ფონის მბრუნავი ანიმაციური დეკორაცია */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#7aa2f7]/5 via-[#bb9af7]/5 to-[#9ece6a]/5 blur-[100px] rounded-full pointer-events-none -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#16161e]/90 backdrop-blur-2xl border border-[#24283b] rounded-[2rem] p-8 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group"
      >
        {/* ზედა მორბენალი გრადიენტული ხაზი (Neon Flow) */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7aa2f7] via-[#bb9af7] to-[#9ece6a] bg-[length:200%_auto]"
        />

        {/* ანიმირებული შუქი (Glow) კომპონენტის უკან */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#7aa2f7]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#bb9af7]/20 transition-colors duration-700" />

        <div className="text-center mb-10 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex p-3.5 bg-[#0f111a] rounded-2xl border border-[#24283b] text-[#bb9af7] shadow-[0_0_30px_rgba(187,154,247,0.2)] mb-5 relative"
          >
            <TerminalSquare size={36} />
            <Sparkles
              size={14}
              className="absolute -top-1.5 -right-1.5 text-[#7aa2f7] animate-pulse"
            />
          </motion.div>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            {lang === "ka" ? "სისტემაში შესვლა" : "System Access"}
          </h1>
          <p className="text-xs text-[#a9b1d6] font-mono tracking-wider uppercase">
            {lang === "ka"
              ? "ავტორიზაცია NEONDEV ID-ით"
              : "Authenticate with NEONDEV ID"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="text-[11px] font-black text-[#7aa2f7] uppercase tracking-widest ml-1">
              {lang === "ka" ? "ელ. ფოსტა" : "Email Address"}
            </label>
            <div className="relative group/input">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565f89] group-focus-within/input:text-[#7aa2f7] transition-colors z-10"
              />
              {/* Autofill Fix-ის კლასები */}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="beka@neondev.ge"
                className="w-full bg-[#0f111a] border border-[#24283b] focus:border-[#7aa2f7] outline-none text-white text-sm py-4 pl-12 pr-4 rounded-2xl transition-all focus:shadow-[0_0_20px_rgba(122,162,247,0.15)] font-mono [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_30px_#0f111a_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-[11px] font-black text-[#7aa2f7] uppercase tracking-widest ml-1 flex justify-between">
              <span>{lang === "ka" ? "პაროლი" : "Password"}</span>
            </label>
            <div className="relative group/input">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#565f89] group-focus-within/input:text-[#7aa2f7] transition-colors z-10"
              />
              {/* Autofill Fix-ის კლასები */}
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0f111a] border border-[#24283b] focus:border-[#7aa2f7] outline-none text-white text-sm py-4 pl-12 pr-4 rounded-2xl transition-all focus:shadow-[0_0_20px_rgba(122,162,247,0.15)] font-mono tracking-[0.3em] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_30px_#0f111a_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
              />
            </div>
          </motion.div>

          {/* დემო მონაცემები */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-3.5 rounded-2xl bg-[#7aa2f7]/5 border border-[#7aa2f7]/20 text-center backdrop-blur-sm"
          >
            <p className="text-[11px] text-[#7aa2f7] font-mono leading-relaxed">
              <strong className="block mb-1 text-[#bb9af7] tracking-wider">
                DEMO CREDENTIALS
              </strong>
              Email: <span className="text-white">beka@neondev.ge</span>
              <br />
              Pass: <span className="text-white">neon2026</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#7aa2f7] via-[#9af7e8] to-[#bb9af7] bg-[length:200%_auto] hover:bg-right text-[#1a1b26] font-black rounded-2xl text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(122,162,247,0.4)] transition-all duration-500 disabled:opacity-70 disabled:pointer-events-none hover:scale-[1.03] active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span className="uppercase tracking-widest">
                    {lang === "ka" ? "ავტორიზაცია" : "Initialize"}
                  </span>
                  <ArrowRight size={20} className="animate-pulse" />
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* რეგისტრაცია და უკან დაბრუნება */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-6 border-t border-[#24283b] flex flex-col items-center gap-5 relative z-10"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <span className="text-[#565f89]">
              {lang === "ka" ? "არ გაქვთ ანგარიში?" : "Don't have an account?"}
            </span>
            <Link
              href="#" // უბრალოდ ცარიელი ლინკი
              className="text-[#9ece6a] hover:text-white hover:underline underline-offset-4 decoration-[#9ece6a]/50 transition-all font-bold"
            >
              {lang === "ka" ? "რეგისტრაცია" : "Sign Up"}
            </Link>
          </div>

          <Link
            href="/"
            className="text-[11px] uppercase tracking-widest font-bold text-[#565f89] hover:text-[#bb9af7] transition-colors flex items-center gap-1.5 group"
          >
            <ArrowRight
              size={12}
              className="rotate-180 group-hover:-translate-x-1 transition-transform"
            />
            {lang === "ka" ? "მთავარზე დაბრუნება" : "Back to Home"}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
