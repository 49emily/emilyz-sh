import { useLocation, Link } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Selected Work" },
    { path: "/about", label: "About" },
    { path: "/home", label: "Home" },
    { path: "/art", label: "Visual Art Portfolio" },
  ];

  return (
    <nav>
      <div className="space-y-4 mt-20">
        {navItems.map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`block text-2xl italic transition-colors duration-200 hover:text-gray-900  ${
                location.pathname === item.path ? "text-gray-900 font-medium" : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
