import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { projects } from "../data/projects";

function SelectedWork() {
  const [sortBy, setSortBy] = useState("date-desc"); // date-desc, date-asc, creative-desc, creative-asc
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sort projects based on current sort option
  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.completionDate) - new Date(a.completionDate);
      case "date-asc":
        return new Date(a.completionDate) - new Date(b.completionDate);
      case "creative-desc":
        return b.creativeRating - a.creativeRating;
      case "creative-asc":
        return a.creativeRating - b.creativeRating;
      default:
        return 0;
    }
  });

  const getSortLabel = () => {
    switch (sortBy) {
      case "date-desc":
        return "Newest first";
      case "date-asc":
        return "Oldest first";
      case "creative-desc":
        return "Most creative";
      case "creative-asc":
        return "Most techy";
      default:
        return "Sort";
    }
  };

  return (
    <div className="space-y-12 py-12 pt-20 lg:pt-12">
      <div className="mb-12">
        <p className="text-md text-primary">~ an ongoing internet archive</p>
      </div>

      {/* Projects Section */}
      <section>
        <div className="flex flex-row items-center justify-between mb-8">
          <h2 className="text-3xl  text-primary">
            <i>Projects</i>
          </h2>

          {/* Sort Controls */}
          <div className="relative" ref={sortMenuRef}>
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-3 py-2 glass glass-hover text-primary rounded-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              <span className="text-sm">{getSortLabel()}</span>
              <svg
                className={`w-3 h-3 transition-transform ${showSortMenu ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 text-primary">
                <div className="pt-2">
                  <div className="px-3 py-1 text-xs font-medium text-muted uppercase tracking-wide">
                    By Date
                  </div>
                  <button
                    onClick={() => {
                      setSortBy("date-desc");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/20 transition-colors ${
                      sortBy === "date-desc" ? "bg-muted/20" : "text-secondary"
                    }`}
                  >
                    Newest first
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("date-asc");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/20 transition-colors ${
                      sortBy === "date-asc" ? "bg-muted/20" : "text-secondary"
                    }`}
                  >
                    Oldest first
                  </button>

                  <div className="border-t border-gray-200 dark:border-gray-600 mb-2"></div>

                  <div className="px-3 py-1 text-xs font-medium text-muted uppercase tracking-wide">
                    By Type
                  </div>
                  <button
                    onClick={() => {
                      setSortBy("creative-desc");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/20 transition-colors ${
                      sortBy === "creative-desc" ? "bg-muted/20" : "text-secondary"
                    }`}
                  >
                    Art → Tech
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("creative-asc");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/20 transition-colors ${
                      sortBy === "creative-asc" ? "bg-muted/20" : "text-secondary"
                    }`}
                  >
                    Tech → Art
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project, index) => {
            const ProjectCard = (
              <div className="glass backdrop-blur-sm overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-200 h-full flex flex-col">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-muted">
                        <div className="text-2xl mb-2">📱</div>
                        <div className="text-md">{project.status}</div>
                      </div>
                    </div>
                  )}

                  {/* Overlay with status */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-3">
                    <h3 className="text-xl mb-1 group-hover:text-accent transition-colors text-primary">
                      {project.title}
                    </h3>
                    <span className="text-sm text-secondary">{project.status}</span>
                  </div>

                  {/* External Links */}
                  {project.links && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2 py-1 bg-highlight hover:bg-muted/10 text-primary text-sm rounded-full transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.icon === "github" ? (
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          ) : link.icon === "twitter" ? (
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          )}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Subtle arrow indicator - only show if path exists */}
                  {project.path && (
                    <div className="mt-auto pt-4 flex items-center text-muted group-hover:text-secondary transition-colors">
                      <span className="text-sm">More details</span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );

            return project.path ? (
              <Link
                key={index}
                to={project.path}
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

      {/* Visual Art Section */}
      <section>
        <h2 className="text-3xl mb-8 text-primary">
          <i>Visual Art</i>
        </h2>
        <iframe
          src="https://v2-embednotion.com/104b4250a017802b8390d94e5a2eea36"
          style={{
            width: "100%",
            height: "600px",
            border: "2px solid #ccc",
            borderRadius: "10px",
            padding: "none",
          }}
        ></iframe>
      </section>
    </div>
  );
}

export default SelectedWork;
