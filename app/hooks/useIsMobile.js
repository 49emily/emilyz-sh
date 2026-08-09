"use client";

import { useState, useEffect } from "react";

// The complement of Tailwind's `lg` breakpoint, so this and the `lg:` utilities
// always agree about where mobile ends.
//
// Written as min-width and negated rather than as a max-width query, so there's
// no gap or overlap at the boundary itself. And in rem because media queries
// resolve rem against the browser's default font size — a hardcoded 1024px
// would drift from `lg:` for anyone who has changed theirs.
const DESKTOP_QUERY = "(min-width: 64rem)";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? true : !window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsMobile(!query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isMobile;
}
