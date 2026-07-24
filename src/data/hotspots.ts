export type Hotspot = {
  id: string;
  x: number; // % of canvas width
  y: number; // % of canvas height
  label: string;
  title: string;
  description: string;
  side: "left" | "right";
};

/** Positions tuned to frame_036.webp (BAHMAN tire close-up). */
export const tireHotspots: Hotspot[] = [
  {
    id: "tread",
    x: 28,
    y: 22,
    label: "۰۱",
    title: "آج چندمنظوره آفرود",
    description:
      "الگوی عمیق بهمن برای چسبندگی در گل، شن و جاده؛ کنترل پایدار در مسیرهای سخت.",
    side: "left",
  },
  {
    id: "sidewall",
    x: 34,
    y: 52,
    label: "۰۲",
    title: "دیواره تقویت‌شده BAHMAN",
    description:
      "ساختار چندلایه کناره‌ها با برندینگ بهمن؛ مقاومت بالاتر در برابر ضربه و فشار جانبی.",
    side: "left",
  },
  {
    id: "green",
    x: 46,
    y: 74,
    label: "۰۳",
    title: "فناوری تایر سبز کویر",
    description:
      "کاهش مقاومت غلتشی تا ۱۶٪، مصرف سوخت کمتر و دوام بیشتر — همان مسیر تولید سبز کویرتایر.",
    side: "left",
  },
  {
    id: "durability",
    x: 58,
    y: 58,
    label: "۰۴",
    title: "دوام و پیمایش بیشتر",
    description:
      "طراحی برای عمر طولانی‌تر و پیمایش بالاتر؛ همراه با پشتیبانی خدمات پس از فروش کویرتایر.",
    side: "right",
  },
];

export const FRAME_START = 2;
export const FRAME_END = 36;
export const FRAME_FPS = 8;
/** How many frames at the end ease into a slower pace. */
export const FRAME_SLOW_TAIL = 8;

export function getFrameDurationMs(index: number, total: number) {
  const base = 1000 / FRAME_FPS;
  const last = total - 1;
  const intoTail = index - (last - FRAME_SLOW_TAIL);
  if (intoTail <= 0) return base;
  const t = intoTail / FRAME_SLOW_TAIL;
  return base * (1 + t * t * 2.2);
}

export function getFrameSrc(frame: number) {
  return `/assets/video-frames-1/frame_${String(frame).padStart(3, "0")}.webp`;
}

export function getFramePaths() {
  const paths: string[] = [];
  for (let i = FRAME_START; i <= FRAME_END; i++) {
    paths.push(getFrameSrc(i));
  }
  return paths;
}
