import { PageContainer } from "@/components/PageContainer";

const stats = [
  {
    id: "reps",
    label: "نمایندگان فروش",
    value: "۵۰۴",
    unit: "نماینده",
    href: "https://kavirtire.ir/representatives",
    accent: "blue" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden>
        <circle cx="18" cy="16" r="5.5" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="31" cy="16" r="5.5" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M9 36c2-6 5.5-9 9-9s7 3 9 9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M22 36c2-6 5.5-9 9-9s7 3 9 9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M37 11v8M33 15h8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "service",
    label: "خدمات پس از فروش",
    value: "۸۲",
    unit: "مرکز",
    href: "https://kavirtire.ir/sale-service",
    accent: "red" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden>
        <circle cx="17" cy="16" r="5.5" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="31" cy="16" r="5.5" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M8 35c2-6 5.5-9 9-9s7 3 9 9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="35" cy="33" r="7" stroke="currentColor" strokeWidth="2.4" />
        <path
          d="M35 29v8M31 33h8"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "products",
    label: "تعداد محصولات",
    value: "۵۶",
    unit: "محصول",
    href: "#products",
    accent: "blue" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M24 7l15 8.5v17L24 41 9 32.5v-17L24 7z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M24 24.5l15-8.5M24 24.5V41M24 24.5L9 16"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "warranty",
    label: "ضمانت محصولات",
    value: "۵",
    unit: "سال",
    href: "https://kavirtire.ir/sale-service",
    accent: "red" as const,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden>
        <path
          d="M24 6l14 6v12c0 10-6.5 16.5-14 19-7.5-2.5-14-9-14-19V12l14-6z"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M17 24l5 5 10-11"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

export function StatsSection() {
  return (
    <section className="relative border-y border-[color:var(--brand-blue)]/10 bg-[#f4f7fb] pt-14 pb-8 sm:pt-16 sm:pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(0,87,184,0.08),transparent_50%),radial-gradient(ellipse_at_90%_100%,rgba(227,6,19,0.06),transparent_45%)]"
      />
      <PageContainer className="relative z-10">
        <div className="mb-8 max-w-2xl">
          <p className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.2em] text-[color:var(--brand-red)]">
            کویرتایر
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-body)] text-2xl font-bold text-[#1a1a1a] sm:text-3xl">
            اولین تولیدکننده تایر سبز در ایران
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => {
            const isRed = stat.accent === "red";
            const className = `group flex items-center gap-3 rounded-2xl border px-3.5 py-3.5 transition-all duration-300 hover:-translate-y-0.5 sm:gap-4 sm:px-4 sm:py-4 ${
              isRed
                ? "border-[color:var(--brand-red)]/20 bg-white shadow-[0_8px_24px_rgba(227,6,19,0.08)] hover:border-[color:var(--brand-red)]/40"
                : "border-[color:var(--brand-blue)]/15 bg-white shadow-[0_8px_24px_rgba(0,87,184,0.08)] hover:border-[color:var(--brand-blue)]/40"
            }`;

            const content = (
              <>
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${
                    isRed
                      ? "bg-[color:var(--brand-red)]/10 text-[color:var(--brand-red)]"
                      : "bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)]"
                  } [&_svg]:h-7 [&_svg]:w-7 sm:[&_svg]:h-8 sm:[&_svg]:w-8`}
                >
                  {stat.icon}
                </span>
                <div className="min-w-0 flex-1 text-right">
                  <p className="truncate font-[family-name:var(--font-body)] text-[11px] font-medium text-[#1a1a1a]/55 sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-body)] text-2xl font-bold leading-none text-[#1a1a1a] sm:text-3xl">
                    {stat.value}
                    <span
                      className={`mr-1.5 text-xs font-semibold sm:text-sm ${
                        isRed
                          ? "text-[color:var(--brand-red)]"
                          : "text-[color:var(--brand-blue)]"
                      }`}
                    >
                      {stat.unit}
                    </span>
                  </p>
                </div>
              </>
            );

            if (stat.href.startsWith("#")) {
              return (
                <a key={stat.id} href={stat.href} className={className}>
                  {content}
                </a>
              );
            }

            return (
              <a
                key={stat.id}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
