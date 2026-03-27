"use client";

import { usePathname } from "next/navigation";

interface LayoutShellProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Hides the site header, pre-footer, and footer on /studio routes
 * so the Sanity Studio has full control of the viewport.
 */
export default function LayoutShell({ header, footer, children }: LayoutShellProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
