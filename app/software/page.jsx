import { getProjectsByTag } from "../data/projects";
import MasonryGrid from "../components/MasonryGrid";

export const metadata = {
  title: "Software",
};

export default function Software() {
  const softwareProjects = getProjectsByTag("software");
  const sortedProjects = [...softwareProjects].sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return dateB - dateA;
  });

  return <MasonryGrid projects={sortedProjects} />;
}
