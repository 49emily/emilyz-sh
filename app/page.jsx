"use client";

import { useState, useRef, useEffect } from "react";
import ExternalLink from "./components/ExternalLink";
import { showImage, hideImage } from "./utils";
import useIsTouchDevice from "./hooks/useIsTouchDevice";

export const dynamic = "force-dynamic";

export default function Home() {
  const [name, setName] = useState("Emily Zhang");
  const isTouchDevice = useIsTouchDevice();
  const [isNameChinese, setIsNameChinese] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const homeRef = useRef(null);

  // Handle tapping outside of images to hide them on touch devices
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isTouchDevice && currentImage && homeRef.current && !event.target.closest(".image-trigger")) {
        hideImage(currentImage);
        setCurrentImage(null);
      }
    };

    if (isTouchDevice) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isTouchDevice, currentImage]);

  const handleNameInteraction = () => {
    if (isTouchDevice) {
      // Toggle name on tap for touch devices
      const newState = !isNameChinese;
      setIsNameChinese(newState);
      setName(newState ? "张思涵" : "Emily Zhang");
    }
  };

  const handleImageInteraction = (imageName, isEnter = true) => {
    if (isTouchDevice) {
      // Tap to show, tap outside to hide for touch devices
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
      // Hover behavior where a pointer is available
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
              onMouseEnter={!isTouchDevice ? () => setName("张思涵") : undefined}
              onMouseLeave={!isTouchDevice ? () => setName("Emily Zhang") : undefined}
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
              onMouseEnter={!isTouchDevice ? () => handleImageInteraction("nanjing", true) : undefined}
              onMouseLeave={!isTouchDevice ? () => handleImageInteraction("nanjing", false) : undefined}
            >
              Nanjing, China
            </span>{" "}
            and currently based in New York City. I work on applied agents and next-generation legal
            experiences at{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("crosby")}
              onMouseEnter={!isTouchDevice ? () => handleImageInteraction("crosby", true) : undefined}
              onMouseLeave={!isTouchDevice ? () => handleImageInteraction("crosby", false) : undefined}
            >
              Crosby
            </span>
            . Previously, I spent time on a few early teams and at{" "}
            <span
              className="link cursor-pointer image-trigger"
              onClick={() => handleImageInteraction("stanford")}
              onMouseEnter={!isTouchDevice ? () => handleImageInteraction("stanford", true) : undefined}
              onMouseLeave={!isTouchDevice ? () => handleImageInteraction("stanford", false) : undefined}
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
