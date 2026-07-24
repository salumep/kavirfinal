"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, mainNav } from "@/data/brand";
import { PageContainer } from "@/components/PageContainer";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white">
      <PageContainer className="flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="relative z-10 shrink-0" aria-label={brand.name}>
          <Image
            src="/assets/brand/kavir-logo.png"
            alt={brand.name}
            width={168}
            height={48}
            priority
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="منوی اصلی">
          {mainNav.map((item) => {
            const className =
              "px-2.5 py-2 font-[family-name:var(--font-body)] text-[13px] font-medium text-[#1a1a1a]/75 transition-colors hover:text-[color:var(--brand-blue)]";
            if (item.external) {
              return (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href + item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href="https://kavirtire.ir/esale"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[color:var(--brand-blue)] px-4 py-2 font-[family-name:var(--font-body)] text-[13px] font-semibold text-white transition-colors hover:bg-[color:var(--brand-blue-dark)] rounded-xl"
          >
            خرید آنلاین
          </a>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">منو</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-[#1a1a1a] transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-[#1a1a1a] transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-[#1a1a1a] transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </PageContainer>

      <div
        id="mobile-nav"
        className={`border-t border-black/5 bg-white xl:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <PageContainer>
          <nav
            className="flex max-h-[calc(100svh-4.25rem)] flex-col overflow-y-auto py-4"
            aria-label="منوی موبایل"
          >
            {mainNav.map((item) => {
              const className =
                "border-b border-black/5 py-3.5 font-[family-name:var(--font-body)] text-[15px] font-medium text-[#1a1a1a]";
              if (item.external) {
                return (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className={className}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="https://kavirtire.ir/esale"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-[color:var(--brand-blue)] px-4 py-3 font-[family-name:var(--font-body)] text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              خرید آنلاین
            </a>
          </nav>
        </PageContainer>
      </div>
    </header>
  );
}
