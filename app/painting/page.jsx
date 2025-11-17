import { paintings } from "../data/projects";
import Link from "next/link";
import Image from "next/image";

export default function Painting() {
  // Sort paintings by completion date (most recent first)
  const sortedPaintings = [...paintings].sort((a, b) => {
    return new Date(b.completionDate) - new Date(a.completionDate);
  });

  return (
    <div className="space-y-12 pt-16 pb-24">
      {/* Visual Art Grid */}
      <section>
        <h2 className="text-2xl mb-8">
          <i className="text-secondary">medium:</i> visual art
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
          {sortedPaintings.map((painting) => (
            <Link
              key={painting.slug}
              href={painting.path}
              className="group block transition-all duration-200 ease-out"
            >
              <div className="overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-200 flex flex-col">
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden">
                  <img
                    src={painting.image}
                    alt={painting.title}
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="py-6 px-4 flex-grow flex flex-col">
                  <div className="mb-3">
                    <h3 className="text-2xl mb-1 group-hover:text-accent transition-colors text-primary">
                      {painting.title}
                    </h3>
                    <span className="text-md text-secondary">
                      {painting.size} • {painting.medium} • {painting.year}
                    </span>
                  </div>

                  {/* Exhibition Tags */}
                  {painting.exhibitions && painting.exhibitions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {painting.exhibitions.map((exhibition, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-highlight text-primary text-sm rounded-full"
                        >
                          {exhibition}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
