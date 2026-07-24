"use client";

import { useEffect, useRef, useState } from "react";
import { FRAME_END, FRAME_START, getFramePaths } from "@/data/hotspots";

export type ContentRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type FrameSequenceCanvasProps = {
  frameIndex: number;
  onReady?: (totalFrames: number) => void;
  onContentRect?: (rect: ContentRect) => void;
  className?: string;
};

function computeCoverRect(
  containerW: number,
  containerH: number,
  imageW: number,
  imageH: number,
): ContentRect {
  const scale = Math.max(containerW / imageW, containerH / imageH);
  const width = imageW * scale;
  const height = imageH * scale;
  return {
    x: (containerW - width) / 2,
    y: (containerH - height) / 2,
    width,
    height,
  };
}

export function FrameSequenceCanvas({
  frameIndex,
  onReady,
  onContentRect,
  className,
}: FrameSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const onReadyRef = useRef(onReady);
  const onContentRectRef = useRef(onContentRect);
  const lastRectKeyRef = useRef("");
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onContentRectRef.current = onContentRect;
  }, [onContentRect]);

  useEffect(() => {
    let cancelled = false;
    const paths = getFramePaths();
    const total = paths.length;
    let loaded = 0;

    const images = paths.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      const done = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadProgress(loaded / total);
        if (loaded === total) {
          framesRef.current = images.filter((i) => i.complete && i.naturalWidth);
          setReady(true);
          onReadyRef.current?.(framesRef.current.length);
        }
      };
      img.onload = done;
      img.onerror = done;
      return img;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frames = framesRef.current;
    if (!frames.length) return;

    const draw = () => {
      const idx = Math.max(0, Math.min(frameIndex, frames.length - 1));
      const img = frames[idx];
      if (!img?.naturalWidth) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const rect = computeCoverRect(w, h, img.naturalWidth, img.naturalHeight);
      const key = `${rect.x.toFixed(1)}:${rect.y.toFixed(1)}:${rect.width.toFixed(1)}:${rect.height.toFixed(1)}`;
      if (key !== lastRectKeyRef.current) {
        lastRectKeyRef.current = key;
        onContentRectRef.current?.(rect);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.fillStyle = "#e8e6e3";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
    };

    draw();

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ready, frameIndex]);

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-label={`توالی تایر بهمن، فریم ${FRAME_START} تا ${FRAME_END}`}
      />
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#e8e6e3]">
          <div className="h-px w-40 overflow-hidden bg-black/10">
            <div
              className="h-full bg-[#1a1a1a] transition-[width] duration-200 ease-out"
              style={{ width: `${Math.round(loadProgress * 100)}%` }}
            />
          </div>
          <p className="font-[family-name:var(--font-body)] text-xs tracking-[0.28em] text-black/45 uppercase">
            Loading
          </p>
        </div>
      )}
    </div>
  );
}
