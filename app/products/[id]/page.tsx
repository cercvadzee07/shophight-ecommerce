"use client";

import { use, useState, useEffect, Suspense } from "react";
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
import { PRODUCTS } from "@/data/products";

function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = PRODUCTS.find((p) => p.id === productId);

  const addItem = useCartStore((state) => state.addItem);
  const { lang } = useLangStore();
  const [added, setAdded] = useState(false);

  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor(null);
      }

      if (product.sizes && product.sizes.length > 0) {
        const firstSize = product.sizes[0];
        if (typeof firstSize === "string") {
          setSelectedSize({ label: firstSize, priceModifier: 0 });
        } else {
          setSelectedSize(firstSize);
        }
      } else {
        setSelectedSize(null);
      }
    }
  }, [product]);

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

  // დინამიკური ფასის გამოთვლა
  const activePriceModifier = selectedSize?.priceModifier || 0;
  const currentTotalPrice = Number(
    (product.price + activePriceModifier).toFixed(2),
  );

  const handleAddToCart = () => {
    const colorLabel = selectedColor
      ? lang === "ka"
        ? selectedColor.nameKa
        : selectedColor.nameEn
      : "";

    const sizeLabel = selectedSize?.label || "";

    const variantId = `${product.id}${selectedColor ? `-${selectedColor.hex}` : ""}${sizeLabel ? `-${sizeLabel}` : ""}`;
    const variantTitle = `${product.title}${sizeLabel ? ` (${sizeLabel})` : ""}${colorLabel ? ` • ${colorLabel}` : ""}`;

    const cartProduct = {
      ...product,
      id: variantId,
      title: variantTitle,
      price: currentTotalPrice,
      selectedColor: colorLabel || undefined,
      selectedSize: sizeLabel || undefined,
      specs: product.specs.map((s) => `${s.label}: ${s.value}`),
    };

    addItem(cartProduct as any);
    setAdded(true);
    toast.success(
      lang === "ka"
        ? `დაემატა კალათაში ($${currentTotalPrice.toFixed(2)})!`
        : `Added to cart ($${currentTotalPrice.toFixed(2)})!`,
    );
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
        {/* სურათი */}
        <div className="bg-[#1f2335]/90 backdrop-blur-xl rounded-3xl border border-[#24283b] p-3 shadow-xl h-[450px] sm:h-[500px]">
          <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#16161e]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2335] via-transparent to-transparent opacity-40"></div>
          </div>
        </div>

        {/* მთავარი ინფორმაცია და მოდიფიკაციები */}
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
              <span className="text-[#a9b1d6] ml-2 font-semibold">
                ({product.rating})
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-4 leading-tight">
            {product.title}
          </h1>

          {/* ანიმირებული დინამიკური ფასი */}
          <div className="flex items-baseline gap-3 mb-6">
            <motion.div
              key={currentTotalPrice}
              initial={{ scale: 1.15, color: "#7dcfff" }}
              animate={{ scale: 1, color: "#9ece6a" }}
              transition={{ duration: 0.25 }}
              className="text-4xl font-black drop-shadow-[0_0_15px_rgba(158,206,106,0.2)]"
            >
              ₾{currentTotalPrice.toFixed(2)}
            </motion.div>

            {activePriceModifier > 0 && (
              <span className="text-xs font-bold text-[#bb9af7] bg-[#bb9af7]/15 border border-[#bb9af7]/30 px-2.5 py-1 rounded-lg">
                +${activePriceModifier}{" "}
                {lang === "ka" ? "არჩეული მოდიფიკაცია" : "Selected Spec"}
              </span>
            )}
          </div>

          <p className="text-[#a9b1d6] leading-relaxed mb-6 text-base border-b border-[#24283b] pb-6">
            {lang === "ka" ? product.descriptionKa : product.descriptionEn}
          </p>

          {/* ფერების შერჩევა */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider block mb-3">
                {lang === "ka" ? "ფერი" : "Color"}:{" "}
                <span className="text-white font-normal normal-case ml-1">
                  {lang === "ka"
                    ? selectedColor?.nameKa
                    : selectedColor?.nameEn}
                </span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => {
                  const isSelected = selectedColor?.hex === c.hex;
                  return (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer border-2 ${
                        isSelected
                          ? "border-white scale-110 shadow-[0_0_15px_rgba(122,162,247,0.5)]"
                          : "border-[#24283b] opacity-75 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={lang === "ka" ? c.nameKa : c.nameEn}
                    >
                      {isSelected && (
                        <Check
                          size={16}
                          className={
                            c.hex === "#16161e" ||
                            c.hex === "#1a1b26" ||
                            c.hex === "#1f2335"
                              ? "text-white"
                              : "text-[#16161e]"
                          }
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ზომა / პარამეტრი ფასის მატების ინდიკატორით */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="text-xs font-bold text-[#7aa2f7] uppercase tracking-wider block mb-3">
                {lang === "ka" ? "ზომა / მეხსიერება" : "Size / Memory Option"}
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((s: any, idx: number) => {
                  const label = typeof s === "string" ? s : s.label;
                  const modifier = typeof s === "string" ? 0 : s.priceModifier;
                  const isSelected = selectedSize?.label === label;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setSelectedSize({ label, priceModifier: modifier })
                      }
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border flex items-center gap-2 ${
                        isSelected
                          ? "bg-[#7aa2f7] text-[#1a1b26] border-[#7aa2f7] shadow-[0_0_12px_rgba(122,162,247,0.4)]"
                          : "bg-[#1f2335] text-[#a9b1d6] border-[#24283b] hover:border-[#414868] hover:text-white"
                      }`}
                    >
                      <span>{label}</span>
                      {modifier > 0 && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                            isSelected
                              ? "bg-[#1a1b26]/30 text-[#1a1b26] font-black"
                              : "bg-[#9ece6a]/15 text-[#9ece6a]"
                          }`}
                        >
                          +${modifier}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ღილაკი და უპირატესობები */}
          <div className="mt-auto space-y-6 pt-2">
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
                  {lang === "ka"
                    ? `დამატება • $${currentTotalPrice.toFixed(2)}`
                    : `Add to Cart • $${currentTotalPrice.toFixed(2)}`}
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
