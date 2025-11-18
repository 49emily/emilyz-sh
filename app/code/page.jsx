"use client";

import { getProjectsByTag } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export const dynamic = "force-dynamic";

export default function Code() {
  // Get code projects and sort by completion date (most recent first)
  const codeProjects = getProjectsByTag("code");
  const sortedProjects = [...codeProjects].sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return dateB - dateA; // Descending order (most recent first)
  });

  return (
    <div className="space-y-12 pt-16 pb-24">
      {/* Projects Section */}
      <section>
        <h2 className="text-2xl mb-8">
          <i className="text-primary">software, interfaces, AI</i>
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
