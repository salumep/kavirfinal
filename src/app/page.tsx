import { SiteHeader } from "@/components/SiteHeader";
import { PageContainer } from "@/components/PageContainer";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { Product360Section } from "@/components/products/Product360Section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-full flex-col">
        <HeroSection />
        <StatsSection />
        <Product360Section />
        <section
          id="features"
          className="relative z-10 border-t border-[color:var(--brand-blue)]/10 bg-white pt-32 pb-24 sm:pt-40 sm:pb-28"
        >
          <PageContainer>
            <div className="max-w-3xl">
              <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.2em] text-[color:var(--brand-red)]">
                کویرتایر · BAHMAN
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-body)] text-3xl font-bold text-[#1a1a1a] sm:text-4xl">
                ساخته‌شده برای دوام در مسیر واقعی
              </h2>
              <p className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-base leading-8 text-[#1a1a1a]/65">
                بهمن با آج آفرود، دیواره تقویت‌شده و فناوری سبز کویرتایر ساخته شده است.
                برای خرید، نمایندگی و خدمات پس از فروش به سایت اصلی کویرتایر سر بزنید.
              </p>
              <a
                href="https://kavirtire.ir/products"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-xl bg-[color:var(--brand-blue)] px-5 py-3 font-[family-name:var(--font-body)] text-sm font-semibold text-white transition-colors hover:bg-[color:var(--brand-blue-dark)]"
              >
                مشاهده محصولات
              </a>
            </div>
          </PageContainer>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
