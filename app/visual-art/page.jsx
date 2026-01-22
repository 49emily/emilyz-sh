"use client";

import { getProjectsByTag } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

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
        <h2 className="text-xl mb-8 lg:mb-12">
          <span className="italic font-heavy">painting, drawing, video</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-12 items-start">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
