"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function ProjectCard({ project }) {
  const router = useRouter();

  const ProjectCardContent = (
    <div
      className={`overflow-hidden border-2 border-transparent ${
        project.path ? "hover:border-accent" : ""
      } transition-all duration-200 flex flex-col`}
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500"
            loading="eager"
            decoding="async"
            style={{
              backgroundColor: "#f3f4f6",
              willChange: "transform",
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-muted">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-md">{project.status}</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="py-6 px-4 flex-grow flex flex-col">
        <div className="mb-3">
          <h3 className="text-2xl mb-1 group-hover:text-accent transition-colors text-primary flex items-start justify-between">
            <span>{project.title}</span>
            {project.path && (
              <ChevronRight className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            )}
          </h3>
          <span className="text-md text-secondary">
            {project.artMetadata
              ? `${project.artMetadata?.size ? project.artMetadata?.size + " • " : ""} ${
                  project.artMetadata?.medium
                } • ${project.year}`
              : `${project.status} • ${project.year}`}
          </span>
        </div>

        {/* Exhibition Tags */}
        {project.artMetadata?.exhibitions && project.artMetadata.exhibitions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.artMetadata.exhibitions.map((exhibition, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 bg-highlight text-primary text-sm rounded-full"
              >
                {exhibition}
              </span>
            ))}
          </div>
        )}

        {/* External Links */}
        {project.links && (
          <div className="flex flex-wrap gap-2">
            {project.links.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-2 py-1 bg-highlight hover:bg-muted/50 hover:dark:bg-muted text-primary text-sm rounded-full transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {link.icon === "github" ? (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ) : link.icon === "twitter" ? (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ) : (
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // If project has both path and external links, use onClick to avoid nested <a> tags
  if (project.path && project.links && project.links.length > 0) {
    return (
      <div
        className="group block transition-all duration-200 ease-out cursor-pointer"
        onClick={() => router.push(project.path)}
      >
        {ProjectCardContent}
      </div>
    );
  }

  return project.path ? (
    <Link href={project.path} className="group block transition-all duration-200 ease-out">
      {ProjectCardContent}
    </Link>
  ) : (
    <div className="group block transition-all duration-200 ease-out">{ProjectCardContent}</div>
  );
}
