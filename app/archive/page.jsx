"use client";

import Link from "next/link";
import { projects } from "../data/projects";
import ProjectLink from "../components/ProjectLink";
import { ChevronRight } from "lucide-react";

export default function Archive() {
  // Sort projects by completion date (most recent first)
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return dateB - dateA; // Descending order (most recent first)
  });

  return (
    <div className="space-y-12 py-12 pt-20">
      <div className="flex flex-col gap-4 mb-10">
        <div className="text-3xl font-heavy italic">archive</div>
        <div className="text-sm">everything i make</div>
      </div>
      <section>
        <div className="space-y-0">
          {sortedProjects.map((project, index) => {
            const projectPath = project.slug ? `/work/${project.slug}` : null;
            const content = (
              <div className="flex items-center justify-between py-4 border-b border-border px-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-secondary font-light min-w-[60px]">
                      {project.year}
                    </span>
                    <span className="text-primary font-light truncate">{project.title}</span>
                    {project.tags && project.tags.length > 0 && (
                      <span className="text-xs text-secondary font-semilight hidden sm:inline">
                        {project.tags.join(", ")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  {project.links && project.links.length > 0 && (
                    <div className="flex items-center gap-3">
                      {project.links.map((link, linkIndex) => (
                        <ProjectLink key={linkIndex} link={link} linkIndex={linkIndex} />
                      ))}
                    </div>
                  )}
                  {project.slug && (
                    <span className="text-xs text-secondary">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            );

            return projectPath ? (
              <Link
                key={index}
                href={projectPath}
                className="block hover:bg-muted/20 transition-colors"
              >
                {content}
              </Link>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
