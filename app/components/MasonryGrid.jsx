"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

// Masonry layout that preserves chronological order left-to-right, top-to-bottom.
// Items are distributed round-robin by index (item i -> column i % numColumns),
// so reading across each row follows the original project order.
export default function MasonryGrid({ projects }) {
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      // matches the lg: breakpoint (1024px) used elsewhere
      setNumColumns(window.innerWidth >= 1024 ? 3 : 1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columns = Array.from({ length: numColumns }, () => []);
  projects.forEach((project, index) => {
    columns[index % numColumns].push({ project, index });
  });

  return (
    <div className="flex gap-x-4 lg:gap-x-8 items-start">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex-1 min-w-0 flex flex-col gap-y-8 lg:gap-y-12">
          {column.map(({ project, index }) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ))}
    </div>
  );
}
