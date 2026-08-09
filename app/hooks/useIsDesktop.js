"use client";

import { useState, useEffect } from "react";

// Mirrors Tailwind's `lg` breakpoint. Matching the CSS unit-for-unit matters:
// media queries resolve rem against the browser's default font size, so a
// hardcoded 1024px would disagree with `lg:` for anyone who has changed theirs.
const DESKTOP_QUERY = "(min-width: 64rem)";

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(DESKTOP_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setIsDesktop(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}
