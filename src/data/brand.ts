export const brand = {
  name: "کویرتایر",
  nameEn: "Kavir Tire",
  blue: "#0057b8",
  blueDark: "#004493",
  red: "#e30613",
  site: "https://kavirtire.ir",
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

/** Main nav mirrored from kavirtire.ir */
export const mainNav: NavItem[] = [
  { label: "محصولات", href: "#products" },
  { label: "فروش اینترنتی", href: "https://kavirtire.ir/esale", external: true },
  { label: "نمایندگان", href: "https://kavirtire.ir/representatives", external: true },
  { label: "خدمات پس از فروش", href: "https://kavirtire.ir/sale-service", external: true },
  { label: "SUV و آفرود", href: "https://kavirtire.ir/suv", external: true },
  { label: "اخبار", href: "https://kavirtire.ir/news", external: true },
  { label: "درباره ما", href: "https://kavirtire.ir/single/about-us", external: true },
  { label: "تماس با ما", href: "https://kavirtire.ir/single/contact-us", external: true },
];
