"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = items.length > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-[#24283b] rounded-full flex items-center justify-center text-[#7aa2f7] mb-6 shadow-xl border border-[#414868]">
          <ShoppingBag size={36} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          თქვენი კალათა ცარიელია
        </h2>
        <p className="text-[#a9b1d6] max-w-sm mb-8 text-sm">
          ჯერ არაფერი დაგიმატებიათ კალათაში. გადადით მთავარ გვერდზე და
          აღმოაჩინეთ საუკეთესო პროდუქტები.
        </p>
        <Link
          href="/"
          className="bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-[#1a1b26] font-bold px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(122,162,247,0.3)] hover:shadow-[0_0_20px_rgba(187,154,247,0.5)] transition-all flex items-center gap-2"
        >
          <ArrowLeft size={18} /> შოპინგის დაწყება
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-8 flex items-center gap-3">
        <span className="w-2.5 h-8 bg-[#bb9af7] rounded-full"></span>
        შენი კალათა
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1a1b26] border border-[#24283b] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-xl bg-[#24283b] border border-[#414868]"
              />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-[#bb9af7] uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-medium text-base mt-1 line-clamp-1">
                  {item.title}
                </h3>
                <span className="text-[#9ece6a] font-bold text-lg mt-2 block">
                  ${item.price}
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-[#24283b] px-3 py-1.5 rounded-xl border border-[#414868]">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-[#7aa2f7] hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white font-bold w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-[#7aa2f7] hover:text-white transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-[#f7768e] hover:text-red-400 p-2 transition-colors bg-[#24283b] rounded-xl border border-[#414868]"
                title="წაშლა"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-xs text-[#f7768e] hover:underline mt-2 inline-block font-medium"
          >
            კალათის გასუფთავება
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-[#1a1b26] border border-[#24283b] rounded-2xl p-6 shadow-xl h-fit">
          <h3 className="text-lg font-bold text-white mb-6 border-b border-[#24283b] pb-4">
            შეკვეთის დეტალები
          </h3>
          <div className="space-y-4 text-sm text-[#a9b1d6]">
            <div className="flex justify-between">
              <span>პროდუქტების ღირებულება</span>
              <span className="text-white font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>მიწოდება</span>
              <span className="text-white font-semibold">
                ${shipping.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-[#24283b] pt-4 flex justify-between text-base font-bold text-white">
              <span>სულ ჯამში</span>
              <span className="text-[#9ece6a] text-xl">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => alert("გადახდის სიმულაცია წარმატებით განხორციელდა!")}
            className="w-full mt-8 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-[#1a1b26] font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:shadow-[0_0_25px_rgba(187,154,247,0.6)] transition-all cursor-pointer"
          >
            შეკვეთის გაფორმება
          </button>
        </div>
      </div>
    </div>
  );
}
