import { useState } from "react";
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

  const rollDice = () => {
    const randomIndex = Math.floor(Math.random() * topics.length);
    setCurrentTopicIndex(randomIndex);
  };

  const [showDice, setShowDice] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="max-w-2xl relative">
        <div className="text-2xl tracking-tight">
          <p className="mb-6">Welcome! My name is Emily Zhang.</p>
          <p className="mb-6">
            I'm an engineer, artist, and creative technologist born in{" "}
            <span
              className="link cursor-pointer"
              onMouseEnter={() => showImage("nanjing")}
              onMouseLeave={() => hideImage("nanjing")}
            >
              Nanjing, China
            </span>
            , currently residing in the liminal space between{" "}
            <span
              className="link cursor-pointer"
              onMouseEnter={() => showImage("stanford")}
              onMouseLeave={() => hideImage("stanford")}
            >
              Stanford University
            </span>{" "}
            and{" "}
            <span
              className="link cursor-pointer"
              onMouseEnter={() => showImage("sf")}
              onMouseLeave={() => hideImage("sf")}
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
