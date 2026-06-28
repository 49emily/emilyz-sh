"use client";

import { getProjectsByTag } from "../data/projects";
import MasonryGrid from "../components/MasonryGrid";

export default function VisualArt() {
  // Get visual art projects and sort by completion date (most recent first)
  const visualArtProjects = getProjectsByTag("visual-art");
  const sortedProjects = [...visualArtProjects].sort((a, b) => {
    return new Date(b.completionDate) - new Date(a.completionDate);
  });

  return (
    <div className="space-y-12 pt-20 pb-24">
      {/* Visual Art Grid */}
      <section>
        {/* <h2 className="text-xl mb-8 lg:mb-12">
          <span className="italic font-heavy">painting, drawing, video</span>
        </h2> */}
        <MasonryGrid projects={sortedProjects} />
      </section>
    </div>
  );
}
