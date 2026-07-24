import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { brand } from "@/data/brand";

const contacts = [
  {
    label: "۰۵۶-۳۱۳۱۱۰۰۰ (کارخانه)",
    href: "tel:+985631311000",
  },
  {
    label: "۰۲۱-۴۱۳۵۳۰۰۰ (دفتر مرکزی)",
    href: "tel:+982141353000",
  },
  {
    label:
      "دفتر مرکزی: تهران، جردن، خیابان نلسون ماندلا، خیابان ناهید شرقی، پلاک ۱۵",
  },
  {
    label: "کارخانه: بیرجند، کیلومتر ۱۱ جاده کرمان",
  },
  {
    label: "صندوق پستی کارخانه: ۵۱۸",
  },
];

const related = [
  "گروه مدیریت سرمایه‌گذاری امید",
  "پژوهشگاه پلیمر و پتروشیمی ایران",
  "مرکز تحقیقات و مهندسی تایر ایران",
  "سازمان ملی استاندارد ایران",
  "سازمان حفاظت محیط زیست",
  "سازمان حمایت از مصرف‌کنندگان و تولیدکنندگان",
  "فرابورس ایران",
];

const socials = [
  {
    name: "اینستاگرام",
    href: "https://kavirtire.ir",
    color: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    name: "تلگرام",
    href: "https://kavirtire.ir",
    color: "bg-[#229ED9]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M9.7 14.6 9.5 18c.3 0 .5-.1.7-.3l1.7-1.6 3.5 2.6c.6.3 1.1.2 1.3-.6l2.3-10.8c.2-.9-.3-1.3-.9-1.1L4.4 10c-.8.3-.8.8-.1 1l3.7 1.2 8.6-5.4c.4-.3.8-.1.5.2l-7.4 7.6z" />
      </svg>
    ),
  },
  {
    name: "لینکدین",
    href: "https://kavirtire.ir",
    color: "bg-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M6.5 9H3.7v11h2.8V9zM5.1 3.5A1.6 1.6 0 1 0 5.1 6.7 1.6 1.6 0 0 0 5.1 3.5zM20.3 9.1c-1.5 0-2.5.8-3 1.5V9H14.5v11h2.8v-5.9c0-1.6.3-3.1 2.3-3.1s2 1.7 2 3.2V20H24v-6.5c0-3.1-1.7-4.4-3.7-4.4z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/assets/video-frames-2/frame_018.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-[#0b1220]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_80%,rgba(0,87,184,0.35),transparent_55%)]" />
      </div>

      <PageContainer className="relative z-10 pt-14 pb-8 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="font-[family-name:var(--font-body)] text-lg font-bold">
              ارتباط با ما
            </h3>
            <ul className="mt-5 space-y-3.5">
              {contacts.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-[family-name:var(--font-body)] text-sm leading-7 text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <p className="font-[family-name:var(--font-body)] text-sm leading-7 text-white/75">
                      {item.label}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-body)] text-lg font-bold">
              شرکت‌های مرتبط
            </h3>
            <ul className="mt-5 space-y-2.5">
              {related.map((name) => (
                <li
                  key={name}
                  className="font-[family-name:var(--font-body)] text-sm leading-7 text-white/70"
                >
                  <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--brand-red)] align-middle" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-[family-name:var(--font-body)] text-xs text-white/45">
            © {new Date().getFullYear()} {brand.name} — تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-2.5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:scale-105 ${s.color}`}
              >
                {s.icon}
              </a>
            ))}
            <Link
              href="/"
              className="mr-1 rounded-full border border-white/20 px-3 py-1.5 font-[family-name:var(--font-body)] text-[11px] text-white/70 transition-colors hover:text-white"
            >
              بازگشت به بالا
            </Link>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
