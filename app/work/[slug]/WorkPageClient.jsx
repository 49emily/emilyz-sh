"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import WhatDoYouDreamAbout from "../../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../../components/works/LettersToMyMom";
import DiffusionMe from "../../components/works/DiffusionMe";
import { getProjectBySlug } from "../../data/projects";

const componentMap = {
  "what-do-you-dream-about": WhatDoYouDreamAbout,
  "letters-to-my-mom": LettersToMyMom,
  "emily-diffusion": DiffusionMe,
};

// Component for displaying paintings/visual art
function PaintingDisplay({ project }) {
  const { artMetadata } = project;
  const displayImages = artMetadata.images || [project.image];

  return (
    <div className="min-h-screen py-12 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl mb-4 text-primary">{project.title}</h1>

        {/* Metadata */}
        <div className="text-xl mb-8 text-primary space-y-1">
          <p>
            <i className="text-secondary">medium:</i> {artMetadata.medium}
          </p>
          {artMetadata.size && (
            <p>
              <i className="text-secondary">size:</i> {artMetadata.size}
            </p>
          )}
          <p>
            <i className="text-secondary">year:</i> {project.year}
          </p>
          {artMetadata.exhibitions && artMetadata.exhibitions.length > 0 && (
            <p>
              <i className="text-secondary">exhibitions:</i> {artMetadata.exhibitions.join(", ")}
            </p>
          )}
        </div>

        {/* Description */}
        {artMetadata.description && (
          <div className="text-lg font-light max-w-none text-primary">
            {artMetadata.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Images */}
        <div className="space-y-8 mt-12">
          {displayImages.map((imagePath, index) => (
            <div key={index} className="relative w-full bg-gray-100">
              <div className="relative w-full" style={{ aspectRatio: "auto", minHeight: "400px" }}>
                <Image
                  src={imagePath}
                  alt={`${project.title}${displayImages.length > 1 ? ` - Image ${index + 1}` : ""}`}
                  width={1920}
                  height={1440}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                  className="w-full h-auto object-contain"
                  priority={index === 0}
                  style={{ backgroundColor: "#f3f4f6" }}
                />
              </div>
            </div>
          ))}

          {artMetadata.video && (
            <div className="relative w-full">
              <video controls className="w-full h-auto" poster={project.image}>
                <source src={artMetadata.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkPageClient() {
  const params = useParams();
  const slug = params.slug;

  // Get project by slug
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary">Project not found</p>
      </div>
    );
  }

  // If it has artMetadata, render the painting display
  if (project.artMetadata) {
    return <PaintingDisplay project={project} />;
  }

  // If it has a component, render the custom component
  const Component = project.component ? componentMap[project.component] : null;

  if (Component) {
    return <Component links={project.links || []} />;
  }

  // No page exists for this project
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-2xl text-primary">No page available for this project</p>
    </div>
  );
}
