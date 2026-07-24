import type { Metadata } from "next";
import { Bebas_Neue, Vazirmatn } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "کویرتایر | بهمن",
  description: "تایر آفرود بهمن — تجربه تعاملی ویژگی‌های محصول کویرتایر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#e8e6e3] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
