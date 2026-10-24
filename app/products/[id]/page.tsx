"use client";

import { use, useState, Suspense } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useLangStore } from "@/store/useLangStore";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Info,
} from "lucide-react";
import toast from "react-hot-toast";
import RelatedProducts from "@/components/RelatedProducts";

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
      { label: "ხმაურის ჩახშობა", value: "აქტიური (ANC)" },
      { label: "კავშირი", value: "Bluetooth 5.3" },
      { label: "ელემენტი", value: "40 საათამდე" },
      { label: "სწრაფი დატენვა", value: "15 წთ = 5 სთ" },
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
      { label: "ეკრანი", value: "AMOLED" },
      { label: "ნავიგაცია", value: "GPS" },
      { label: "დაცვა", value: "IP68 წყალგაუმტარი" },
      { label: "ელემენტი", value: "7 დღემდე" },
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
      { label: "ლეპტოპის ზომა", value: "15.6 ინჩამდე" },
      { label: "მასალა", value: "წყალგაუმტარი ქსოვილი" },
      { label: "ზურგი", value: "ორთოპედიული" },
      { label: "ჯიბეები", value: "უსაფრთხო/ფარული" },
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
      { label: "ზედაპირი", value: "სუნთქავი ბადე" },
      { label: "ძირი", value: "ამორტიზირებული" },
      { label: "წონა", value: "მსუბუქი" },
      { label: "დანიშნულება", value: "სპორტი/ყოველდღიური" },
    ],
  },
];

function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  const addItem = useCartStore((state) => state.addItem);
  const { lang } = useLangStore();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-white mb-4">
          {lang === "ka" ? "პროდუქტი ვერ მოიძებნა" : "Product not found"}
        </h2>
        <Link
          href="/"
          className="text-[#7aa2f7] hover:underline flex items-center gap-2 bg-[#1f2335] px-5 py-2.5 rounded-xl border border-[#24283b] transition-all hover:border-[#7aa2f7] text-sm"
        >
          <ArrowLeft size={16} />{" "}
          {lang === "ka" ? "მთავარ გვერდზე დაბრუნება" : "Back to Home"}
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // ვაწვდით string მასივს, რადგან CartStore ასე ელოდება (თუ საჭიროა, აქ მარტივად ვაკონვერტირებთ)
    const cartProduct = {
      ...product,
      specs: product.specs.map((s) => `${s.label}: ${s.value}`),
    };

    addItem(cartProduct as any);
    setAdded(true);
    toast.success(lang === "ka" ? "დაემატა კალათაში!" : "Added to cart!");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#7aa2f7] hover:underline mb-8 text-sm font-medium transition-colors hover:text-[#bb9af7]"
      >
        <ArrowLeft size={16} />{" "}
        {lang === "ka" ? "უკან დაბრუნება" : "Back to Products"}
      </Link>

      {/* ძირითადი ზედა სექცია: სურათი და მთავარი ინფო */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
        {/* სურათი */}
        <div className="bg-[#1f2335]/90 backdrop-blur-xl rounded-3xl border border-[#24283b] p-3 shadow-xl h-[450px]">
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#16161e]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2335] via-transparent to-transparent opacity-40"></div>
          </div>
        </div>

        {/* მთავარი ინფორმაცია და ყიდვის ღილაკი */}
        <div className="flex flex-col h-full py-2">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-[#bb9af7]/10 text-[#bb9af7] border border-[#bb9af7]/20 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#e0af68] text-sm">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-[#a9b1d6] ml-2 font-semibold">(4.9)</span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="text-4xl font-black text-[#9ece6a] mb-6 drop-shadow-[0_0_15px_rgba(158,206,106,0.2)]">
            ${product.price}
          </div>

          <p className="text-[#a9b1d6] leading-relaxed mb-8 text-base border-b border-[#24283b] pb-8">
            {product.description}
          </p>

          <div className="mt-auto space-y-6">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer text-base ${
                added
                  ? "bg-[#9ece6a] text-[#1a1b26] shadow-[0_0_15px_rgba(158,206,106,0.3)]"
                  : "bg-[#7aa2f7] text-[#1a1b26] hover:scale-[1.01] shadow-[0_0_15px_rgba(122,162,247,0.2)]"
              }`}
            >
              {added ? (
                <>
                  <Check size={20} /> {lang === "ka" ? "კალათაშია" : "Added"}
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />{" "}
                  {lang === "ka" ? "კალათაში დამატება" : "Add to Cart"}
                </>
              )}
            </button>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-xs text-[#a9b1d6]">
                <div className="p-2 bg-[#1a1b26] rounded-lg text-[#7aa2f7]">
                  <Truck size={18} />
                </div>
                <span>
                  {lang === "ka" ? "სწრაფი მიწოდება" : "Fast Delivery"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#a9b1d6]">
                <div className="p-2 bg-[#1a1b26] rounded-lg text-[#9ece6a]">
                  <ShieldCheck size={18} />
                </div>
                <span>
                  {lang === "ka" ? "1 წლიანი გარანტია" : "1 Year Warranty"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#a9b1d6]">
                <div className="p-2 bg-[#1a1b26] rounded-lg text-[#bb9af7]">
                  <RotateCcw size={18} />
                </div>
                <span>
                  {lang === "ka" ? "მარტივი დაბრუნება" : "Easy Returns"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ქვედა სექცია: დეტალური მახასიათებლები (Specs) */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Info className="text-[#7aa2f7]" size={24} />
          {lang === "ka"
            ? "ტექნიკური მახასიათებლები"
            : "Technical Specifications"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {product.specs.map((spec, index) => (
            <div
              key={index}
              className="bg-[#1f2335]/90 backdrop-blur-xl p-5 rounded-2xl border border-[#24283b] hover:border-[#414868] transition-colors flex flex-col justify-center"
            >
              <span className="text-xs text-[#7aa2f7] font-bold uppercase tracking-wider mb-2">
                {spec.label}
              </span>
              <span className="text-base text-white font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </motion.div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#7aa2f7] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
