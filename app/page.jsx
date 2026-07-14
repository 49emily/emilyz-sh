"use client";

import { useState, useRef, useEffect } from "react";
import ExternalLink from "./components/ExternalLink";
import { showImage, hideImage } from "./utils";
import useIsMobile from "./hooks/useIsMobile";

export const dynamic = "force-dynamic";

export default function Home() {
  const [name, setName] = useState("Emily Zhang");
  const isMobile = useIsMobile();
  const [isNameChinese, setIsNameChinese] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const homeRef = useRef(null);

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

  return (
    <div
      className="flex items-center justify-center pt-20 pb-16 lg:pt-0 lg:pb-0 lg:min-h-screen"
      ref={homeRef}
    >
      <div className="max-w-3xl relative">
        <div className="text-base lg:text-lg text-primary">
          <p className="mb-6">
            Welcome! My name is{" "}
            <span
              className="link cursor-pointer"
              onClick={handleNameInteraction}
              onMouseEnter={!isMobile ? () => setName("张思涵") : undefined}
              onMouseLeave={!isMobile ? () => setName("Emily Zhang") : undefined}
            >
              {name}
            </span>
            .
          </p>
          <p className="mb-6">
            I&apos;m an engineer and artist born in{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("nanjing")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("nanjing", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("nanjing", false) : undefined}
            >
              Nanjing, China
            </span>{" "}
            and currently based in New York City. I work on applied agents and next-generation legal
            experiences at <ExternalLink href="https://www.crosby.ai">Crosby</ExternalLink>.
            Previously, I spent time on a few early teams and at{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("stanford")}
              onMouseEnter={!isMobile ? () => handleImageInteraction("stanford", true) : undefined}
              onMouseLeave={!isMobile ? () => handleImageInteraction("stanford", false) : undefined}
            >
              Stanford University
            </span>
            .
          </p>
          <p className="mb-6">
            I care deeply about tools for knowledge work and creative expression, as well as safe
            and effective AI deployment. My main priority is to create software that is beneficial
            to humanity.
          </p>
          <p className="mb-6">
            I&apos;ve recently been working on and thinking about{" "}
            {/* <a href="#" className="link">
              interfaces that scale
            </a>
            ,{" "} */}
            <ExternalLink href="https://x.com/emilyzsh/status/2023592817692725582">
              creative agency in the age of AI
            </ExternalLink>
            ,{" "}
            <ExternalLink href="https://intelligence.crosby.ai/">
              agents in non-verifiable domains
            </ExternalLink>
            , and{" "}
            <ExternalLink href="https://www.emilyz.sh/work/letters-to-my-mom">
              love as a form of labor
            </ExternalLink>
            .
          </p>
          <p>
            If my work resonates with you, feel free to reach out anytime at{" "}
            <ExternalLink href="mailto:emilysihanzhang@gmail.com">
              emilysihanzhang at gmail dot com
            </ExternalLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
