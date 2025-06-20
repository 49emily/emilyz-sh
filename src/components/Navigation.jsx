import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const workItems = [
    { path: "/work/what-do-you-dream-about", label: "what do you dream about?", year: "2025" },
    { path: "/work/letters-to-my-mom", label: "Letters to my Mom", year: "2025" },
    { path: "/work/diffusion-me", label: "diffusion-me", year: "2025" },
    { path: "/work/prl", label: "prl", year: "2024-25" },
    { path: "/work/prl-mobile", label: "prl mobile", year: "2025" },
    { path: "/work/tangent", label: "Tangent", year: "2025" },
    { path: "/work/stylescape", label: "StyleScape", year: "2024" },
  ];

  const otherNavItems = [
    { path: "/experience", label: "Experience" },
    { path: "/art", label: "Visual Art" },
  ];

  // Handle navigation clicks
  const handleNavClick = (path) => {
    // Dispatch a custom event that our App component can listen to
    window.dispatchEvent(new CustomEvent("navigate", { detail: { path } }));
  };

  return (
    <nav>
      <div className="space-y-4">
        <h1 className="text-xl mb-8">
          <button
            onClick={() => handleNavClick("/")}
            className="zsh transition-colors hover:opacity-80"
          >
            张思涵
          </button>
        </h1>
        <div>
          <button onClick={() => handleNavClick("/about")}>
            <h3 className="text-2xl">About Me</h3>
          </button>
        </div>
        {/* Selected Work Header */}
        <div>
          <h3 className="text-2xl mb-1">Selected Work</h3>
          <div className="space-y-1">
            {workItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block transition-colors duration-200 text-lg text-left tracking-tight leading-tight w-full ${
                  location.pathname === item.path
                    ? "font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-gray-400 ml-2">{item.year}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Other Navigation Items */}
        <div className="space-y-2">
          {otherNavItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`block text-2xl transition-colors duration-200 text-left w-full ${
                location.pathname === item.path
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
