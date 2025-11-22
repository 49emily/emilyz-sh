"use client";

import { useParams } from "next/navigation";
import WhatDoYouDreamAbout from "../../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../../components/works/LettersToMyMom";
import DiffusionMe from "../../components/works/DiffusionMe";
import PaintingDisplay from "../../components/PaintingDisplay";
import { getProjectBySlug } from "../../data/projects";

const componentMap = {
  "what-do-you-dream-about": WhatDoYouDreamAbout,
  "letters-to-my-mom": LettersToMyMom,
  "emily-diffusion": DiffusionMe,
};

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

  // If it has a component, render the custom component
  const Component = project.component ? componentMap[project.component] : null;

  if (Component) {
    return <Component links={project.links || []} />;
  }

  // If it has artMetadata, render the painting display
  if (project.artMetadata) {
    return <PaintingDisplay project={project} />;
  }

  // No page exists for this project
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-2xl text-primary">No page available for this project</p>
    </div>
  );
}
