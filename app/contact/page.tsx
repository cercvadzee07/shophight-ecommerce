"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Hexagon, Terminal } from "lucide-react";
import { useLangStore } from "@/store/useLangStore";
import toast from "react-hot-toast";

export default function ContactPage() {
  const { lang } = useLangStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ფორმის გაგზავნის სიმულაცია
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        lang === "ka"
          ? "შეტყობინება წარმატებით გაიგზავნა!"
          : "Message sent successfully!",
        {
          style: {
            background: "#1a1b26",
            color: "#9ece6a",
            border: "1px solid #9ece6a",
          },
        },
      );
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-100px)] relative overflow-hidden">
      {/* ფონური ნათება */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#7aa2f7]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#bb9af7]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* სათაური */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center gap-2 mb-4 bg-[#7aa2f7]/10 px-4 py-1.5 rounded-full border border-[#7aa2f7]/30 text-[#7aa2f7] text-sm font-bold tracking-widest uppercase"
        >
          <Terminal size={16} /> {lang === "ka" ? "კავშირი" : "Connection"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
        >
          {lang === "ka" ? "დაგვიკავშირდით" : "Get in Touch"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#a9b1d6] max-w-xl mx-auto text-lg"
        >
          {lang === "ka"
            ? "გაქვთ კითხვები ან თანამშრომლობის იდეა? მოგვწერეთ კიბერ-სივრცეში და ჩვენი გუნდი მალევე დაგიბრუნდებათ."
            : "Have questions or partnership ideas? Send us a transmission in cyberspace and our team will get back to you shortly."}
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        {/* საკონტაქტო ფორმა */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-6 sm:p-10 shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Mail className="text-[#bb9af7]" />
            {lang === "ka" ? "გამოგვიგზავნეთ შეტყობინება" : "Send us a message"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a9b1d6] uppercase tracking-wider">
                  {lang === "ka" ? "სახელი" : "Name"}
                </label>
                <input
                  required
                  type="text"
                  placeholder={lang === "ka" ? "ბექა წერცვაძე" : "John Doe"}
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#bb9af7] focus:shadow-[0_0_15px_rgba(187,154,247,0.2)] transition-all placeholder-[#414868]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a9b1d6] uppercase tracking-wider">
                  {lang === "ka" ? "ელ. ფოსტა" : "Email"}
                </label>
                <input
                  required
                  type="email"
                  placeholder="beka@neondev.ge"
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.2)] transition-all placeholder-[#414868]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#a9b1d6] uppercase tracking-wider">
                {lang === "ka" ? "თემა" : "Subject"}
              </label>
              <input
                required
                type="text"
                placeholder={lang === "ka" ? "თანამშრომლობა" : "Partnership"}
                className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#9ece6a] focus:shadow-[0_0_15px_rgba(158,206,106,0.2)] transition-all placeholder-[#414868]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#a9b1d6] uppercase tracking-wider">
                {lang === "ka" ? "შეტყობინება" : "Message"}
              </label>
              <textarea
                required
                rows={5}
                placeholder={
                  lang === "ka" ? "თქვენი ტექსტი აქ..." : "Your text here..."
                }
                className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.2)] transition-all resize-none placeholder-[#414868]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#7aa2f7] text-[#1a1b26] rounded-xl font-black flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_25px_rgba(122,162,247,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#1a1b26] border-t-transparent rounded-full animate-spin"></div>
                  {lang === "ka" ? "იგზავნება..." : "Sending..."}
                </span>
              ) : (
                <>
                  {lang === "ka" ? "გაგზავნა" : "Send Message"}
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* საკონტაქტო ინფო */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 space-y-6"
        >
          {/* ინფორმაციის ბარათები */}
          <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-8 shadow-xl flex items-start gap-5 hover:border-[#7aa2f7]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#7aa2f7]/10 flex items-center justify-center flex-shrink-0 text-[#7aa2f7] border border-[#7aa2f7]/20">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                {lang === "ka" ? "ლოკაცია" : "Location"}
              </h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                Tbilisi, Georgia
                <br />
                {lang === "ka" ? "კიბერ სივრცე 2026" : "Cyberspace 2026"}
              </p>
            </div>
          </div>

          <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-8 shadow-xl flex items-start gap-5 hover:border-[#bb9af7]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#bb9af7]/10 flex items-center justify-center flex-shrink-0 text-[#bb9af7] border border-[#bb9af7]/20">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                {lang === "ka" ? "ტელეფონი" : "Phone"}
              </h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                +995 555 12 34 56
                <br />
                <span className="text-sm opacity-70">
                  {lang === "ka"
                    ? "ორშ-პარ: 10:00 - 19:00"
                    : "Mon-Fri: 10:00 - 19:00"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[#1f2335]/90 backdrop-blur-xl border border-[#24283b] rounded-3xl p-8 shadow-xl flex items-start gap-5 hover:border-[#9ece6a]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#9ece6a]/10 flex items-center justify-center flex-shrink-0 text-[#9ece6a] border border-[#9ece6a]/20">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                {lang === "ka" ? "ელ. ფოსტა" : "Email"}
              </h3>
              <p className="text-[#a9b1d6] leading-relaxed">
                hello@neondev.ge
                <br />
                support@neondev.ge
              </p>
            </div>
          </div>

          {/* ბრენდის ლოგო / იმიტაცია */}
          <div className="h-40 rounded-3xl border border-[#24283b] bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80')] bg-cover bg-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#0f111a]/80 group-hover:bg-[#0f111a]/60 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <Hexagon
                className="text-[#7aa2f7] mb-2 drop-shadow-[0_0_15px_#7aa2f7]"
                size={36}
                fill="currentColor"
                fillOpacity={0.2}
              />
              <span className="text-xl font-black text-white tracking-widest">
                NEONDEV
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
