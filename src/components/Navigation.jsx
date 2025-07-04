import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import profileImg from "../assets/profile3.jpg";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [distance, setDistance] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Emily's approximate location (Nanjing)
  const emilyLocation = { lat: 32.0584, lng: 118.7965 };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in miles
  };

  // Typing animation effect
  useEffect(() => {
    if (distance !== null) {
      const fullText = `you are ${distance.toLocaleString()} miles away from zsh`;
      setIsTyping(true);
      setTypedText("");

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 50); // 50ms per character

      return () => clearInterval(typingInterval);
    }
  }, [distance]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const dist = calculateDistance(userLat, userLng, emilyLocation.lat, emilyLocation.lng);
          setDistance(Math.round(dist));
        },
        () => {
          setLocationError("Location access denied");
        }
      );
    } else {
      setLocationError("Geolocation not supported");
    }
  }, []);

  // Close mobile menu when clicking outside or on navigation link
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-nav-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: "/", label: "Selected Work" },
    // { path: "/about", label: "About" },
    { path: "/about", label: "About" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button - Top Left */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md glass mobile-nav-container"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Mobile Navigation Overlay - Always present for blur preload */}
      <div
        className={`lg:hidden fixed inset-0 z-40 mobile-nav-container transition-all duration-200 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          background: isMobileMenuOpen ? "rgba(0, 0, 0, 0.2)" : "transparent",
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-80 max-w-[85vw] h-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-r border-white/20 dark:border-white/10 transform transition-transform duration-250 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 pt-20">
            <nav>
              <div className="flex flex-col items-center gap-4 mb-8">
                <img
                  src={profileImg}
                  onClick={() => navigate("/")}
                  alt="Profile"
                  className="w-50 max-w-[60vw] object-cover cursor-pointer"
                />

                {/* Social Media Icons */}
                <div className="flex space-x-6 justify-center">
                  <a
                    href="https://github.com/49emily"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>

                  <a
                    href="https://x.com/emilyzsh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                  </a>

                  <a
                    href="mailto:emily49@stanford.edu"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/emilyszhang/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80 text-accent"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                {navItems.map((item) => (
                  <div key={item.path} className="relative">
                    <Link
                      to={item.path}
                      onClick={handleNavClick}
                      className={`block text-3xl transition-colors italic duration-200 hover:text-primary ${
                        location.pathname === item.path ||
                        (item.path === "/" && location.pathname.startsWith("/work/"))
                          ? "text-primary"
                          : "text-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                {distance !== null && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    </div>

                    <p className="text-sm text-secondary">
                      {typedText}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </p>
                  </div>
                )}
                {locationError && (
                  <p className="text-sm text-muted italic text-center">location unknown</p>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden lg:block">
        <div className="flex flex-col items-center gap-4">
          <img
            src={profileImg}
            onClick={() => navigate("/")}
            alt="Profile"
            className="w-50 max-w-[60vw] object-cover cursor-pointer"
          />

          {/* Social Media Icons */}
          <div className="flex flex-row mb-8 justify-between w-50 max-w-[60vw] ">
            <a
              href="https://github.com/49emily"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://x.com/emilyzsh"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="mailto:emily49@stanford.edu"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/emilyszhang/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-80 text-accent"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-6">
          {navItems.map((item) => (
            <div key={item.path} className="relative">
              {/* Arrow indicator for selected item - positioned absolutely to not affect text alignment
              {location.pathname === item.path && (
                <img 
                  src={arrowImg} 
                  alt="Selected" 
                  className="absolute left-[-20px] top-2/5 transform -translate-y-1/2 w-4 h-4 object-contain"
                />
              )} */}

              <Link
                to={item.path}
                className={`block text-3xl italic transition-colors duration-200 hover:text-primary ${
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname.startsWith("/work/"))
                    ? "text-primary"
                    : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {distance !== null && (
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>

              <p className="text-sm text-secondary">
                {typedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          )}
          {locationError && (
            <p className="text-sm text-muted italic text-center">location unknown</p>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
