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
        <h2 className="text-3xl mb-8">
          <i className="font-heavy">painting, drawing, video</i>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
