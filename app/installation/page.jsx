"use client";

import { getProjectsByTag } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Installation() {
  // Get installation projects and sort by completion date (most recent first)
  const installationProjects = getProjectsByTag("installation");
  const sortedProjects = [...installationProjects].sort((a, b) => {
    return new Date(b.completionDate) - new Date(a.completionDate);
  });

  return (
    <div className="space-y-12 pt-20 pb-24">
      {/* Installation Grid */}
      <section>
        <h2 className="text-xl mb-12">
          <span className="font-light">installation, sculpture, site-specificity</span>
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
