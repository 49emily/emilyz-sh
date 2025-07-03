import { useState, useEffect, useRef } from "react";
import ExternalLink from "./ExternalLink";
import { showImage, hideImage } from "../utils";

function Home() {
  // Topics for dice roll
  const topics = [
    "machine understandings of love",
    "browser engines",
    "my post-grad trip to Asia",
    "interfaces that scale",
    "mental health",
    "creative agency in the age of AI",
    "love as a form of labor",
  ];

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [usedTopicIndices, setUsedTopicIndices] = useState(new Set([0])); // Track used topics, start with index 0
  const [showDice, setShowDice] = useState(false);
  const [name, setName] = useState("Emily Zhang");
  const [isMobile, setIsMobile] = useState(false);
  const [isNameChinese, setIsNameChinese] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const homeRef = useRef(null);

  // Detect if device supports touch (mobile/tablet)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle clicking outside of images to hide them on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && currentImage && homeRef.current && !event.target.closest(".image-trigger")) {
        hideImage(currentImage);
        setCurrentImage(null);
      }
    };

    if (isMobile) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobile, currentImage]);

  const rollDice = () => {
    let currentUsedIndices = usedTopicIndices;

    // If all topics have been used, start a new cycle
    if (currentUsedIndices.size >= topics.length) {
      currentUsedIndices = new Set();
    }

    // Get available indices (not yet used in current cycle)
    const availableIndices = [];
    for (let i = 0; i < topics.length; i++) {
      if (!currentUsedIndices.has(i)) {
        availableIndices.push(i);
      }
    }

    // Pick a random index from available ones
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    // Update state
    setCurrentTopicIndex(randomIndex);
    setUsedTopicIndices(new Set([...currentUsedIndices, randomIndex]));
  };

  const handleNameInteraction = () => {
    if (isMobile) {
      // Toggle name on click for mobile
      const newState = !isNameChinese;
      setIsNameChinese(newState);
      setName(newState ? "张思涵" : "Emily Zhang");
    }
  };

  const handleImageInteraction = (imageName, isEnter = true) => {
    if (isMobile) {
      // Click to show, click outside to hide for mobile
      if (currentImage === imageName) {
        hideImage(imageName);
        setCurrentImage(null);
      } else {
        if (currentImage) {
          hideImage(currentImage);
        }
        showImage(imageName);
        setCurrentImage(imageName);
      }
    } else {
      // Hover behavior for desktop
      if (isEnter) {
        showImage(imageName);
      } else {
        hideImage(imageName);
      }
    }
  };

  const handleDiceInteraction = (isEnter = true) => {
    if (!isMobile) {
      setShowDice(isEnter);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" ref={homeRef}>
      <div className="max-w-2xl relative">
        <div className="text-2xl tracking-tight text-primary">
          <p className="mb-6">
            Welcome! My name is{" "}
            <span
              className="link cursor-pointer"
              onClick={handleNameInteraction}
              onMouseEnter={!isMobile ? () => setName("张思涵") : undefined}
              onMouseLeave={!isMobile ? () => setName("Emily Zhang") : undefined}
            >
              {name}.
            </span>
          </p>
          <p className="mb-6">
            I'm an engineer, artist, and creative technologist born in{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("nanjing")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("nanjing", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("nanjing", false) : undefined}
            >
              Nanjing, China
            </span>
            , currently residing in the liminal space between{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("stanford")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("stanford", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("stanford", false) : undefined}
            >
              Stanford University
            </span>{" "}
            and{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("sf")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("sf", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("sf", false) : undefined}
            >
              San Francisco
            </span>
            .
          </p>
          <p className="mb-6">
            I care deeply about generative interfaces, tools for thought and creativity, and
            programming as an art form. I want to create beautiful things that I am proud of.
          </p>
          <p className="mb-6">
            I've recently been working on and thinking about{" "}
            <span
              className="link cursor-pointer"
              onMouseEnter={() => handleDiceInteraction(true)}
              onMouseLeave={() => handleDiceInteraction(false)}
              onClick={rollDice}
              title="Click to explore other topics I'm working on"
            >
              {topics[currentTopicIndex]}
              {(showDice || isMobile) && (
                <span className="text-lg hover:scale-110 transition-transform inline-block ml-1">
                  🎲
                </span>
              )}
            </span>
            .
          </p>
          <p>
            If my work resonates with you, feel free to reach out anytime at{" "}
            <ExternalLink href="mailto:emily49@stanford.edu">
              emily49 at stanford dot edu
            </ExternalLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
