"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProjectLink from "./ProjectLink";

export default function ProjectCard({ project }) {
  const router = useRouter();

  const projectPath = project.slug ? `/work/${project.slug}` : null;
  const firstLinkUrl = project.links?.[0]?.url || null;
  const isClickable = Boolean(projectPath || firstLinkUrl);

  const ProjectCardContent = (
    <div
      className={`overflow-hidden border-2 border-transparent ${
        isClickable ? "hover:border-accent" : ""
      } transition-all duration-200 flex flex-col`}
    >
      {/* Image / Video */}
      <div className="relative overflow-hidden">
        {project.video ? (
          <video
            src={project.video}
            poster={project.image || undefined}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-auto transition-transform duration-500"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={0}
            height={0}
            className="w-full h-auto transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="aspect-square w-full flex items-center justify-center">
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
          </h3>
          <span className="text-xs lg:text-sm">
            {project.artMetadata
              ? `${
                  project.artMetadata?.size ? project.artMetadata?.size + " • " : ""
                } ${project.artMetadata?.medium} • ${project.year}`
              : `${project.status} • ${project.year}`}
          </span>
        </div>

        {/* Exhibition Tags */}
        {project.artMetadata?.exhibitions && project.artMetadata.exhibitions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.artMetadata.exhibitions.map((exhibition, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 text-primary font-semilight project-link hover-none text-xs lg:text-sm rounded-full"
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

  // Projects with internal pages and external links use onClick to avoid nested <a> tags.
  // Projects without a page open their first external link in a new tab.
  if (projectPath && project.links && project.links.length > 0) {
    return (
      <div
        className="group block transition-all duration-200 ease-out cursor-pointer"
        onClick={() => router.push(projectPath)}
      >
        {ProjectCardContent}
      </div>
    );
  }

  if (projectPath) {
    return (
      <Link href={projectPath} className="group block transition-all duration-200 ease-out">
        {ProjectCardContent}
      </Link>
    );
  }

  if (firstLinkUrl) {
    return (
      <div
        className="group block transition-all duration-200 ease-out cursor-pointer"
        onClick={() => window.open(firstLinkUrl, "_blank", "noopener,noreferrer")}
      >
        {ProjectCardContent}
      </div>
    );
  }

  return <div className="group block transition-all duration-200 ease-out">{ProjectCardContent}</div>;
}
