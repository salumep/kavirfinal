"use client";

import { useEffect, useId, useState } from "react";
import { type Hotspot, tireHotspots } from "@/data/hotspots";
import type { ContentRect } from "./FrameSequenceCanvas";

type ProductHotspotsProps = {
  visible: boolean;
  contentRect: ContentRect | null;
};

export function ProductHotspots({ visible, contentRect }: ProductHotspotsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [entered, setEntered] = useState(false);
  const listId = useId();

  useEffect(() => {
    if (!visible) {
      setEntered(false);
      setActiveId(null);
      return;
    }
    const t = window.setTimeout(() => setEntered(true), 80);
    const open = window.setTimeout(() => setActiveId(tireHotspots[0].id), 500);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(open);
    };
  }, [visible]);

  if (!visible || !contentRect) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      aria-label="حاشیه‌نویسی ویژگی‌های محصول"
    >
      {tireHotspots.map((spot, i) => (
        <HotspotMarker
          key={spot.id}
          spot={spot}
          index={i}
          entered={entered}
          active={activeId === spot.id}
          listId={listId}
          contentRect={contentRect}
          onToggle={() =>
            setActiveId((prev) => (prev === spot.id ? null : spot.id))
          }
        />
      ))}
    </div>
  );
}

function HotspotMarker({
  spot,
  index,
  entered,
  active,
  listId,
  contentRect,
  onToggle,
}: {
  spot: Hotspot;
  index: number;
  entered: boolean;
  active: boolean;
  listId: string;
  contentRect: ContentRect;
  onToggle: () => void;
}) {
  const panelId = `${listId}-${spot.id}`;
  const isLeft = spot.side === "left";
  const left = contentRect.x + (spot.x / 100) * contentRect.width;
  const top = contentRect.y + (spot.y / 100) * contentRect.height;

  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        transform: "translate(-50%, -50%)",
        transitionDelay: entered ? `${180 + index * 120}ms` : "0ms",
      }}
    >
      <div
        className={`pointer-events-auto relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          entered ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <button
          type="button"
          aria-expanded={active}
          aria-controls={panelId}
          aria-label={spot.title}
          onClick={onToggle}
          className="group relative flex h-11 w-11 items-center justify-center outline-none"
        >
          {!active && (
            <>
              <span
                aria-hidden
                className="absolute h-11 w-11 rounded-full border-2 border-[color:var(--brand-blue)]/50 animate-hotspot-ring"
              />
              <span
                aria-hidden
                className="absolute h-11 w-11 rounded-full border border-[color:var(--brand-red)]/45 animate-hotspot-ring-delay"
              />
            </>
          )}
          <span
            className={`relative z-10 h-[18px] w-[18px] rounded-full transition-all duration-300 ${
              active
                ? "scale-110 bg-[color:var(--brand-red)] ring-4 ring-[color:var(--brand-red)]/25"
                : "bg-[color:var(--brand-blue)] group-hover:scale-110"
            }`}
          />
        </button>

        <div
          id={panelId}
          role="region"
          aria-hidden={!active}
          className={`absolute top-1/2 z-30 w-[min(72vw,240px)] sm:w-[250px] ${
            isLeft
              ? "right-[calc(100%+8px)] origin-right"
              : "left-[calc(100%+8px)] origin-left"
          } ${
            active
              ? "translate-y-[-50%] scale-100 opacity-100"
              : "pointer-events-none translate-y-[calc(-50%+6px)] scale-[0.96] opacity-0"
          } transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        >
          <div
            className={`flex items-stretch ${
              isLeft ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`relative mt-[18px] h-px w-7 shrink-0 bg-[color:var(--brand-blue)]/45 sm:w-10 ${
                active ? "animate-draw-line" : ""
              }`}
              style={{
                transformOrigin: isLeft ? "right center" : "left center",
              }}
            />
            <div className="rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-white">
              <p className="mb-1 font-[family-name:var(--font-body)] text-[11px] font-semibold tracking-wide text-[color:var(--brand-red)]">
                کویرتایر
              </p>
              <h3 className="mt-0.5 font-[family-name:var(--font-body)] text-[15px] font-semibold leading-snug text-white">
                {spot.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-body)] text-[13px] leading-6 text-white/80">
                {spot.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
