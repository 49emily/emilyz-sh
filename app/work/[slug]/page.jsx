"use client";

import { useParams } from "next/navigation";
import WhatDoYouDreamAbout from "../../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../../components/works/LettersToMyMom";
import DiffusionMe from "../../components/works/DiffusionMe";
import { projects, paintings, getPaintingBySlug } from "../../data/projects";

const componentMap = {
  "what-do-you-dream-about": WhatDoYouDreamAbout,
  "letters-to-my-mom": LettersToMyMom,
  "emily-diffusion": DiffusionMe,
};

// Component for displaying paintings/visual art
function PaintingDisplay({ painting }) {
  const displayImages = painting.images || [painting.image];

  return (
    <div className="min-h-screen py-12 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl mb-4 text-primary">{painting.title}</h1>

        {/* Metadata */}
        <div className="text-xl mb-8 text-primary space-y-1">
          <p>
            <i className="text-secondary">medium:</i> {painting.medium}
          </p>
          {painting.size && (
            <p>
              <i className="text-secondary">size:</i> {painting.size}
            </p>
          )}
          <p>
            <i className="text-secondary">year:</i> {painting.year}
          </p>
          {painting.exhibitions && painting.exhibitions.length > 0 && (
            <p>
              <i className="text-secondary">exhibitions:</i> {painting.exhibitions.join(", ")}
            </p>
          )}
        </div>

        {/* Description */}
        {painting.description && (
          <div className="text-lg font-light max-w-none text-primary">
            {painting.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Images */}
        <div className="space-y-8 mt-12">
          {displayImages.map((imagePath, index) => (
            <div key={index} className="relative w-full">
              <img
                src={imagePath}
                alt={`${painting.title}${displayImages.length > 1 ? ` - Image ${index + 1}` : ""}`}
                className="w-full h-auto"
              />
            </div>
          ))}

          {painting.video && (
            <div className="relative w-full">
              <video controls className="w-full h-auto" poster={painting.image}>
                <source src={painting.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  const params = useParams();
  const slug = params.slug;

  // Check if it's a painting/visual art piece
  const painting = getPaintingBySlug(slug);
  if (painting) {
    return <PaintingDisplay painting={painting} />;
  }

  // Otherwise, check if it's a code project with custom component
  const project = projects.find((p) => p.path === `/work/${slug}`);
  const Component = componentMap[slug];

  if (!Component || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary">Project not found</p>
      </div>
    );
  }

  return <Component links={project.links || []} />;
}
