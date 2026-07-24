"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  FrameSequenceCanvas,
  type ContentRect,
} from "./FrameSequenceCanvas";
import { ProductHotspots } from "./ProductHotspots";
import { getFrameDurationMs } from "@/data/hotspots";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [hotspotsReady, setHotspotsReady] = useState(false);
  const [contentRect, setContentRect] = useState<ContentRect | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleReady = useCallback((total: number) => {
    setTotalFrames(total);
  }, []);

  const handleContentRect = useCallback((rect: ContentRect) => {
    setContentRect(rect);
  }, []);

  useEffect(() => {
    if (!totalFrames) return;

    let raf = 0;
    let index = 0;
    let last = performance.now();
    let acc = 0;

    const tick = (now: number) => {
      acc += now - last;
      last = now;

      const need = getFrameDurationMs(index, totalFrames);
      if (acc >= need) {
        acc = 0;
        if (index < totalFrames - 1) {
          index += 1;
          setFrameIndex(index);
        } else {
          setHotspotsReady(true);
          return;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalFrames]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const range = Math.max(rect.height * 0.65, 1);
      const scrolled = clamp(-rect.top / range, 0, 1);
      setZoom(1 + scrolled * 0.14);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#e8e6e3]"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "68% 52%",
        }}
      >
        <FrameSequenceCanvas
          frameIndex={frameIndex}
          onReady={handleReady}
          onContentRect={handleContentRect}
        />
        <ProductHotspots visible={hotspotsReady} contentRect={contentRect} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="page-container flex h-full flex-col justify-start pb-8 pt-28 sm:pb-10 sm:pt-32">
          <header
            className={`pointer-events-auto max-w-lg self-start rounded-2xl border border-white/20 bg-black/55 p-6 text-white sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hotspotsReady
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <p className="font-[family-name:var(--font-body)] text-sm font-semibold tracking-[0.18em] text-white/90">
              کویرتایر · BAHMAN
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-body)] text-[clamp(1.85rem,4vw,2.75rem)] font-bold leading-snug text-white">
              بهمن — تایر آفرود برای مسیرهای سخت
            </h1>
            <p className="mt-4 font-[family-name:var(--font-body)] text-base leading-8 text-white/85 sm:text-lg sm:leading-9">
              نقاط آبی را بزنید؛ ویژگی‌های بارز بهمن و فناوری تایر سبز کویرتایر را ببینید.
            </p>
            <a
              href="https://kavirtire.ir/esale"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 inline-flex rounded-xl bg-[color:var(--brand-red)] px-5 py-2.5 font-[family-name:var(--font-body)] text-sm font-semibold tracking-wide text-white transition-all duration-500 hover:bg-[#c40510] ${
                hotspotsReady ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              خرید محصول
            </a>
          </header>
        </div>
      </div>

      <a
        href="#features"
        className="pointer-events-auto absolute bottom-3 right-3 z-40 inline-flex items-center gap-3 rounded-2xl bg-[color:var(--brand-blue)] px-7 py-4 font-[family-name:var(--font-body)] text-base font-semibold tracking-wide text-white transition-colors hover:bg-[color:var(--brand-blue-dark)] sm:bottom-5 sm:right-5 sm:px-8 sm:py-4 sm:text-lg"
      >
        کشف ویژگی‌ها
        <span aria-hidden className="text-xl leading-none">
          ↓
        </span>
      </a>
    </section>
  );
}
