"use client";

import { useState, useEffect } from "react";

// Whether the device can hover, not how wide it is — callers use this to swap
// hover interactions for taps. Keep it separate from useIsMobile: a tablet in
// landscape is wide enough to be a desktop viewport but still needs taps.
export default function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  return isTouchDevice;
}
