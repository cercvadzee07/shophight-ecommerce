"use client";

export const dynamic = "force-dynamic";

import { use, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "უსადენო ყურსასმენი (Wireless Headphones)",
    price: 129.99,
    category: "ელექტრონიკა",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80",
    description:
      "პრემიუმ ხარისხის უსადენო ყურსასმენები აქტიური ხმაურის ჩახშობით (ANC) და ბატარეის ხანგრძლივი მუშაობის რესურსით (მდგრადია 40 საათამდე). იდეალურია მუსიკის მოსასმენად, პროფესიონალური ზარებისთვის და გეიმინგისთვის.",
    specs: [
      "აქტიური ხმაურის ჩახშობა (ANC)",
      "Bluetooth 5.3 მხარდაჭერა",
      "სწრაფი დატენვა (15 წთ = 5 სთ)",
      "ერგონომიული და რბილი ბალიშები",
    ],
  },
  {
    id: 2,
    title: "ჭკვიანი საათი (Smart Watch)",
    price: 199.99,
    category: "აქსესუარები",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80",
    description:
      "თანამედროვე ფიტნეს საათი ჯანმრთელობის სრული მონიტორინგის ფუნქციებით, გულისცემის, სისხლში ჟანგბადისა და ძილის ანალიზის სენსორებით. წყალგაუმტარი კორპუსი (IP68).",
    specs: [
      "AMOLED ეკრანი",
      "GPS ნავიგაცია",
      "IP68 წყალგაუმტარობა",
      "ბატარეის ხანგრძლივობა: 7 დღე",
    ],
  },
  {
    id: 3,
    title: "მინიმალისტური ზურგჩანთა (Backpack)",
    price: 59.99,
    category: "მოდა",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80",
    description:
      "წყალგაუმტარი და გამძლე მასალისგან დამზადებული კომფორტული ზურგჩანთა ლეპტოპის სპეციალური დაცული განყოფილებით (15.6 ინჩამდე).",
    specs: [
      'ლეპტოპის განყოფილება (15.6")',
      "წყალგაუმტარი ქსოვილი",
      "ორთოპედიული ზურგი",
      "უსაფრთხო ფარული ჯიბეები",
    ],
  },
  {
    id: 4,
    title: "სპორტული ფეხსაცმელი (Sneakers)",
    price: 89.99,
    category: "ფეხსაცმელი",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80",
    description:
      "მსუბუქი, სუნთქავი და ელასტიური სპორტული ფეხსაცმელი მაქსიმალური კომფორტისთვის ყოველდღიური აქტივობებისა და ვარჯიშის დროს.",
    specs: [
      "სუნთქავი ბადისებრი ზედაპირი",
      "ამორტიზაციის სისტემა",
      "მსუბუქი და მოქნილი ძირი",
      "უნივერსალური დიზაინი",
    ],
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          პროდუქტი ვერ მოიძებნა
        </h2>
        <Link
          href="/"
          className="text-[#7aa2f7] hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={18} /> მთავარ გვერდზე დაბრუნება
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#7aa2f7] hover:underline mb-6 text-sm font-medium"
      >
        <ArrowLeft size={16} /> უკან მთავარზე
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Product Image - Left Side (7 columns) */}
        <div className="lg:col-span-7 bg-[#24283b] rounded-3xl overflow-hidden border border-[#414868] shadow-2xl p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] sm:h-[550px] object-cover rounded-2xl"
          />
        </div>

        {/* Product Details - Right Side (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-start bg-[#1f2335] p-6 sm:p-8 rounded-3xl border border-[#24283b] shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="bg-[#bb9af7]/10 text-[#bb9af7] border border-[#bb9af7]/20 text-xs font-semibold px-3 py-1 rounded-full uppercase">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-[#a9b1d6] ml-1 text-xs">(4.9)</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {product.title}
          </h1>
          <div className="text-3xl font-bold text-[#9ece6a] mb-6">
            ${product.price}
          </div>

          <p className="text-[#a9b1d6] leading-relaxed mb-6 text-sm sm:text-base border-b border-[#24283b] pb-6">
            {product.description}
          </p>

          {/* Specs List */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              ძირითადი მახასიათებლები:
            </h3>
            <ul className="space-y-2">
              {product.specs.map((spec, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-[#c0caf5]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2f7]"></span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg text-sm sm:text-base ${
              added
                ? "bg-[#9ece6a] text-[#1a1b26]"
                : "bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-[#1a1b26] hover:shadow-[0_0_20px_rgba(122,162,247,0.5)]"
            }`}
          >
            {added ? (
              <>
                <Check size={20} /> დამატებულია კალათაში
              </>
            ) : (
              <>
                <ShoppingCart size={20} /> კალათაში დამატება
              </>
            )}
          </button>

          {/* Extra Info Icons */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#24283b] text-center">
            <div className="flex flex-col items-center text-xs text-[#a9b1d6]">
              <Truck size={20} className="text-[#7aa2f7] mb-1" />
              <span>სწრაფი მიწოდება</span>
            </div>
            <div className="flex flex-col items-center text-xs text-[#a9b1d6]">
              <ShieldCheck size={20} className="text-[#9ece6a] mb-1" />
              <span>ოფიციალური გარანტია</span>
            </div>
            <div className="flex flex-col items-center text-xs text-[#a9b1d6]">
              <RotateCcw size={20} className="text-[#bb9af7] mb-1" />
              <span>14 დღიანი დაბრუნება</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
