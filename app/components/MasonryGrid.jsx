"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import ProjectCard from "./ProjectCard";
import YearScroller from "./YearScroller";

export default function MasonryGrid({ projects }) {
  const [numColumns, setNumColumns] = useState(1);
  const galleryRef = useRef(null);
  const sections = useRef({});
  const jumpTarget = useRef(null);
  const jumpTimeout = useRef(null);
  const groups = useMemo(() => {
    const byYear = new Map();
    for (const project of projects) {
      const date = new Date(project.completionDate);
      const year = /^\d{4}$/.test(project.year) || Number.isNaN(date.getTime())
        ? project.year
        : String(date.getUTCFullYear());
      if (!byYear.has(year)) byYear.set(year, []);
      byYear.get(year).push(project);
    }
    return [...byYear.entries()]
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, entries]) => ({
        year,
        projects: [...entries].sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate)),
      }));
  }, [projects]);
  const years = useMemo(() => groups.map(({ year }) => year), [groups]);
  const counts = useMemo(
    () => Object.fromEntries(groups.map(({ year, projects: entries }) => [year, entries.length])),
    [groups],
  );
  const [activeYear, setActiveYear] = useState(years[0]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 64rem)");
    const updateColumns = () => setNumColumns(breakpoint.matches ? 3 : 1);
    updateColumns();
    breakpoint.addEventListener("change", updateColumns);
    return () => breakpoint.removeEventListener("change", updateColumns);
  }, []);

  useEffect(() => {
    if (!years.length) return;
    let frame = null;
    let correction = null;

    const updateYear = () => {
      frame = null;
      const readingLine = Math.max(112, window.innerHeight * 0.3);
      let nextYear = years[0];
      for (const year of years) {
        const section = sections.current[year];
        if (section && section.getBoundingClientRect().top <= readingLine) nextYear = year;
      }
      // The final section may be too short to reach the reading line.
      const gallery = galleryRef.current?.getBoundingClientRect();
      if (gallery && gallery.top < 0 && gallery.bottom <= window.innerHeight + 2) {
        nextYear = years[years.length - 1];
      }
      setActiveYear(nextYear);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateYear);
    };

    // Images and videos can change section heights after the initial render.
    const observer = new ResizeObserver(() => {
      scheduleUpdate();
      if (!jumpTarget.current) return;
      window.clearTimeout(correction);
      correction = window.setTimeout(() => {
        const target = sections.current[jumpTarget.current];
        // Keep a deliberate jump aligned when lazy media above it expands.
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      }, 120);
    });
    const cancelJump = (event) => {
      if (event.target instanceof Element && event.target.closest('[aria-label="Browse projects by year"]') &&
        (event.type === "pointerdown" || event.type === "keydown")) return;
      jumpTarget.current = null;
      window.clearTimeout(jumpTimeout.current);
      window.clearTimeout(correction);
    };
    for (const year of years) {
      if (sections.current[year]) observer.observe(sections.current[year]);
    }
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("wheel", cancelJump, { passive: true });
    window.addEventListener("touchstart", cancelJump, { passive: true });
    window.addEventListener("pointerdown", cancelJump);
    window.addEventListener("keydown", cancelJump);
    updateYear();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("wheel", cancelJump);
      window.removeEventListener("touchstart", cancelJump);
      window.removeEventListener("pointerdown", cancelJump);
      window.removeEventListener("keydown", cancelJump);
      window.clearTimeout(correction);
      window.clearTimeout(jumpTimeout.current);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [years]);

  function scrollToYear(year) {
    jumpTarget.current = year;
    window.clearTimeout(jumpTimeout.current);
    jumpTimeout.current = window.setTimeout(() => { jumpTarget.current = null; }, 5000);
    sections.current[year]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  }

  if (!groups.length) return null;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-stretch gap-x-3 sm:grid-cols-[minmax(0,1fr)_52px] sm:gap-x-8 lg:gap-x-12">
      <div ref={galleryRef} className="min-w-0 space-y-20 lg:space-y-28">
        {groups.map(({ year, projects: entries }) => {
          // Start each year together, then preserve chronological reading order
          // across its masonry columns, left to right.
          const columns = Array.from({ length: numColumns }, () => []);
          entries.forEach((project, index) => columns[index % numColumns].push(project));
          return (
            <section
              key={year}
              id={`projects-${year}`}
              ref={(element) => { sections.current[year] = element; }}
              aria-label={`Projects from ${year}`}
              className="scroll-mt-28"
            >
              <div className="flex items-start gap-x-16">
                {columns.map((column, index) => (
                  <div key={index} className="flex min-w-0 flex-1 flex-col gap-y-14 lg:gap-y-20">
                    {column.map((project) => (
                      <ProjectCard key={project.slug || project.title} project={project} />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <aside className="relative md:left-[max(16px,calc((100vw_-_1200px)/2_-_24px))]">
        <YearScroller years={years} counts={counts} activeYear={activeYear} onSelect={scrollToYear} />
      </aside>
    </div>
  );
}
