"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getFramePaths } from "@/data/product360";

type Product360ViewerProps = {
  folder: string;
  frameStart: number;
  frameEnd: number;
  frameExt?: "png" | "webp";
  frameIndex: number;
  onFrameChange: (index: number) => void;
  label: string;
};

const PX_PER_FRAME = 10;

function wrapIndex(index: number, total: number) {
  if (total <= 0) return 0;
  return ((index % total) + total) % total;
}

export function Product360Viewer({
  folder,
  frameStart,
  frameEnd,
  frameExt = "png",
  frameIndex,
  onFrameChange,
  label,
}: Product360ViewerProps) {
  const total = frameEnd - frameStart + 1;
  const framesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    active: boolean;
    pointerId: number;
    lastX: number;
  }>({
    active: false,
    pointerId: -1,
    lastX: 0,
  });
  const frameRef = useRef(frameIndex);
  const totalRef = useRef(total);
  const onFrameChangeRef = useRef(onFrameChange);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    frameRef.current = frameIndex;
  }, [frameIndex]);

  useEffect(() => {
    totalRef.current = total;
  }, [total]);

  useEffect(() => {
    onFrameChangeRef.current = onFrameChange;
  }, [onFrameChange]);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setLoadProgress(0);
    framesRef.current = [];

    const paths = getFramePaths(folder, frameStart, frameEnd, frameExt);
    let loaded = 0;

    const images = paths.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      const done = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadProgress(loaded / paths.length);
        if (loaded === paths.length) {
          framesRef.current = images.filter((i) => i.complete && i.naturalWidth > 0);
          setReady(framesRef.current.length > 0);
        }
      };
      img.onload = done;
      img.onerror = done;
      return img;
    });

    return () => {
      cancelled = true;
    };
  }, [folder, frameStart, frameEnd, frameExt]);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = frames[wrapIndex(index, frames.length)];
    if (!img?.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    const tw = Math.round(w * dpr);
    const th = Math.round(h * dpr);
    if (canvas.width !== tw || canvas.height !== th) {
      canvas.width = tw;
      canvas.height = th;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight) * 0.9;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2 + h * 0.015;
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  const setFrame = useCallback(
    (index: number) => {
      const next = wrapIndex(index, totalRef.current);
      if (next === frameRef.current) {
        draw(next);
        return;
      }
      frameRef.current = next;
      draw(next);
      onFrameChangeRef.current(next);
    },
    [draw],
  );

  useEffect(() => {
    if (!ready) return;
    draw(frameIndex);
  }, [ready, frameIndex, draw]);

  useEffect(() => {
    if (!ready) return;
    const onResize = () => draw(frameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready, draw]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !ready) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      dragRef.current = {
        active: true,
        pointerId: e.pointerId,
        lastX: e.clientX,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== e.pointerId) return;
      e.preventDefault();

      const dx = e.clientX - drag.lastX;
      if (Math.abs(dx) < PX_PER_FRAME) return;

      const steps = Math.trunc(dx / PX_PER_FRAME);
      drag.lastX += steps * PX_PER_FRAME;
      // Drag right → previous frame (tire rotates with hand)
      setFrame(frameRef.current - steps);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      if (dragRef.current.pointerId !== e.pointerId) return;
      dragRef.current.active = false;
      dragRef.current.pointerId = -1;
      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId);
        }
      } catch {
        /* ignore */
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 2) return;
      setFrame(frameRef.current + (delta > 0 ? 1 : -1));
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("lostpointercapture", endDrag);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("lostpointercapture", endDrag);
      el.removeEventListener("wheel", onWheel);
    };
  }, [ready, setFrame]);

  const angle = Math.round((frameIndex / Math.max(total, 1)) * 360);

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 touch-none select-none cursor-grab active:cursor-grabbing"
      role="img"
      aria-label={`${label}، نمای ${angle} درجه`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[56%] h-[52%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[color:var(--brand-blue)]/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[56%] h-[40%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-[color:var(--brand-red)]/30"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        draggable={false}
      />

      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="h-px w-36 overflow-hidden bg-[color:var(--brand-blue)]/15">
            <div
              className="h-full bg-[color:var(--brand-blue)] transition-[width] duration-200"
              style={{ width: `${Math.round(loadProgress * 100)}%` }}
            />
          </div>
          <p className="font-[family-name:var(--font-body)] text-xs tracking-[0.2em] text-[color:var(--brand-blue)]/60">
            آماده‌سازی ۳۶۰°
          </p>
        </div>
      )}
    </div>
  );
}
