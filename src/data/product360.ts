export type ProductSpec = { label: string; value: string };

export type CatalogProduct = {
  id: string;
  name: string;
  nameEn: string;
  model: string;
  size: string;
  tagline: string;
  description: string;
  href: string;
  thumb: string;
  frames: {
    folder: string;
    start: number;
    end: number;
    ext: "png" | "webp";
  };
  specs: ProductSpec[];
};

/** Shared demo 360 sequence (same frames for every slide). */
const demoFrames = {
  folder: "/assets/video-frames-2",
  start: 1,
  end: 36,
  ext: "png" as const,
};

const demoThumb = "/assets/video-frames-2/frame_018.png";

export const catalogProducts: CatalogProduct[] = [
  {
    id: "bahman-kb555",
    name: "بهمن",
    nameEn: "BAHMAN",
    model: "KB-555",
    size: "255/45 ZR20",
    tagline: "پرفورمنس آفرود — چرخش ۳۶۰ درجه",
    description:
      "با کشیدن یا اسکرول، نمای کامل بهمن را ببینید؛ آج، دیواره و رینگ از هر زاویه.",
    href: "https://kavirtire.ir/products",
    thumb: demoThumb,
    frames: demoFrames,
    specs: [
      { label: "سایز", value: "255/45 ZR20" },
      { label: "مدل", value: "KB-555" },
      { label: "سری", value: "پرفورمنس" },
      { label: "نمای ۳۶۰", value: "فعال" },
    ],
  },
  {
    id: "wonderfull-kb700",
    name: "واندر فول",
    nameEn: "WONDERFULL",
    model: "KB-700",
    size: "225/65 R17",
    tagline: "آسودگی سفرهای طولانی",
    description:
      "طراحی متعادل برای سواری نرم و پایداری در بزرگراه؛ انتخاب محبوب خانواده‌ها.",
    href: "https://kavirtire.ir/products/wonderfull",
    thumb: demoThumb,
    frames: demoFrames,
    specs: [
      { label: "سایز", value: "225/65 R17" },
      { label: "مدل", value: "KB-700" },
      { label: "سری", value: "سواری" },
      { label: "نمای ۳۶۰", value: "فعال · دمو" },
    ],
  },
  {
    id: "tiger-kb66",
    name: "تایگر",
    nameEn: "TIGER",
    model: "KB-66",
    size: "215/65 R16",
    tagline: "چابک روی جاده خشک و خیس",
    description:
      "آج جهت‌دار برای کنترل بهتر در تغییر مسیر و ترمزگیری مطمئن‌تر.",
    href: "https://kavirtire.ir/products/tiger-kb66",
    thumb: demoThumb,
    frames: demoFrames,
    specs: [
      { label: "سایز", value: "215/65 R16" },
      { label: "مدل", value: "KB-66" },
      { label: "سری", value: "شهری" },
      { label: "نمای ۳۶۰", value: "فعال · دمو" },
    ],
  },
  {
    id: "valiant-kb444",
    name: "والیانت",
    nameEn: "VALIANT",
    model: "KB-444",
    size: "245/70 R17",
    tagline: "قدرت SUV روی مسیر سخت",
    description:
      "مخصوص شاسی‌بلند؛ دوام بالا و چسبندگی در شرایط آفرود سبک و جاده خاکی.",
    href: "https://kavirtire.ir/products/valiant-suv",
    thumb: demoThumb,
    frames: demoFrames,
    specs: [
      { label: "سایز", value: "245/70 R17" },
      { label: "مدل", value: "KB-444" },
      { label: "سری", value: "SUV" },
      { label: "نمای ۳۶۰", value: "فعال · دمو" },
    ],
  },
  {
    id: "dominant-kb900",
    name: "دومیننت",
    nameEn: "DOMINANT",
    model: "KB-900",
    size: "265/65 R17",
    tagline: "ایستادگی در بار و مسافت",
    description:
      "برای خودروهای سنگین‌تر و مسیرهای طولانی؛ تمرکز روی دوام و پایداری.",
    href: "https://kavirtire.ir/products/dominant",
    thumb: demoThumb,
    frames: demoFrames,
    specs: [
      { label: "سایز", value: "265/65 R17" },
      { label: "مدل", value: "KB-900" },
      { label: "سری", value: "سنگین" },
      { label: "نمای ۳۶۰", value: "فعال · دمو" },
    ],
  },
];

export function getFramePaths(
  folder: string,
  start: number,
  end: number,
  ext: "png" | "webp" = "png",
) {
  const paths: string[] = [];
  for (let i = start; i <= end; i++) {
    paths.push(`${folder}/frame_${String(i).padStart(3, "0")}.${ext}`);
  }
  return paths;
}

export function getFrameCount(product: CatalogProduct) {
  return product.frames.end - product.frames.start + 1;
}
