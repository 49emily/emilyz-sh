"use client";

import { useParams } from "next/navigation";
import WhatDoYouDreamAbout from "../../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../../components/works/LettersToMyMom";
import DiffusionMe from "../../components/works/DiffusionMe";
import { projects } from "../../data/projects";

const componentMap = {
  "what-do-you-dream-about": WhatDoYouDreamAbout,
  "letters-to-my-mom": LettersToMyMom,
  "emily-diffusion": DiffusionMe,
};

export default function WorkPage() {
  const params = useParams();
  const slug = params.slug;

  // Find the project by constructing the full path
  const project = projects.find((p) => p.path === `/work/${slug}`);

  // Get the component from the map
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
