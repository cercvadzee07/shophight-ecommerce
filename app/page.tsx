import ProductCard from "@/components/ProductCard";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "უსადენო ყურსასმენი (Wireless Headphones)",
    price: 129.99,
    category: "ელექტრონიკა",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 2,
    title: "ჭკვიანი საათი (Smart Watch)",
    price: 199.99,
    category: "აქსესუარები",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: 3,
    title: "მინიმალისტური ზურგჩანთა (Backpack)",
    price: 59.99,
    category: "მოდა",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
  },
  {
    id: 4,
    title: "სპორტული ფეხსაცმელი (Sneakers)",
    price: 89.99,
    category: "ფეხსაცმელი",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-[#24283b] to-[#1f2335] rounded-2xl p-8 md:p-12 border border-[#414868] mb-12 shadow-2xl overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#7aa2f7]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-[#bb9af7]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-[#bb9af7]/10 text-[#bb9af7] border border-[#bb9af7]/20 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              CYBER SALE 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              კიბერპანკ და ტოკიო ნაიტ სტილის გამოცდილება
            </h1>
            <p className="mt-4 text-[#a9b1d6] text-sm md:text-base leading-relaxed">
              აღმოაჩინე უახლესი ტექნოლოგიები და ფუტურისტული აქსესუარები
              განსაკუთრებულ ნეონურ ფასებში.
            </p>
            <button className="mt-8 bg-gradient-to-r from-[#7aa2f7] to-[#bb9af7] text-[#1a1b26] font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(122,162,247,0.4)] hover:shadow-[0_0_25px_rgba(187,154,247,0.6)] transition-all">
              შოპინგის დაწყება
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-[#bb9af7] rounded-full"></span>
            გამორჩეული პროდუქტები
          </h2>
          <span className="text-sm text-[#7aa2f7] font-medium cursor-pointer hover:underline">
            ყველას ნახვა &rarr;
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
