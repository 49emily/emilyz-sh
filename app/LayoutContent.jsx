"use client";

import { useEffect, useState } from "react";
import DesktopNavigation from "./components/DesktopNavigation";
import MobileNavigation from "./components/MobileNavigation";
import ThemeToggle from "./components/ThemeToggle";
import GlobalImageOverlay from "./components/GlobalImageOverlay";
import useIsDesktop from "./hooks/useIsDesktop";

export default function LayoutContent({ children }) {
  const [appLoaded, setAppLoaded] = useState(false);
  const [navImageLoaded, setNavImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Preload the navigation profile image
    const img = new Image();
    img.onload = () => {
      setNavImageLoaded(true);
    };
    img.src = "/profile3.jpg";
  }, []);

  useEffect(() => {
    // Only set app as loaded after navigation image has loaded
    if (navImageLoaded) {
      // Add a small delay for smooth initial load animation
      setTimeout(() => setAppLoaded(true), 100);
    }
  }, [navImageLoaded]);

  if (!mounted) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ease-out ${
        appLoaded ? "opacity-100 blur-none" : "opacity-0 blur-sm"
      }`}
    >
      <GlobalImageOverlay />
      <ThemeToggle />
      <div className="mx-auto px-4 lg:px-12">
        <div className="lg:grid lg:grid-cols-7 lg:min-h-screen">
          {/* Only the navigation for the current breakpoint is mounted. Hiding the
              other one with CSS would leave it running its effects and fetches. */}
          {isDesktop ? (
            <aside className="lg:col-span-2">
              <div
                className={`fixed top-0 h-screen left-0 w-[28.571%] flex justify-center items-center transition-all duration-700 delay-200 ease-out ${
                  appLoaded ? "opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                <DesktopNavigation />
              </div>
            </aside>
          ) : (
            <MobileNavigation />
          )}

          {/* Main Content */}
          <main
            className={`lg:col-span-5 px-1 lg:px-4 flex flex-col min-h-screen transition-all duration-700 delay-400 ease-out ${
              appLoaded ? "opacity-100 transform" : "opacity-0 transform translate-x-4"
            }`}
          >
            {children}
            {/* <Footer /> */}
          </main>
        </div>
      </div>
    </div>
  );
}
