"use client";

import { useRef } from "react";

export default function YearScroller({ years, counts, activeYear, onSelect }) {
  const buttons = useRef({});
  const largestCount = Math.max(1, ...Object.values(counts));

  function handleKeyDown(event) {
    const currentIndex = years.indexOf(event.target.dataset.year);
    if (currentIndex < 0) return;

    let nextIndex;
    if (event.key === "ArrowDown") nextIndex = Math.min(years.length - 1, currentIndex + 1);
    else if (event.key === "ArrowUp") nextIndex = Math.max(0, currentIndex - 1);
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = years.length - 1;
    else return;

    event.preventDefault();
    const year = years[nextIndex];
    buttons.current[year]?.focus({ preventScroll: true });
    onSelect(year);
  }

  return (
    <nav
      aria-label="Browse projects by year"
      className="group/rail sticky top-[calc(50svh_-_var(--year-count)*1.25rem)] sm:top-[calc(50svh_-_var(--year-count)*0.625rem)]"
      style={{ "--year-count": years.length }}
      onKeyDown={handleKeyDown}
    >
      {years.map((year) => (
        <button
          key={year}
          ref={(element) => { buttons.current[year] = element; }}
          type="button"
          data-year={year}
          aria-label={`Jump to ${year}`}
          aria-describedby={`year-count-${year}`}
          aria-controls={`projects-${year}`}
          aria-current={year === activeYear ? "date" : undefined}
          tabIndex={year === activeYear ? 0 : -1}
          onClick={() => onSelect(year)}
          className={`group/year relative flex h-10 w-full items-center justify-end gap-2 bg-transparent transition-colors duration-300 hover:text-black/60 focus-visible:text-black/60 focus-visible:outline-offset-[-2px] sm:h-5 sm:gap-0 motion-reduce:transition-none ${
            year === activeYear ? "text-black/60" : "text-black/25"
          }`}
        >
          <span id={`year-count-${year}`} className="sr-only">
            {counts[year]} {counts[year] === 1 ? "work" : "works"}
          </span>
          <span className="pointer-events-none text-sm leading-none italic font-exposure-light max-sm:group-aria-[current=date]/year:font-exposure-bold whitespace-nowrap text-black transition-[opacity,transform] duration-200 sm:absolute sm:right-[max(100%,4rem)] sm:mr-2 sm:translate-x-1 sm:bg-white sm:px-1 sm:text-base sm:opacity-0 group-hover/year:translate-x-0 group-hover/year:opacity-100 group-focus-visible/year:translate-x-0 group-focus-visible/year:opacity-100 motion-reduce:transition-none">
            {year}
          </span>
          <span aria-hidden="true" className="hidden w-16 shrink-0 justify-end sm:flex">
            <span
              className="block h-3 w-4 border border-current bg-transparent transition-[width] duration-300 ease-out sm:group-hover/rail:w-[var(--year-width)] sm:group-has-[:focus-visible]/rail:w-[var(--year-width)] motion-reduce:transition-none"
              style={{ "--year-width": `${16 + (counts[year] - 1) / Math.max(1, largestCount - 1) * 48}px` }}
            />
          </span>
        </button>
      ))}
    </nav>
  );
}
