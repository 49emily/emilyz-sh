"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProjectLink from "./ProjectLink";
import { getProjectDestination } from "../data/projects";

export default function ProjectCard({ project }) {
  const router = useRouter();

  const destination = getProjectDestination(project);
  const projectPath = destination && !destination.external ? destination.href : null;
  const firstLinkUrl = destination?.external ? destination.href : null;
  const ProjectCardContent = (
    <div className="flex flex-col overflow-hidden">
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
            sizes="(min-width: 64rem) 33vw, 100vw"
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
      <div className="pt-4 lg:py-4 lg:px-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="flex items-center justify-between italic font-exposure-heavy text-primary">
            <span>{project.title}</span>
          </h3>
          <span className="text-xs font-exposure-light lg:text-sm">
            {project.artMetadata
              ? `${
                  project.artMetadata?.size
                    ? project.artMetadata?.size + " • "
                    : ""
                } ${project.artMetadata?.medium}`
              : project.status}
          </span>
        </div>

        {/* External Links */}
        {project.links && (
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <ProjectLink key={link.url} link={link} />
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
        className="group block cursor-pointer transition-opacity duration-200 ease-out hover:opacity-75 motion-reduce:transition-none"
        onClick={() => router.push(projectPath)}
      >
        {ProjectCardContent}
      </div>
    );
  }

  if (projectPath) {
    return (
      <Link
        href={projectPath}
        className="group block transition-opacity duration-200 ease-out hover:opacity-75 motion-reduce:transition-none"
      >
        {ProjectCardContent}
      </Link>
    );
  }

  if (firstLinkUrl) {
    return (
      <div
        className="group block cursor-pointer transition-opacity duration-200 ease-out hover:opacity-75 motion-reduce:transition-none"
        onClick={() =>
          window.open(firstLinkUrl, "_blank", "noopener,noreferrer")
        }
      >
        {ProjectCardContent}
      </div>
    );
  }

  return (
    <div className="group block transition-all duration-200 ease-out">
      {ProjectCardContent}
    </div>
  );
}
