import { useState } from "react";
import nanjingImage from "../assets/nanjing.jpg";
import sfImage from "../assets/sf.JPG";
import stanfordImage from "../assets/stanford.JPG";
import meImage from "../assets/me.jpg";

function Home() {
  const [showNanjingImage, setShowNanjingImage] = useState(false);
  const [showSfImage, setShowSfImage] = useState(false);
  const [showStanfordImage, setShowStanfordImage] = useState(false);
  const [showMeImage, setShowMeImage] = useState(false);

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

  const rollDice = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopicIndex(randomIndex);
  };

  const [showDice, setShowDice] = useState(false);

  return (
    <div className="mt-20 mx-auto max-w-2xl relative">
      {/* Large centered image overlays */}
      {showMeImage && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img
            src={meImage}
            alt="Emily Zhang"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showNanjingImage && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img
            src={nanjingImage}
            alt="Nanjing, China"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showSfImage && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img
            src={sfImage}
            alt="San Francisco"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showStanfordImage && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img
            src={stanfordImage}
            alt="Stanford University"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      <div className="text-2xl tracking-tight">
        <p className="mb-6">
          Hi! My name is{" "}
          <span
            className="link cursor-pointer"
            onMouseEnter={() => setShowMeImage(true)}
            onMouseLeave={() => setShowMeImage(false)}
          >
            Emily Zhang.
          </span>
        </p>
        <p className="mb-6">
          I'm an engineer, artist, and creative technologist born in{" "}
          <span
            className="link cursor-pointer"
            onMouseEnter={() => setShowNanjingImage(true)}
            onMouseLeave={() => setShowNanjingImage(false)}
          >
            Nanjing, China
          </span>
          , currently residing in the liminal space between{" "}
          <span
            className="link cursor-pointer"
            onMouseEnter={() => setShowStanfordImage(true)}
            onMouseLeave={() => setShowStanfordImage(false)}
          >
            Stanford University
          </span>{" "}
          and{" "}
          <span
            className="link cursor-pointer"
            onMouseEnter={() => setShowSfImage(true)}
            onMouseLeave={() => setShowSfImage(false)}
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
            onMouseEnter={() => setShowDice(true)}
            onMouseLeave={() => setShowDice(false)}
            onClick={rollDice}
            title="Click to explore other topics I'm working on"
          >
            {topics[currentTopicIndex]}
            {showDice && (
              <span className="text-lg hover:scale-110 transition-transform inline-block ml-1">
                🎲
              </span>
            )}
          </span>
          .
        </p>
        <p>
          If my work resonates with you, feel free to reach out anytime at{" "}
          <a href="mailto:emily49@stanford.edu" className="link">
            emily49 at stanford dot edu
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Home;
