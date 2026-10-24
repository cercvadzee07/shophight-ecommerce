"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import { DICTIONARY } from "@/utils/dictionary";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const GEORGIAN_CITIES = [
  "თბილისი",
  "ბათუმი",
  "ქუთაისი",
  "რუსთავი",
  "გორი",
  "ზუგდიდი",
  "ფოთი",
  "ქობულეთი",
  "თელავი",
  "ახალციხე",
];

export default function CheckoutPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { items, clearCart } = useCartStore();
  const { lang } = useLangStore();
  const t = DICTIONARY[lang];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState(GEORGIAN_CITIES[0]);
  const [phone, setPhone] = useState("+995 ");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [note, setNote] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+995 ")) {
      val = "+995 " + val.replace(/^\+995\s*/, "");
    }
    setPhone(val);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 3) {
      val = val.slice(0, 2) + "/" + val.slice(2);
    }
    setCardExpiry(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      phone.length < 9 ||
      cardNumber.length < 19 ||
      cardExpiry.length < 5 ||
      cardCvv.length < 3
    ) {
      toast.error(
        lang === "ka"
          ? "გთხოვთ შეავსოთ ყველა სავალდებულო ველი სწორად!"
          : "Please fill in all required fields correctly!",
      );
      return;
    }

    setIsSuccess(true);
    clearCart();
    toast.success(
      lang === "ka"
        ? "შეკვეთა წარმატებით განთავსდა!"
        : "Order placed successfully!",
    );
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#1f2335]/90 backdrop-blur-xl p-10 rounded-3xl border border-[#24283b] shadow-2xl"
        >
          <CheckCircle2 size={64} className="mx-auto text-[#9ece6a] mb-6" />
          <h1 className="text-3xl font-extrabold text-white mb-4">
            {lang === "ka"
              ? "მადლობა შეკვეთისთვის!"
              : "Thank you for your order!"}
          </h1>
          <p className="text-[#a9b1d6] mb-8">
            {lang === "ka"
              ? "თქვენი შეკვეთა წარმატებით მიღებულია და მზადდება გამოსაგზავნად."
              : "Your order has been successfully placed and is being prepared."}
          </p>
          <Link
            href="/"
            className="inline-block bg-[#7aa2f7] text-[#1a1b26] font-bold px-8 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:scale-105 transition-all"
          >
            {lang === "ka" ? "მთავარ გვერდზე დაბრუნება" : "Back to Home"}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[#7aa2f7] hover:underline text-sm font-medium"
        >
          <ArrowLeft size={16} />{" "}
          {lang === "ka" ? "კალათაში დაბრუნება" : "Back to Cart"}
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#1f2335] rounded-2xl border border-[#24283b] text-[#7aa2f7]">
          <CreditCard size={28} />
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          {lang === "ka" ? "შეკვეთის გაფორმება" : "Checkout"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ფორმა */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-[#1f2335]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#24283b] space-y-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {lang === "ka"
                ? "საკონტაქტო და მისამართის ინფორმაცია"
                : "Shipping Information"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                  {lang === "ka" ? "სახელი" : "First Name"}
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={lang === "ka" ? "მაგ: ბექა" : "e.g. John"}
                  required
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                  {lang === "ka" ? "გვარი" : "Last Name"}
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={lang === "ka" ? "მაგ: წერეთელი" : "e.g. Doe"}
                  required
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                  {lang === "ka" ? "ქალაქი" : "City"}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors"
                >
                  {GEORGIAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                  {lang === "ka" ? "ტელეფონის ნომერი" : "Phone Number"}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                {lang === "ka"
                  ? "დამატებითი ინფორმაცია (არასავალდებულო)"
                  : "Additional Notes (Optional)"}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={
                  lang === "ka"
                    ? "სადარბაზო, სართული, დომოფონის კოდი..."
                    : "Apartment, floor, instructions..."
                }
                rows={3}
                className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* ბარათის დეტალები */}
          <div className="bg-[#1f2335]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-[#24283b] space-y-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="text-[#9ece6a]" size={22} />
              {lang === "ka" ? "გადახდის დეტალები" : "Payment Details"}
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                {lang === "ka" ? "ბარათის ნომერი" : "Card Number"}
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="4532 •••• •••• ••••"
                maxLength={19}
                required
                className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors font-mono tracking-wider"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                  {lang === "ka" ? "მოქმედების ვადა" : "Expiry Date"}
                </label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors font-mono text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#a9b1d6] mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  value={cardCvv}
                  onChange={(e) =>
                    setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                  }
                  placeholder="123"
                  maxLength={3}
                  required
                  className="w-full bg-[#1a1b26] border border-[#414868] text-white rounded-2xl py-3 px-4 focus:outline-none focus:border-[#7aa2f7] transition-colors font-mono text-center"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7aa2f7] text-[#1a1b26] font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:scale-[1.01] transition-all cursor-pointer text-lg"
          >
            {lang === "ka"
              ? `გადახდა $${total.toFixed(2)}`
              : `Pay $${total.toFixed(2)}`}
          </button>
        </form>

        {/* კალათის მიმოხილვა შეკვეთის გვერდზე */}
        <div className="bg-[#1f2335]/90 backdrop-blur-xl p-6 rounded-3xl border border-[#24283b] h-fit space-y-6">
          <h2 className="text-xl font-bold text-white">
            {lang === "ka" ? "შეკვეთის მიმოხილვა" : "Order Overview"}
          </h2>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover bg-[#16161e]"
                  />
                  <div>
                    <span className="text-white font-semibold line-clamp-1">
                      {item.title}
                    </span>
                    <span className="text-[#a9b1d6] text-xs">
                      x{item.quantity}
                    </span>
                  </div>
                </div>
                <span className="text-[#9ece6a] font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm text-[#a9b1d6] border-t border-[#24283b] pt-4">
            <div className="flex justify-between">
              <span>{lang === "ka" ? "პროდუქტები" : "Subtotal"}</span>
              <span className="text-white font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{lang === "ka" ? "მიწოდება" : "Shipping"}</span>
              <span className="text-white font-semibold">
                ${shipping.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold text-white border-t border-[#24283b] pt-4">
            <span>{lang === "ka" ? "სულ ჯამში" : "Total"}</span>
            <span className="text-[#9ece6a] text-2xl">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
