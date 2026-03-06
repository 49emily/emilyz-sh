"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ProjectLink from "./ProjectLink";

export default function ProjectCard({ project }) {
  const router = useRouter();

  const ProjectCardContent = (
    <div
      className={`overflow-hidden border-2 border-transparent ${
        project.slug ? "hover:border-accent" : ""
      } transition-all duration-200 flex flex-col`}
    >
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-muted">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm lg:text-base">{project.status}</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-6 lg:py-6 lg:px-4 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg lg:text-xl mb-1 font-semiheavy group-hover:text-accent transition-colors text-primary flex items-center justify-between">
            <span>{project.title}</span>
            {project.slug && (
              <ChevronRight className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            )}
          </h3>
          <span className="text-xs lg:text-sm font-semilight">
            {project.artMetadata
              ? `${
                  project.artMetadata?.size
                    ? project.artMetadata?.size + " • "
                    : ""
                } ${project.artMetadata?.medium} • ${project.year}`
              : `${project.status} • ${project.year}`}
          </span>
        </div>

        {/* Exhibition Tags */}
        {project.artMetadata?.exhibitions &&
          project.artMetadata.exhibitions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.artMetadata.exhibitions.map((exhibition, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 border text-primary font-semilight text-xs lg:text-sm rounded-full"
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
              <ProjectLink key={linkIndex} link={link} linkIndex={linkIndex} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const projectPath = project.slug ? `/work/${project.slug}` : null;

  // If project has both slug and external links, use onClick to avoid nested <a> tags
  if (project.slug && project.links && project.links.length > 0) {
    return (
      <div
        className="group block transition-all duration-200 ease-out cursor-pointer"
        onClick={() => router.push(projectPath)}
      >
        {ProjectCardContent}
      </div>
    );
  }

  return project.slug ? (
    <Link
      href={projectPath}
      className="group block transition-all duration-200 ease-out"
    >
      {ProjectCardContent}
    </Link>
  ) : (
    <div className="group block transition-all duration-200 ease-out">
      {ProjectCardContent}
    </div>
  );
}
