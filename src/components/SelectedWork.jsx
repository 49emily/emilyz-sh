import { Link } from "react-router-dom";
import whatdoyoudreamImage from "../assets/projects/whatdoyoudream.png";
import lettersToMyMomImage from "../assets/projects/letters.jpg";
import pearlImage from "../assets/projects/pearl.jpeg";
function SelectedWork() {
  const projects = [
    {
      title: "what do you dream about?",
      year: "2025",
      path: "/work/what-do-you-dream-about",
      description:
        "An interactive media installation that asks viewers machine-generated questions and generates real-time interpretations using Stream Diffusion.",
      image: whatdoyoudreamImage,
      status: "Interactive Installation",
      links: [
        // {
        //   label: "GitHub",
        //   url: "https://github.com/emilyz49/what-do-you-dream-about",
        //   icon: "github",
        // },
        // { label: "Demo", url: "https://what-do-you-dream-about.com", icon: "external" },
      ],
    },
    {
      title: "Letters to my Mom",
      year: "2025",
      path: "/work/letters-to-my-mom",
      description:
        "A personal exploration of family, identity, and cross-cultural communication through digital storytelling.",
      image: lettersToMyMomImage, // placeholder for now
      status: "Coming Soon",
      links: [
        { label: "GitHub", url: "https://github.com/49emily/ai-art-calligraphy", icon: "github" },
      ],
    },
    {
      title: "diffusion-me",
      year: "2025",
      path: "/work/diffusion-me",
      description:
        "An exploration of AI-generated self-representation and identity through diffusion models.",
      image: null, // placeholder for now
      status: "training a generative model on my own art",
      links: [
        { label: "GitHub", url: "https://github.com/emilyz49/diffusion-me", icon: "github" },
        { label: "Paper", url: "https://arxiv.org/abs/2501.00000", icon: "external" },
      ],
    },
    {
      title: "prl",
      year: "2024-25",
      path: null,
      description:
        "A collaborative project exploring the intersection of technology and human relationships.",
      image: pearlImage, // placeholder for now
      status: "The journal that reflects with you. Scaled to 2000+ users.",
      links: [
        // { label: "GitHub", url: "https://github.com/emilyz49/prl", icon: "github" },
        { label: "Live Site", url: "https://www.writewithprl.com/", icon: "external" },
        { label: "Info", url: "https://info.writewithprl.com/", icon: "external" },
        { label: "Updates", url: "https://x.com/writewithprl", icon: "twitter" },
        {
          label: "Product Hunt",
          url: "https://www.producthunt.com/products/pearl-8",
          icon: "external",
        },
      ],
    },
    {
      title: "prl iOS",
      year: "2025",
      path: null,
      description:
        "Mobile companion to the prl project, designed for intimate, personal interactions.",
      image: null, // placeholder for now
      status: "Mobile companion to writewithprl.com, coming soon to the iOS App Store.",
      links: [
        { label: "GitHub", url: "https://github.com/emilyz49/prl-mobile", icon: "github" },
        { label: "Updates", url: "https://x.com/writewithprl", icon: "twitter" },
      ],
    },
    {
      title: "Tangent",
      year: "2025",
      path: null,
      description:
        "A creative exploration of unexpected connections and divergent thinking patterns.",
      image: null, // placeholder for now
      status: "An experimental browser that acts as your second brain.",
      links: [
        {
          label: "Demo",
          url: "https://x.com/emilyzsh/status/1882154398597734419",
          icon: "twitter",
        },
      ],
    },
    {
      title: "StyleScape",
      year: "2024",
      path: "/work/stylescape",
      description:
        "A visual journey through different aesthetic landscapes and design philosophies.",
      image: null, // placeholder for now
      status: "infinitely generated world walkthroughs",
      links: [
        { label: "GitHub", url: "https://github.com/49emily/stylescape", icon: "github" },
        {
          label: "Project Page",
          url: "https://cs231n-final-project-stylescape.vercel.app/",
          icon: "external",
        },
      ],
    },
  ];

  const visualArtItems = [
    {
      title: "Digital Landscapes",
      year: "2024",
      description: "Generative art exploring natural forms through algorithmic processes.",
      status: "Digital Art",
    },
    {
      title: "Identity Fragments",
      year: "2024",
      description: "Mixed media exploration of cultural identity and belonging.",
      status: "Mixed Media",
    },
    {
      title: "Machine Dreams",
      year: "2025",
      description: "AI-generated visual narratives examining consciousness and creativity.",
      status: "AI-Generated",
    },
  ];

  return (
    <div className="space-y-12">
      <div className="mb-12">
        <p className="text-md">
          ~ an ongoing internet archive dedicated to the process of making new things
        </p>
      </div>

      {/* Projects Section */}
      <section>
        <h2 className="text-3xl font-light mb-8">
          <i>Projects</i>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const ProjectCard = (
              <div className="bg-white backdrop-blur-sm overflow-hidden border-2 border-transparent hover:border-black transition-all duration-200">
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
                      <div className="text-center text-gray-500">
                        <div className="text-2xl mb-2">📱</div>
                        <div className="text-sm font-light">{project.status}</div>
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
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-light mb-1 group-hover:text-gray-900 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500 font-light">{project.status}</span>
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
                          className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
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
                    <div className="mt-4 flex items-center text-gray-400 group-hover:text-gray-600 transition-colors">
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
        <h2 className="text-3xl font-light mb-8">
          <i>Visual Art</i>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visualArtItems.map((item, index) => (
            <div key={index} className="group block transition-all duration-200 ease-out">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-transparent hover:border-black transition-all duration-200">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-200 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-2xl mb-2">🎨</div>
                      <div className="text-sm font-light">{item.status}</div>
                    </div>
                  </div>

                  {/* Overlay with status */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-light mb-1 group-hover:text-gray-900 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500 font-light">{item.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SelectedWork;
