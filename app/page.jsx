import { getProjectsByTag } from "./data/projects";
import ProjectCard from "./components/ProjectCard";

export default function Home() {
  const codeProjects = getProjectsByTag("code");
  const sortedProjects = [...codeProjects].sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return dateB - dateA;
  });

  return (
    <div className="space-y-12 pt-20 pb-24">
      <section>
        <h2 className="text-xl mb-12 text-primary font-light">
          software, interfaces, AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
