"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Product360Viewer } from "@/components/products/Product360Viewer";
import { catalogProducts, type CatalogProduct } from "@/data/product360";

export function Product360Section() {
  const [activeId, setActiveId] = useState(catalogProducts[0].id);
  const [frameIndex, setFrameIndex] = useState(0);

  const product =
    catalogProducts.find((p) => p.id === activeId) ?? catalogProducts[0];

  const selectProduct = useCallback((next: CatalogProduct) => {
    setActiveId(next.id);
    setFrameIndex(0);
  }, []);

  const onFrameChange = useCallback((index: number) => {
    setFrameIndex(index);
  }, []);

  return (
    <section id="products" className="relative">
      {/* Sticky full-viewport BG — content scrolls over it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/assets/bg/road-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[color:var(--brand-blue)]/20" />
        </div>
      </div>

      <PageContainer className="relative z-10 py-10 sm:py-12">
        <h2 className="mb-4 font-[family-name:var(--font-body)] text-3xl font-bold text-white sm:text-4xl">
          محصولات
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="flex flex-col gap-3">
            <div className="relative h-[300px] overflow-hidden rounded-[1.75rem] border border-[color:var(--brand-blue)]/20 bg-white/85 sm:h-[380px]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
                <div className="rounded-2xl border border-white/40 bg-[color:var(--brand-blue)]/90 px-4 py-3 text-white">
                  <p className="font-[family-name:var(--font-body)] text-[11px] text-white/75">
                    {product.nameEn}
                  </p>
                  <p className="font-[family-name:var(--font-body)] text-xl font-bold leading-none">
                    {product.name}{" "}
                    <span className="text-[color:var(--brand-red)]">
                      {product.model}
                    </span>
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-body)] text-xs text-white/80">
                    {product.size}
                  </p>
                </div>
                <span className="rounded-full bg-[color:var(--brand-red)] px-3 py-1.5 font-[family-name:var(--font-body)] text-[11px] font-semibold text-white">
                  ۳۶۰°
                </span>
              </div>

              <Product360Viewer
                key={`${product.frames.folder}-${product.frames.ext}`}
                folder={product.frames.folder}
                frameStart={product.frames.start}
                frameEnd={product.frames.end}
                frameExt={product.frames.ext}
                frameIndex={frameIndex}
                onFrameChange={onFrameChange}
                label={`${product.name} ${product.model}`}
              />
            </div>

            <div className="rounded-[1.5rem] border border-[color:var(--brand-blue)]/20 bg-white/90 p-3">
              <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
                {catalogProducts.map((item) => {
                  const active = item.id === product.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectProduct(item)}
                      className={`group relative w-[118px] shrink-0 rounded-2xl border p-2 text-right transition-all duration-300 ${
                        active
                          ? "border-[color:var(--brand-blue)] bg-[color:var(--brand-blue)]/10 shadow-[0_10px_28px_rgba(0,87,184,0.18)]"
                          : "border-black/10 bg-[#f7f8fa] hover:border-[color:var(--brand-blue)]/35"
                      }`}
                      aria-pressed={active}
                      aria-label={`${item.name} ${item.model}`}
                    >
                      <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-gradient-to-b from-white to-[#e8eef6]">
                        <Image
                          src={item.thumb}
                          alt=""
                          fill
                          sizes="118px"
                          className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute left-1.5 top-1.5 rounded-md bg-[color:var(--brand-red)] px-1.5 py-0.5 font-[family-name:var(--font-body)] text-[9px] font-bold text-white">
                          360°
                        </span>
                      </div>
                      <p className="truncate font-[family-name:var(--font-body)] text-[12px] font-bold text-[#1a1a1a]">
                        {item.name}
                      </p>
                      <p className="truncate font-[family-name:var(--font-body)] text-[10px] text-[color:var(--brand-blue)]">
                        {item.model}
                      </p>
                      <span
                        className={`mt-1.5 block h-1 rounded-full transition-colors ${
                          active
                            ? "bg-[color:var(--brand-red)]"
                            : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-between gap-4">
            <div className="overflow-hidden rounded-2xl border border-[color:var(--brand-blue)]/20 bg-white/80">
              <div className="bg-[color:var(--brand-blue)] px-4 py-3 text-white">
                <p className="font-[family-name:var(--font-body)] text-[11px] text-white/75">
                  مشخصات محصول فعال
                </p>
                <p className="font-[family-name:var(--font-body)] text-lg font-bold">
                  {product.name} {product.model}
                </p>
              </div>
              <div className="p-4">
                <p className="font-[family-name:var(--font-body)] text-sm leading-7 text-[#1a1a1a]/65">
                  {product.tagline}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {product.specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex items-baseline justify-between gap-3 rounded-xl bg-[color:var(--brand-blue)]/5 px-3 py-2"
                    >
                      <span className="font-[family-name:var(--font-body)] text-xs text-black/45">
                        {spec.label}
                      </span>
                      <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-[#1a1a1a]">
                        {spec.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-[family-name:var(--font-body)] text-[13px] leading-6 text-[#1a1a1a]/55">
                  {product.description}
                </p>
              </div>
            </div>

            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand-red)] px-5 py-3.5 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:bg-[#c40510]"
            >
              مشاهده در فروشگاه کویرتایر
            </a>
          </aside>
        </div>
      </PageContainer>
    </section>
  );
}
