"use client";

import { getProjectsByTag } from "../data/projects";
import MasonryGrid from "../components/MasonryGrid";

export default function Installation() {
  // Get installation projects and sort by completion date (most recent first)
  const installationProjects = getProjectsByTag("installation");
  const sortedProjects = [...installationProjects].sort((a, b) => {
    return new Date(b.completionDate) - new Date(a.completionDate);
  });

  return <MasonryGrid projects={sortedProjects} />;
}
