import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const workItems = [
    { path: "/work/where-are-you-from", label: "where are you from?", year: "2025" },
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

  return (
    <nav className="max-h-100vh overflow-y-auto">
      <div className="space-y-4">
        <h1 className="text-xl mb-8">
          <Link to="/" className="zsh transition-colors">
            张思涵
          </Link>
        </h1>
        {/* Selected Work Header */}
        <div>
          <h3 className="text-2xl mb-1">Selected Work</h3>
          <div className="space-y-1">
            {workItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block transition-colors duration-200 text-lg ${
                  location.pathname === item.path
                    ? "font-medium"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-gray-400 ml-2">{item.year}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Navigation Items */}
        <div className="space-y-2">
          {otherNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block text-2xl transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
