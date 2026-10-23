"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useSuperHoverRef } from "super-hover/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects, getProjectDestination } from "../data/projects";
import ProjectLink from "../components/ProjectLink";

const sortedProjects = [...projects].sort(
  (a, b) => new Date(b.completionDate) - new Date(a.completionDate),
);
const columns =
  "grid grid-cols-[3rem_minmax(0,1fr)_1rem] gap-x-3 sm:grid-cols-[4rem_minmax(0,1fr)_9rem_minmax(0,12rem)] sm:gap-x-8 xl:grid-cols-[4rem_minmax(0,1fr)_9rem_minmax(0,16rem)] 2xl:grid-cols-[4rem_minmax(0,1fr)_9rem_minmax(0,20rem)]";

export default function Archive() {
  const [preview, setPreview] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();
  const archiveRef = useSuperHoverRef({
    enabled: !reducedMotion,
    onEnter({ detail: { current, x, y } }) {
      const project =
        sortedProjects[Number(current?.getAttribute("data-project-index"))];
      if (project) showPreview(project, { clientX: x, clientY: y });
    },
    onLeave() {
      setPreview(null);
    },
    onMove({ detail: { x, y } }) {
      movePreview({ clientX: x, clientY: y });
    },
  });

  function showPreview(project, event) {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const image = project.image || project.artMetadata?.images?.[0];
    const video = project.video || project.artMetadata?.video;
    setPreview(image || video ? { title: project.title, image, video } : null);
    movePreview(event);
  }

  function movePreview(event) {
    const keyboard = event.type === "focus";
    const next = {
      x: keyboard
        ? window.innerWidth - 292
        : Math.max(16, Math.min(event.clientX + 24, window.innerWidth - 292)),
      y: keyboard
        ? window.innerHeight - 236
        : Math.max(16, Math.min(event.clientY + 24, window.innerHeight - 236)),
    };
    setPosition((current) =>
      current.x === next.x && current.y === next.y ? current : next,
    );
  }

  return (
    <div>
      <section ref={archiveRef} aria-label="Project archive">
        {sortedProjects.map((project, index) => {
          const destination = getProjectDestination(project);
          const projectPath =
            destination && !destination.external ? destination.href : null;
          const firstLinkUrl = destination?.external ? destination.href : null;
          const isClickable = Boolean(destination);
          return (
            <div
              key={project.slug || project.title}
              data-super-hover={isClickable ? "" : undefined}
              data-project-index={index}
              className={`group/archive relative ${columns} items-start gap-y-2 px-0 py-2 md:px-3 text-sm transition-colors duration-200 motion-reduce:transition-none ${
                isClickable
                  ? "text-primary data-[super-hover-active]:bg-gray-100 focus-within:bg-gray-100 motion-reduce:hover:bg-gray-100"
                  : "text-gray-500"
              }`}
              onPointerEnter={
                isClickable && reducedMotion
                  ? (event) => showPreview(project, event)
                  : undefined
              }
              onPointerMove={
                isClickable && reducedMotion ? movePreview : undefined
              }
              onPointerLeave={
                isClickable && reducedMotion
                  ? () => setPreview(null)
                  : undefined
              }
              onFocus={
                isClickable ? (event) => showPreview(project, event) : undefined
              }
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setPreview(null);
              }}
            >
              {projectPath ? (
                <Link
                  href={projectPath}
                  aria-label={project.title}
                  className="absolute inset-0 z-[1]"
                />
              ) : firstLinkUrl ? (
                <a
                  href={firstLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.title}
                  className="absolute inset-0 z-[1]"
                />
              ) : null}
              <span className="font-exposure-regular">{project.year}</span>
              <span className="min-w-0 font-exposure-semibold">
                {project.title}
              </span>
              <span className="hidden text-sm leading-5 font-exposure-regular capitalize sm:block">
                {project.tags?.join(", ")}
              </span>
              {isClickable && (
                <ArrowUpRight aria-hidden="true" className="pointer-events-none mt-0.5 size-4 sm:hidden" strokeWidth={1.5} />
              )}
              {project.links?.length > 0 && (
                <div className="relative z-[2] hidden flex-wrap justify-end gap-2 sm:col-start-4 sm:col-end-5 sm:flex">
                  {project.links.map((link) => (
                    <ProjectLink
                      key={link.url}
                      link={link}
                      compact
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
      {preview && (
        <div
          className="pointer-events-none fixed z-20 h-[220px] w-[276px]"
          style={{ left: position.x, top: position.y }}
          aria-hidden="true"
        >
          {preview.image ? (
            <Image
              key={preview.image}
              src={preview.image}
              alt=""
              fill
              sizes="276px"
              className="object-contain"
              onError={() => setPreview(null)}
            />
          ) : (
            <video
              key={preview.video}
              src={preview.video}
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-contain"
              onError={() => setPreview(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
