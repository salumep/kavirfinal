import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
};

/** Shared content width for header, hero copy, and page sections. */
export function PageContainer({
  children,
  className = "",
  as: Tag = "div",
}: PageContainerProps) {
  return (
    <Tag className={`page-container ${className}`.trim()}>{children}</Tag>
  );
}
