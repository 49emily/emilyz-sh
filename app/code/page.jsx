import { getProjectsByTag } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export const metadata = {
  title: "code",
};

export default function Code() {
  const codeProjects = getProjectsByTag("code");
  const sortedProjects = [...codeProjects].sort((a, b) => {
    const dateA = new Date(a.completionDate);
    const dateB = new Date(b.completionDate);
    return dateB - dateA;
  });

  return (
    <div className="space-y-12 pt-20 pb-24">
      <section>
        <h2 className="italic text-xl mb-8 lg:mb-12 text-primary font-heavy">
          software, interfaces, AI
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8 lg:gap-y-12 items-start">
          {sortedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
