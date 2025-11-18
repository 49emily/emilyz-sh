"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GlobalImageOverlay() {
  const [showNanjingImage, setShowNanjingImage] = useState(false);
  const [showSfImage, setShowSfImage] = useState(false);
  const [showStanfordImage, setShowStanfordImage] = useState(false);
  const [showScaleImage, setShowScaleImage] = useState(false);
  const [showA24Image, setShowA24Image] = useState(false);

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
        case "a24":
          setShowA24Image(show);
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
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src="/nanjing.jpg"
              alt="Nanjing, China"
              fill
              sizes="80vw"
              className="object-contain opacity-90"
              style={{ filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))" }}
              priority
            />
          </div>
        </div>
      )}

      {showSfImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src="/sf.JPG"
              alt="San Francisco"
              fill
              sizes="80vw"
              className="object-contain opacity-90"
              style={{ filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))" }}
              priority
            />
          </div>
        </div>
      )}

      {showStanfordImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src="/stanford.JPG"
              alt="Stanford University"
              fill
              sizes="80vw"
              className="object-contain opacity-90"
              style={{ filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))" }}
              priority
            />
          </div>
        </div>
      )}

      {showScaleImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative w-[80vw] h-[80vh]">
            <Image
              src="/scale.JPG"
              alt="Scale AI"
              fill
              sizes="80vw"
              className="object-contain opacity-90"
              style={{ filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))" }}
              priority
            />
          </div>
        </div>
      )}

      {showA24Image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative w-[70vw] h-[70vh]">
            <Image
              src="/a24.jpg"
              alt="A24"
              fill
              sizes="80vw"
              className="object-contain opacity-95"
              style={{ filter: "drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))" }}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
