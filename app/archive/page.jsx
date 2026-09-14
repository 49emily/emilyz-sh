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
      <div className="flex flex-col gap-4 mb-6 lg:mb-10">
        <div className="text-xl font-heavy italic">everything i make</div>
      </div>
      <section>
        <div className="space-y-0">
          {sortedProjects.map((project, index) => {
            const projectPath = project.slug ? `/work/${project.slug}` : null;
            const firstLinkUrl = project.links?.[0]?.url || null;
            const isClickable = Boolean(projectPath || firstLinkUrl);
            const content = (
              <div className="px-1 py-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 sm:gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-8 flex-1 min-w-0">
                      <span className="text-sm font-light min-w-[40px] sm:min-w-[60px]">
                        {project.year}
                      </span>
                      <span className="text-primary text-sm font-semiheavy truncate">
                        {project.title}
                      </span>
                      {project.tags && project.tags.length > 0 && (
                        <span className="text-xs font-light hidden sm:inline">
                          {project.tags.join(", ")}
                        </span>
                      )}
                    </div>
                    {isClickable && (
                      <span className="text-xs flex-shrink-0 sm:hidden">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 sm:flex-shrink-0 mt-2 sm:mt-0">
                    {project.links && project.links.length > 0 && (
                      <div className="flex items-center gap-3 flex-wrap pl-[56px] sm:pl-0">
                        {project.links.map((link, linkIndex) => (
                          <ProjectLink
                            key={linkIndex}
                            link={link}
                            linkIndex={linkIndex}
                            compact
                          />
                        ))}
                      </div>
                    )}
                    {isClickable && (
                      <span className="text-xs flex-shrink-0 hidden sm:block">
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );

            return projectPath ? (
              <Link
                key={index}
                href={projectPath}
                className="block hover:bg-muted/15 focus-visible:bg-muted/15 transition-none"
              >
                {content}
              </Link>
            ) : firstLinkUrl ? (
              <div
                key={index}
                role="link"
                tabIndex={0}
                className="block cursor-pointer hover:bg-muted/15 focus-visible:bg-muted/15 transition-none"
                onClick={() =>
                  window.open(firstLinkUrl, "_blank", "noopener,noreferrer")
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    event.target === event.currentTarget
                  ) {
                    window.open(firstLinkUrl, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                {content}
              </div>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
