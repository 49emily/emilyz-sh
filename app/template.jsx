"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
