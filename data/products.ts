export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductColor {
  nameKa: string;
  nameEn: string;
  hex: string;
}

export interface ProductSizeOption {
  label: string;
  priceModifier: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  categorySlug: string;
  image: string;
  rating: number;
  reviewsCount: number;
  descriptionKa: string;
  descriptionEn: string;
  specs: ProductSpec[];
  colors?: ProductColor[];
  sizes?: (string | ProductSizeOption)[];
  inStock: boolean;
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "ჭკვიანი საათი (Smart Watch Neo)",
    price: 199.99,
    category: "აქსესუარები",
    categorySlug: "wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80",
    rating: 4.9,
    reviewsCount: 38,
    descriptionKa:
      "თანამედროვე ფიტნეს საათი AMOLED ეკრანით, გულისცემის, სისხლში ჟანგბადისა და ძილის ანალიზის სენსორებით. წყალგაუმტარი კორპუსი (IP68).",
    descriptionEn:
      "Modern fitness watch with AMOLED display, comprehensive health tracking, heart rate, SpO2, and IP68 waterproof chassis.",
    colors: [
      { nameKa: "ტიტანი", nameEn: "Titanium Silver", hex: "#9aa5ce" },
      { nameKa: "მუქი ღამე", nameEn: "Midnight Black", hex: "#1a1b26" },
    ],
    sizes: [
      { label: "40mm", priceModifier: 0 },
      { label: "44mm", priceModifier: 20 },
      { label: "46mm", priceModifier: 40 },
    ],
    specs: [
      { label: "ეკრანი", value: '1.43" AMOLED' },
      { label: "ნავიგაცია", value: "Dual GPS" },
      { label: "დაცვა", value: "IP68 / 5 ATM" },
      { label: "ელემენტი", value: "7 დღემდე" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: "უსადენო ყურსასმენი (Cyber ANC)",
    price: 129.99,
    category: "ელექტრონიკა",
    categorySlug: "audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80",
    rating: 4.8,
    reviewsCount: 54,
    descriptionKa:
      "პრემიუმ ხარისხის უსადენო ყურსასმენები აქტიური ხმაურის ჩახშობით (ANC) და ბატარეის 40-საათიანი მუშაობის რესურსით.",
    descriptionEn:
      "Premium wireless headphones with Active Noise Cancellation (ANC) and up to 40 hours of playback time.",
    colors: [
      { nameKa: "კიბერ შავი", nameEn: "Cyber Black", hex: "#16161e" },
      { nameKa: "ნეონ ლურჯი", nameEn: "Neon Blue", hex: "#7aa2f7" },
      { nameKa: "ტოკიო იისფერი", nameEn: "Tokyo Violet", hex: "#bb9af7" },
    ],
    specs: [
      { label: "ხმაურის ჩახშობა", value: "Hybrid ANC 42dB" },
      { label: "კავშირი", value: "Bluetooth 5.3" },
      { label: "ელემენტი", value: "40 საათამდე" },
      { label: "დატენვა", value: "Type-C Fast Charge" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 3,
    title: "მექანიკური კლავიატურა (RGB Matrix)",
    price: 149.99,
    category: "გეიმინგი",
    categorySlug: "gaming",
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&q=80",
    rating: 5.0,
    reviewsCount: 42,
    descriptionKa:
      "75% კომპაქტური მექანიკური კლავიატურა ცხელი ჩანაცვლების (Hot-Swap) სვიჩებით, PBT ღილაკებით და სრული RGB განათებით.",
    descriptionEn:
      "75% compact mechanical keyboard with Hot-Swappable switches, durable PBT keycaps, and customizable per-key RGB.",
    colors: [
      { nameKa: "მუქი რუხი", nameEn: "Dark Slate", hex: "#1f2335" },
      { nameKa: "ნეონ ცისფერი", nameEn: "Cyan Glow", hex: "#7dcfff" },
    ],
    sizes: [
      { label: "Red Linear Switch", priceModifier: 0 },
      { label: "Brown Tactile Switch", priceModifier: 15 },
    ],
    specs: [
      { label: "სვიჩები", value: "Pre-lubed Mechanical" },
      { label: "კავშირი", value: "Tri-Mode (BT / 2.4G / Type-C)" },
      { label: "ქეისის მასალა", value: "CNC ალუმინი" },
      { label: "ელემენტი", value: "4000 mAh" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 4,
    title: "ულტრამსუბუქი გეიმინგ მაუსი (Viper Neon)",
    price: 79.99,
    category: "გეიმინგი",
    categorySlug: "gaming",
    image:
      "https://images.unsplash.com/photo-1527814050087-379381547939?w=1000&q=80",
    rating: 4.7,
    reviewsCount: 29,
    descriptionKa:
      "58 გრამიანი ულტრამსუბუქი უსადენო მაუსი 26,000 DPI ოპტიკური სენსორით და 1000Hz გამოკითხვის სიხშირით.",
    descriptionEn:
      "58g ultra-lightweight wireless mouse equipped with 26k DPI optical sensor and PTFE mouse feet.",
    colors: [
      { nameKa: "შავი მქრქალი", nameEn: "Matte Black", hex: "#16161e" },
      { nameKa: "ტოკიო თეთრი", nameEn: "Pure White", hex: "#c0caf5" },
    ],
    specs: [
      { label: "სენსორი", value: "PixArt PAW3395 (26,000 DPI)" },
      { label: "წონა", value: "58 გრამი" },
      { label: "სვიჩები", value: "Optical 80M Clicks" },
      { label: "ელემენტი", value: "80 საათი" },
    ],
    inStock: true,
  },
  {
    id: 5,
    title: "მინიმალისტური ზურგჩანთა (Urban Pack)",
    price: 59.99,
    category: "მოდა",
    categorySlug: "lifestyle",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80",
    rating: 4.6,
    reviewsCount: 19,
    descriptionKa:
      "წყალგაუმტარი და გამძლე მასალისგან დამზადებული ერგონომიული ზურგჩანთა 16-ინჩიანი ლეპტოპის დაცული განყოფილებით.",
    descriptionEn:
      'Water-resistant, ergonomic commuter backpack with cushioned compartment fit for up to 16" laptops.',
    colors: [
      { nameKa: "მუქი ლურჯი", nameEn: "Deep Navy", hex: "#1f2335" },
      { nameKa: "გრაფიტი", nameEn: "Graphite", hex: "#24283b" },
    ],
    sizes: [
      { label: "18L", priceModifier: 0 },
      { label: "22L", priceModifier: 15 },
    ],
    specs: [
      { label: "ლეპტოპის ზომა", value: "16 ინჩამდე" },
      { label: "მასალა", value: "Cordura 500D Ballistic" },
      { label: "ელვა-შესაკრავი", value: "YKK Waterproof" },
      { label: "წონა", value: "850 გრ" },
    ],
    inStock: true,
  },
  {
    id: 6,
    title: "სპორტული ფეხსაცმელი (Cyber Runner)",
    price: 89.99,
    category: "ფეხსაცმელი",
    categorySlug: "lifestyle",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=80",
    rating: 4.8,
    reviewsCount: 65,
    descriptionKa:
      "მსუბუქი, სუნთქვადი ბადისებრი სპორტული ფეხსაცმელი რბილი ამორტიზაციით და კიბერპანკ ფერთა აქცენტებით.",
    descriptionEn:
      "Lightweight and breathable athletic sneakers with ultra-cushioned responsive soles and neon styling.",
    colors: [
      { nameKa: "ალისფერი", nameEn: "Crimson Red", hex: "#f7768e" },
      { nameKa: "ნეონ მწვანე", nameEn: "Neon Green", hex: "#9ece6a" },
      { nameKa: "კიბერ შავი", nameEn: "Cyber Black", hex: "#16161e" },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    specs: [
      { label: "ზედაპირი", value: "Breathable Prime Knit" },
      { label: "ძირი", value: "EVA Soft Cushioning" },
      { label: "დანიშნულება", value: "სირბილი / ყოველდღიური" },
    ],
    inStock: true,
  },
  {
    id: 7,
    title: "გეიმინგ ლეპტოპი (ROG Strix 16)",
    price: 1899.99,
    category: "ელექტრონიკა",
    categorySlug: "laptops",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1000&q=80",
    rating: 4.9,
    reviewsCount: 15,
    descriptionKa:
      "მძლავრი გეიმინგ ლეპტოპი 16-ინჩიანი 240Hz QHD ეკრანით, Intel Core i9 პროცესორითა და RTX 4080 გრაფიკით.",
    descriptionEn:
      'High-end gaming laptop featuring 16" 240Hz QHD display, Intel Core i9-14900HX, and NVIDIA GeForce RTX 4080.',
    sizes: [
      { label: "16GB RAM / 1TB SSD", priceModifier: 0 },
      { label: "32GB RAM / 2TB SSD", priceModifier: 250 },
    ],
    specs: [
      { label: "პროცესორი", value: "Intel Core i9-14900HX" },
      { label: "ვიდეობარათი", value: "NVIDIA RTX 4080 12GB" },
      { label: "ოპერატიული", value: "32GB DDR5 5600MHz" },
      { label: "მეხსიერება", value: "1TB PCIe 4.0 NVMe" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 8,
    title: "სმარტფონი (Cyber Phone Ultra)",
    price: 1099.99,
    category: "ელექტრონიკა",
    categorySlug: "smartphones",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1000&q=80",
    rating: 4.7,
    reviewsCount: 88,
    descriptionKa:
      "ფლაგმანური სმარტფონი ტიტანის ჩარჩოთი, 200MP კამერით, 120Hz LTPO ეკრანითა და 5000 mAh ბატარეით.",
    descriptionEn:
      "Flagship smartphone featuring titanium frame, 200MP pro-grade camera, LTPO AMOLED, and 100W fast charging.",
    colors: [
      { nameKa: "ტიტანის რუხი", nameEn: "Titanium Gray", hex: "#414868" },
      { nameKa: "შავი ობსიდიანი", nameEn: "Obsidian Black", hex: "#16161e" },
    ],
    sizes: [
      { label: "256GB", priceModifier: 0 },
      { label: "512GB", priceModifier: 150 },
      { label: "1TB", priceModifier: 300 },
    ],
    specs: [
      { label: "ეკრანი", value: '6.8" Dynamic AMOLED 2X' },
      { label: "ჩიპსეტი", value: "Snapdragon 8 Gen 3" },
      { label: "კამერა", value: "200MP + 50MP + 12MP" },
      { label: "ელემენტი", value: "5000 mAh (100W)" },
    ],
    inStock: true,
  },
  {
    id: 9,
    title: "პორტატული დინამიკი (BoomBox 360)",
    price: 119.99,
    category: "ელექტრონიკა",
    categorySlug: "audio",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80",
    rating: 4.8,
    reviewsCount: 31,
    descriptionKa:
      "360-გრადუსიანი ძლიერი ბასი, წყალგაუმტარი IPX7 კორპუსი და 24 საათიანი უწყვეტი დაკვრა.",
    descriptionEn:
      "Rugged portable Bluetooth speaker with deep 360-degree sound, IPX7 waterproof housing, and 24h battery life.",
    colors: [
      { nameKa: "კიბერ შავი", nameEn: "Cyber Black", hex: "#1a1b26" },
      { nameKa: "ნეონ ლურჯი", nameEn: "Electric Blue", hex: "#7aa2f7" },
    ],
    specs: [
      { label: "სიმძლავრე", value: "40W RMS" },
      { label: "დაცვა", value: "IPX7 Waterproof" },
      { label: "ელემენტი", value: "24 საათი" },
      { label: "კავშირი", value: "Bluetooth 5.3 / AUX" },
    ],
    inStock: true,
  },
  {
    id: 10,
    title: 'გეიმინგ მონიტორი (Curved 34" 175Hz)',
    price: 649.99,
    category: "გეიმინგი",
    categorySlug: "gaming",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1000&q=80",
    rating: 4.9,
    reviewsCount: 22,
    descriptionKa:
      "34-ინჩიანი ულტრაგანიერი მოხრილი QD-OLED მონიტორი, 175Hz განახლების სიხშირით და 0.03ms რეაგირების დროით.",
    descriptionEn:
      "34-inch ultrawide curved QD-OLED gaming monitor with 175Hz refresh rate and lightning-fast 0.03ms response.",
    specs: [
      { label: "რეზოლუცია", value: "UWQHD 3440 x 1440" },
      { label: "განახლება", value: "175Hz QD-OLED" },
      { label: "რკალი", value: "1800R Curved" },
      { label: "პორტები", value: "DP 1.4, HDMI 2.1, USB-C" },
    ],
    inStock: true,
  },
  {
    id: 11,
    title: "უსადენო დამტენი სადგური (3-in-1 MagCharge)",
    price: 49.99,
    category: "აქსესუარები",
    categorySlug: "smartphones",
    image:
      "https://images.unsplash.com/photo-1622445262464-84b14e3245b3?w=1000&q=80",
    rating: 4.5,
    reviewsCount: 18,
    descriptionKa:
      "მაგნიტური დამტენი სადგური ტელეფონის, ჭკვიანი საათისა და ყურსასმენების ერთდროული სწრაფი დამუხტვისთვის.",
    descriptionEn:
      "Foldable 3-in-1 magnetic wireless charging stand for fast charging iPhone, Apple Watch, and AirPods at once.",
    colors: [
      { nameKa: "კოსმიური რუხი", nameEn: "Space Gray", hex: "#24283b" },
      { nameKa: "შავი", nameEn: "Night Black", hex: "#16161e" },
    ],
    specs: [
      { label: "სიმძლავრე", value: "15W MagSafe + 5W + 3W" },
      { label: "მასალა", value: "თუთიის შენადნობი" },
      { label: "შესაერთებელი", value: "USB-C PD 3.0" },
    ],
    inStock: true,
  },
  {
    id: 12,
    title: "პროფესიონალური ვებკამერა (StreamCam 4K)",
    price: 159.99,
    category: "ელექტრონიკა",
    categorySlug: "laptops",
    image:
      "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=1000&q=80",
    rating: 4.6,
    reviewsCount: 27,
    descriptionKa:
      "4K 60FPS ვებკამერა Sony Starvis სენსორით, ხელოვნური ინტელექტის ავტოფოკუსით და ორმაგი მიკროფონით.",
    descriptionEn:
      "Ultra HD 4K 60FPS webcam engineered for streaming, creators, and remote pros with Sony Starvis CMOS sensor.",
    specs: [
      { label: "გაფართოება", value: "4K UHD @ 60 FPS" },
      { label: "სენსორი", value: 'Sony Starvis 1/2.8"' },
      { label: "ხედვის კუთხე", value: "65° / 78° / 90° FOV" },
      { label: "ინტერფეისი", value: "USB 3.0 Type-C" },
    ],
    inStock: true,
  },
  {
    id: 13,
    title: "სტუდიური კონდენსატორული მიკროფონი (NeonCast)",
    price: 139.99,
    category: "ელექტრონიკა",
    categorySlug: "audio",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1000&q=80",
    rating: 4.9,
    reviewsCount: 39,
    descriptionKa:
      "კარდიოიდული USB კონდენსატორული მიკროფონი ჩაშენებული პოპ-ფილტრით, ამორტიზატორით და RGB ინდიკატორით.",
    descriptionEn:
      "Broadcast-quality USB condenser microphone with tap-to-mute sensor, built-in pop filter, and RGB telemetry.",
    specs: [
      { label: "ნიმუშის სიხშირე", value: "192kHz / 24-bit" },
      { label: "დიაგრამა", value: "Cardioid" },
      { label: "ფუნქცია", value: "Tap-to-Mute სენსორი" },
      { label: "კავშირი", value: "USB-C Plug & Play" },
    ],
    inStock: true,
  },
  {
    id: 14,
    title: "გეიმინგ სკამი (Cyber Throne Pro)",
    price: 289.99,
    category: "გეიმინგი",
    categorySlug: "gaming",
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1000&q=80",
    rating: 4.8,
    reviewsCount: 14,
    descriptionKa:
      "ერგონომიული გეიმინგ სკამი 4D სახელურებით, მაგნიტური მეხსიერების ბალიშებით და 165° გადახრის კუთხით.",
    descriptionEn:
      "Ergonomic gaming chair built with breathable PU leather, magnetic memory foam headrest, and 4D armrests.",
    colors: [
      { nameKa: "კიბერ შავი/ლურჯი", nameEn: "Black/Cyan", hex: "#7aa2f7" },
      { nameKa: "შავი/ალისფერი", nameEn: "Black/Crimson", hex: "#f7768e" },
    ],
    specs: [
      { label: "მაქს. წონა", value: "150 კგ" },
      { label: "გადახრა", value: "90° - 165°" },
      { label: "კლასი", value: "Class 4 Gas Lift" },
      { label: "სახელურები", value: "4D Adjustable" },
    ],
    inStock: true,
  },
  {
    id: 15,
    title: "სწრაფი გარე SSD დისკი (CyberDrive 2TB)",
    price: 179.99,
    category: "ელექტრონიკა",
    categorySlug: "laptops",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1000&q=80",
    rating: 4.9,
    reviewsCount: 45,
    descriptionKa:
      "დარტყმაგამძლე პორტატული SSD დისკი წაკითხვის 2000 MB/s სიჩქარით და USB 3.2 Gen 2x2 კავშირით.",
    descriptionEn:
      "Rugged portable NVMe SSD delivering up to 2000MB/s speeds, IP55 dust and water resistance.",
    sizes: [
      { label: "1TB", priceModifier: 0 },
      { label: "2TB", priceModifier: 60 },
      { label: "4TB", priceModifier: 180 },
    ],
    specs: [
      { label: "სიჩქარე", value: "Up to 2000 MB/s" },
      { label: "ინტერფეისი", value: "USB 3.2 Gen 2x2" },
      { label: "დაცვა", value: "IP55 Drop Resistant" },
      { label: "თავსებადობა", value: "Windows, Mac, PS5" },
    ],
    inStock: true,
  },
  {
    id: 16,
    title: "გეიმინგ მაუსპადი (Neon Horizon XXL)",
    price: 34.99,
    category: "აქსესუარები",
    categorySlug: "gaming",
    image:
      "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=1000&q=80",
    rating: 4.7,
    reviewsCount: 30,
    descriptionKa:
      "900x400მმ ზომის მაღალი სიმკვრივის მიკრო-ქსოვილის მაუსპადი წყალგაუმტარი საფარით და ნეონის კონტურით.",
    descriptionEn:
      "900x400mm extended desk mat with waterproof micro-woven cloth surface and anti-fray stitched edges.",
    sizes: [
      { label: "900x400mm", priceModifier: 0 },
      { label: "1200x600mm", priceModifier: 15 },
    ],
    specs: [
      { label: "ზომა", value: "900 x 400 x 4 მმ" },
      { label: "ზედაპირი", value: "Speed & Control Micro-weave" },
      { label: "ძირი", value: "Non-slip Natural Rubber" },
    ],
    inStock: true,
  },
  {
    id: 17,
    title: "ჭკვიანი LED მაგიდის სანათი (CyberGlow)",
    price: 64.99,
    category: "აქსესუარები",
    categorySlug: "lifestyle",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80",
    rating: 4.6,
    reviewsCount: 23,
    descriptionKa:
      "RGBIC ჭკვიანი სანათი მუსიკალური სინქრონიზაციით, აპლიკაციით მართვით და თვალის დამცავი რეჟიმით.",
    descriptionEn:
      "Smart RGBIC desk ambient light bar featuring music sync, app control, and eye-caring warm reading mode.",
    specs: [
      { label: "განათება", value: "16 მილიონი ფერი + RGBIC" },
      { label: "კავშირი", value: "Wi-Fi 2.4GHz + BLE" },
      { label: "მართვა", value: "Touch, Mobile App, Voice" },
    ],
    inStock: true,
  },
  {
    id: 18,
    title: "Power Bank 140W (HyperCharge 27000)",
    price: 109.99,
    category: "აქსესუარები",
    categorySlug: "smartphones",
    image:
      "https://images.unsplash.com/photo-1609592424097-4054c25b3024?w=1000&q=80",
    rating: 4.9,
    reviewsCount: 51,
    descriptionKa:
      "მძლავრი 27,600 mAh პორტატული დამტენი 140W ორმხრივი PD 3.1 სწრაფი დამუხტვით და ჭკვიანი OLED ეკრანით.",
    descriptionEn:
      "27,600mAh airline-safe power bank pushing 140W PD 3.1 output, capable of powering laptops and phones simultaneously.",
    specs: [
      { label: "ტევადობა", value: "27,600 mAh (99.54Wh)" },
      { label: "მაქს. გამომავალი", value: "140W Power Delivery 3.1" },
      { label: "ეკრანი", value: "Smart Digital Telemetry" },
      { label: "პორტები", value: "2x USB-C + 1x USB-A" },
    ],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 19,
    title: "ვირტუალური რეალობის სათვალე (VR Vision Pro)",
    price: 799.99,
    category: "გეიმინგი",
    categorySlug: "gaming",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=1000&q=80",
    rating: 4.8,
    reviewsCount: 16,
    descriptionKa:
      "ავტონომიური VR/MR სათვალე 4K+ Infinite Display-ით, ხელის მოძრაობის ზუსტი სენსორებითა და Snapdragon XR2 Gen 2 ჩიპით.",
    descriptionEn:
      "Next-gen standalone Mixed Reality headset offering 4K+ resolution, full-color passthrough, and precise hand tracking.",
    sizes: [
      { label: "128GB", priceModifier: 0 },
      { label: "512GB", priceModifier: 150 },
    ],
    specs: [
      { label: "ეკრანი", value: "Dual 4K+ LCD (120Hz)" },
      { label: "პროცესორი", value: "Snapdragon XR2 Gen 2" },
      { label: "თვალთვალი", value: "Inside-out 6DOF + Hand Tracking" },
      { label: "წონა", value: "515 გრამი" },
    ],
    inStock: true,
  },
  {
    id: 20,
    title: "USB-C მრავალფუნქციური ჰაბი (10-in-1 Dock)",
    price: 54.99,
    category: "აქსესუარები",
    categorySlug: "laptops",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&q=80",
    rating: 4.6,
    reviewsCount: 33,
    descriptionKa:
      "ალუმინის 10-პორტიანი ჰაბი 4K 60Hz HDMI-ით, 100W PD დამუხტვით, Gigabit Ethernet-ითა და SD ბარათის წამკითხველით.",
    descriptionEn:
      "Solid aluminum 10-in-1 multiport adapter packing 4K HDMI, 100W PD passthrough, Ethernet, and SD card reader.",
    specs: [
      { label: "ვიდეო გამომავალი", value: "HDMI 4K @ 60Hz" },
      { label: "დამუხტვა", value: "100W USB-C Power Delivery" },
      { label: "ქსელი", value: "RJ45 Gigabit Ethernet" },
      { label: "პორტები", value: "3x USB 3.0, SD/TF, Audio" },
    ],
    inStock: true,
  },
];
