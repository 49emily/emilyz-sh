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

  return (
    <div className="space-y-12 pt-20">
      <section>
        {/* <h2 className="italic text-xl mb-8 lg:mb-12 text-primary font-exposure-semibold">
          software, interfaces, AI
        </h2> */}
        <MasonryGrid projects={sortedProjects} />
      </section>
    </div>
  );
}
