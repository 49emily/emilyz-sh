import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import SelectedWork from "./components/SelectedWork";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";

// Import projects data for routing
import { getProjectRoutes } from "./data/projects";

// Import images for global overlay
import nanjingImage from "./assets/nanjing.jpg";
import sfImage from "./assets/sf.JPG";
import stanfordImage from "./assets/stanford.JPG";
import scaleImage from "./assets/scale.JPG";

// Import the navigation profile image to preload it
import profileImg from "./assets/profile3.jpg";

import "./App.css";

// ScrollToTop component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Global image overlay component
function GlobalImageOverlay() {
  const [showNanjingImage, setShowNanjingImage] = useState(false);
  const [showSfImage, setShowSfImage] = useState(false);
  const [showStanfordImage, setShowStanfordImage] = useState(false);
  const [showScaleImage, setShowScaleImage] = useState(false);

  useEffect(() => {
    const handleShowImage = (e) => {
      const { imageType, show } = e.detail;
      switch (imageType) {
        case "nanjing":
          setShowNanjingImage(show);
          break;
        case "sf":
          setShowSfImage(show);
          break;
        case "stanford":
          setShowStanfordImage(show);
          break;
        case "scale":
          setShowScaleImage(show);
          break;
        default:
          break;
      }
    };

    window.addEventListener("showImage", handleShowImage);

    return () => {
      window.removeEventListener("showImage", handleShowImage);
    };
  }, []);

  return (
    <>
      {showNanjingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src={nanjingImage}
            alt="Nanjing, China"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showSfImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src={sfImage}
            alt="San Francisco"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showStanfordImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src={stanfordImage}
            alt="Stanford University"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showScaleImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src={scaleImage}
            alt="Scale AI"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

// Main App component
function AppContent() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [navImageLoaded, setNavImageLoaded] = useState(false);

  useEffect(() => {
    // Preload the navigation profile image
    const img = new Image();
    img.onload = () => {
      setNavImageLoaded(true);
    };
    img.src = profileImg;
  }, []);

  useEffect(() => {
    // Only set app as loaded after navigation image has loaded
    if (navImageLoaded) {
      // Add a small delay for smooth initial load animation
      setTimeout(() => setAppLoaded(true), 100);
    }
  }, [navImageLoaded]);

  return (
    <Router>
      <ScrollToTop />
      <div
        className={`min-h-screen transition-all duration-1000 ease-out ${
          appLoaded ? "opacity-100 blur-none" : "opacity-0 blur-sm"
        }`}
      >
        <GlobalImageOverlay />
        <ThemeToggle />
        <div className="mx-auto px-4 lg:px-12">
          <div className="lg:grid lg:grid-cols-7 min-h-screen">
            {/* Left Sidebar - Hidden on Mobile */}
            <aside className="hidden lg:block lg:col-span-2">
              <div
                className={`fixed top-0 h-screen left-0 w-[28.571%] flex justify-center items-center transition-all duration-700 delay-200 ease-out ${
                  appLoaded ? "opacity-100" : "-translate-x-4 opacity-0"
                }`}
              >
                <Navigation />
              </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Navigation />
            </div>

            {/* Main Content */}
            <main
              className={`lg:col-span-5 px-4  transition-all duration-700 delay-400 ease-out ${
                appLoaded ? "opacity-100 transform" : "opacity-0 transform translate-x-4"
              }`}
            >
              <Routes>
                <Route path="/" element={<SelectedWork />} />
                <Route path="/about" element={<Home />} />
                {/* <Route path="/home" element={<Home />} /> */}

                {/* Dynamic project routes */}
                {getProjectRoutes().map((project) => (
                  <Route
                    key={project.path}
                    path={project.path}
                    element={<project.component links={project.links} />}
                  />
                ))}
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
