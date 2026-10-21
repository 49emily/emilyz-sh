import { projects } from "../data/projects";
import MasonryGrid from "../components/MasonryGrid";

const artwork = projects.filter((project) =>
  !project.archiveOnly && project.tags?.includes("visual-art") &&
  !project.tags.includes("installation")
).sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));

export default function VisualArt() {
  return (
    <div>
      <h1 className="sr-only">Painting</h1>
      <MasonryGrid projects={artwork} />
    </div>
  );
}
