"use client";

import { useTheme } from "../providers/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50 p-2.5 rounded-full glass">
        <div className="w-6 h-6" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full glass hover:opacity-80 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 text-secondary">
        <Sun
          className={`absolute top-0 left-0 w-5 h-5 transition-all duration-300 ${
            isDark
              ? "opacity-0 rotate-180 scale-50"
              : "opacity-100 rotate-0 scale-100 group-hover:rotate-180"
          }`}
        />
        <Moon
          className={`absolute top-0 left-0 w-5 h-5 transition-all duration-300 ${
            isDark
              ? "opacity-100 rotate-0 scale-100 group-hover:-rotate-180"
              : "opacity-0 -rotate-180 scale-50"
          }`}
        />
      </div>
    </button>
  );
}

export default ThemeToggle;
