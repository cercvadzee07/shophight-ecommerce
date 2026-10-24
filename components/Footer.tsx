"use client";

import Link from "next/link";
import { useLangStore } from "@/store/useLangStore";
import { Mail, Send, Hexagon } from "lucide-react";

export default function Footer() {
  const { lang } = useLangStore();

  return (
    <footer className="bg-[#16161e] border-t border-[#24283b] pt-16 pb-8 relative overflow-hidden mt-20">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7aa2f7]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#bb9af7]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Hexagon
                className="text-[#7aa2f7]"
                size={28}
                fill="currentColor"
                fillOpacity={0.2}
              />
              <span className="text-2xl font-black text-white tracking-wide">
                Shop<span className="text-[#7aa2f7]">Night</span>
              </span>
            </Link>
            <p className="text-[#a9b1d6] text-sm leading-relaxed">
              {lang === "ka"
                ? "პრემიუმ ელექტრონიკისა და აქსესუარების კიბერ-სივრცე. შექმნილია მომავლის ტექნოლოგიების მოყვარულთათვის."
                : "Premium electronics and accessories cyberspace. Built for future technology enthusiasts."}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1f2335] border border-[#24283b] flex items-center justify-center text-[#a9b1d6] hover:text-[#7aa2f7] hover:border-[#7aa2f7] hover:shadow-[0_0_15px_rgba(122,162,247,0.3)] transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1f2335] border border-[#24283b] flex items-center justify-center text-[#a9b1d6] hover:text-[#bb9af7] hover:border-[#bb9af7] hover:shadow-[0_0_15px_rgba(187,154,247,0.3)] transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1f2335] border border-[#24283b] flex items-center justify-center text-[#a9b1d6] hover:text-[#f7768e] hover:border-[#f7768e] hover:shadow-[0_0_15px_rgba(247,118,142,0.3)] transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://github.com/cercvadzee07"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#1f2335] border border-[#24283b] flex items-center justify-center text-[#a9b1d6] hover:text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              {lang === "ka" ? "ნავიგაცია" : "Quick Links"}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#a9b1d6] hover:text-[#7aa2f7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "მთავარი" : "Home"}
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-[#a9b1d6] hover:text-[#7aa2f7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "კალათა" : "Cart"}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-[#a9b1d6] hover:text-[#7aa2f7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "ჩემი პროფილი" : "My Profile"}
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#a9b1d6] hover:text-[#7aa2f7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "ავტორიზაცია" : "Login / Register"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              {lang === "ka" ? "მხარდაჭერა" : "Support"}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-[#a9b1d6] hover:text-[#bb9af7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "ხშირად დასმული კითხვები" : "FAQ"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#a9b1d6] hover:text-[#bb9af7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "მიწოდების პირობები" : "Shipping Terms"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#a9b1d6] hover:text-[#bb9af7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "დაბრუნების პოლიტიკა" : "Return Policy"}
                </a>
              </li>
              <li>
                <a
                  href="contact"
                  className="text-[#a9b1d6] hover:text-[#bb9af7] hover:translate-x-1 transition-all inline-block"
                >
                  {lang === "ka" ? "კონტაქტი" : "Contact Us"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              {lang === "ka" ? "სიახლეები" : "Newsletter"}
            </h3>
            <p className="text-[#a9b1d6] text-sm mb-4">
              {lang === "ka"
                ? "გამოიწერეთ სიახლეები და მიიღეთ 10% ფასდაკლება."
                : "Subscribe to get updates and 10% discount."}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative group"
            >
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#414868] transition-colors group-focus-within:text-[#7aa2f7]"
                size={16}
              />
              <input
                type="email"
                placeholder={lang === "ka" ? "თქვენი ელ. ფოსტა" : "Your email"}
                className="w-full bg-[#1f2335] border border-[#24283b] text-white rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-[#7aa2f7] focus:shadow-[0_0_15px_rgba(122,162,247,0.2)] transition-all text-sm placeholder-[#414868]"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#7aa2f7] text-[#1a1b26] rounded-lg hover:shadow-[0_0_15px_rgba(122,162,247,0.4)] hover:scale-105 transition-all"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#24283b] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#414868] font-medium">
          <p>
            © 2026 ShopNight.
            {lang === "ka" ? "ყველა უფლება დაცულია." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-1">
            {lang === "ka" ? "შექმნილია" : "Developed by"}{" "}
            <span className="text-[#7aa2f7] font-bold">NEONDEV</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
