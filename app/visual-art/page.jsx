import { getProjectsByTag } from "../data/projects";
import Link from "next/link";
import Image from "next/image";

export default function VisualArt() {
  // Get visual art projects and sort by completion date (most recent first)
  const visualArtProjects = getProjectsByTag("visual-art");
  const sortedProjects = [...visualArtProjects].sort((a, b) => {
    return new Date(b.completionDate) - new Date(a.completionDate);
  });

  return (
    <div className="space-y-12 pt-16 pb-24">
      {/* Visual Art Grid */}
      <section>
        <h2 className="text-2xl mb-8">
          <i className="text-secondary">painting, drawing, video</i>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
          {sortedProjects.map((project, index) => {
            const ProjectCard = (
              <div
                className={`overflow-hidden border-2 border-transparent ${
                  project.path ? "hover:border-accent" : ""
                } transition-all duration-200 flex flex-col`}
              >
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500"
                    loading="eager"
                    decoding="async"
                    style={{
                      backgroundColor: "#f3f4f6",
                      willChange: "transform",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="py-6 px-4 flex-grow flex flex-col">
                  <div className="mb-3">
                    <h3 className="text-2xl mb-1 group-hover:text-accent transition-colors text-primary">
                      {project.title}
                    </h3>
                    <span className="text-md text-secondary">
                      {project.artMetadata
                        ? `${project.artMetadata?.size ? project.artMetadata?.size + " • " : ""} ${
                            project.artMetadata?.medium
                          } • ${project.year}`
                        : `${project.status} • ${project.year}`}
                    </span>
                  </div>

                  {/* Exhibition Tags */}
                  {project.artMetadata?.exhibitions &&
                    project.artMetadata.exhibitions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.artMetadata.exhibitions.map((exhibition, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 bg-highlight text-primary text-sm rounded-full"
                          >
                            {exhibition}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            );

            return project.path ? (
              <Link
                key={index}
                href={project.path}
                className="group block transition-all duration-200 ease-out"
              >
                {ProjectCard}
              </Link>
            ) : (
              <div key={index} className="group block transition-all duration-200 ease-out">
                {ProjectCard}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
