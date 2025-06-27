import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import VisualArt from "./components/VisualArt";
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
import meImage from "./assets/me.jpg";
import scaleImage from "./assets/scale.JPG";
import fakerImage from "./assets/faker.jpg";

import "./App.css";

// Global image overlay component
function GlobalImageOverlay() {
  const [showNanjingImage, setShowNanjingImage] = useState(false);
  const [showSfImage, setShowSfImage] = useState(false);
  const [showStanfordImage, setShowStanfordImage] = useState(false);
  const [showMeImage, setShowMeImage] = useState(false);
  const [showScaleImage, setShowScaleImage] = useState(false);
  const [showFakerImage, setShowFakerImage] = useState(false);

  useEffect(() => {
    const handleShowImage = (e) => {
      const { imageType, show } = e.detail;
      switch (imageType) {
        case "me":
          setShowMeImage(show);
          break;
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
        case "faker":
          setShowFakerImage(show);
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
      {showMeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src={meImage}
            alt="Emily Zhang"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

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

      {showFakerImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src={fakerImage}
            alt="Faker"
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

  useEffect(() => {
    // Add a small delay for smooth initial load animation
    setTimeout(() => setAppLoaded(true), 100);
  }, []);

  return (
    <Router>
      <div
        className={`min-h-screen transition-all duration-1000 ease-out ${
          appLoaded ? "opacity-100 blur-none" : "opacity-0 blur-sm"
        }`}
      >
        <GlobalImageOverlay />
        <ThemeToggle />
        <div className="mx-auto px-12">
          <div className="grid grid-cols-3 lg:grid-cols-7 gap-4 min-h-screen">
            {/* Left Sidebar */}
            <aside className="lg:col-span-2">
              <div
                className={`fixed top-30 left-20 transition-all duration-700 delay-200 ease-out ${
                  appLoaded ? "opacity-100" : "opacity-0 -translate-x-4"
                }`}
              >
                <Navigation />
              </div>
            </aside>

            {/* Main Content */}
            <main
              className={`col-span-2 lg:col-span-5 py-12 transition-all duration-700 delay-400 ease-out ${
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

                <Route path="/art" element={<VisualArt />} />
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
