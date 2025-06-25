import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import VisualArt from "./components/VisualArt";
import Experience from "./components/Experience";
import About from "./components/About";

// Individual work components
import WhatDoYouDreamAbout from "./components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "./components/works/LettersToMyMom";
import DiffusionMe from "./components/works/DiffusionMe";
import Prl from "./components/works/Prl";
import PrlMobile from "./components/works/PrlMobile";
import Tangent from "./components/works/Tangent";
import StyleScape from "./components/works/StyleScape";

// Import images for global overlay
import nanjingImage from "./assets/nanjing.jpg";
import sfImage from "./assets/sf.JPG";
import stanfordImage from "./assets/stanford.JPG";
import meImage from "./assets/me.jpg";
import scaleImage from "./assets/scale.JPG";
import fakerImage from "./assets/faker.jpg";
import studioGhibliSky from "./assets/studio_ghibli_sky.jpg";
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

// ScrollableContent component for smooth scrolling between sections
function ScrollableContent() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [immediateOffset, setImmediateOffset] = useState(0);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);

  // All sections in order
  const sections = [
    { component: <Home />, path: "/" },
    { component: <About />, path: "/about" },
    { component: <WhatDoYouDreamAbout />, path: "/work/what-do-you-dream-about" },
    { component: <LettersToMyMom />, path: "/work/letters-to-my-mom" },
    { component: <DiffusionMe />, path: "/work/diffusion-me" },
    { component: <Prl />, path: "/work/prl" },
    { component: <PrlMobile />, path: "/work/prl-mobile" },
    { component: <Tangent />, path: "/work/tangent" },
    { component: <StyleScape />, path: "/work/stylescape" },
    { component: <VisualArt />, path: "/art" },
  ];

  // Function to get section index from path
  const getSectionIndexFromPath = (path) => {
    return sections.findIndex((section) => section.path === path);
  };

  // Listen for custom navigation events from Navigation component
  useEffect(() => {
    const handleNavigation = (e) => {
      const targetPath = e.detail.path;
      const sectionIndex = getSectionIndexFromPath(targetPath);
      if (sectionIndex !== -1) {
        setCurrentSection(sectionIndex);
        setImmediateOffset(0); // Reset any immediate offset
        window.history.pushState(null, "", targetPath);
      }
    };

    window.addEventListener("navigate", handleNavigation);

    return () => {
      window.removeEventListener("navigate", handleNavigation);
    };
  }, [sections]);

  // Check for initial route on mount
  useEffect(() => {
    const initialPath = window.location.pathname;
    const initialSectionIndex = getSectionIndexFromPath(initialPath);
    if (initialSectionIndex !== -1) {
      setCurrentSection(initialSectionIndex);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      console.log("isScrolling", isScrolling);
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      console.log("timeSinceLastScroll", timeSinceLastScroll);
      if (timeSinceLastScroll < 800) return;

      let nextSection;

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll down
        nextSection = currentSection + 1;
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        nextSection = currentSection - 1;
      } else {
        return;
      }

      lastScrollTime.current = now;
      setIsScrolling(true);

      // // Immediate responsive feedback - small movement in scroll direction
      // const immediateMove = scrollDirection === "down" ? 20 : -20; // 8vh movement
      // setImmediateOffset(immediateMove);

      // After a short delay, snap to the full section
      setTimeout(() => {
        setImmediateOffset(0);
        setCurrentSection(nextSection);
        // Update URL
        window.history.replaceState(null, "", sections[nextSection].path);

        // Complete the transition
        setTimeout(() => setIsScrolling(false), 1200);
      }, 150);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, isScrolling, sections]);

  // Get current section name for path display
  const getCurrentSectionName = () => {
    const currentPath = sections[currentSection]?.path || "/";
    if (currentPath === "/") return "Home";
    if (currentPath === "/about") return "About";
    if (currentPath === "/art") return "Visual Art";
    if (currentPath.startsWith("/work/")) {
      const workName = currentPath
        .replace("/work/", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return workName;
    }
    return "Home";
  };

  return (
    <div className="col-span-2 lg:col-span-4 relative">
      {/* Path display */}
      <div className="absolute top-2 left-0 text-white/80 font-mono text-sm mb-2 z-10">
        zsh / {getCurrentSectionName()}
      </div>
      <main
        ref={containerRef}
        className="h-screen overflow-hidden relative my-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/80 via-white/70 to-white/60 border border-white/30 shadow-2xl drop-shadow-2xl"
        style={{ height: "calc(100vh - 3rem)" }}
      >
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${currentSection * 100 + immediateOffset}vh)`,
            height: `calc(${sections.length * 100}vh - 5rem)`,
          }}
        >
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col justify-start overflow-y-auto relative z-0"
              style={{ height: "100vh" }}
            >
              {section.component}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <GlobalImageOverlay />
        <div
          style={{
            backgroundImage: `url(${studioGhibliSky})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="mx-auto pl-8 pr-4"
        >
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-12 h-screen">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-12">
                <Navigation />
              </div>
            </aside>

            {/* Scrollable Content */}
            <ScrollableContent />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
