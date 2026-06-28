"use client";

import { getProjectsByTag } from "../data/projects";
import MasonryGrid from "../components/MasonryGrid";

export default function Installation() {
  // Get installation projects and sort by completion date (most recent first)
  const installationProjects = getProjectsByTag("installation");
  const sortedProjects = [...installationProjects].sort((a, b) => {
    return new Date(b.completionDate) - new Date(a.completionDate);
  });

  return (
    <div className="space-y-12 pt-20 pb-24">
      {/* Installation Grid */}
      <section>
        {/* <h2 className="text-xl mb-8 lg:mb-12">
          <span className="italic font-heavy">installation, sculpture, site-specificity</span>
        </h2> */}
        <MasonryGrid projects={sortedProjects} />
      </section>
    </div>
  );
}
