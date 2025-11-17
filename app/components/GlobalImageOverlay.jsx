"use client";

import { useState, useEffect } from "react";

export default function GlobalImageOverlay() {
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
            src="/nanjing.jpg"
            alt="Nanjing, China"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showSfImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src="/sf.JPG"
            alt="San Francisco"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showStanfordImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src="/stanford.JPG"
            alt="Stanford University"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}

      {showScaleImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <img
            src="/scale.JPG"
            alt="Scale AI"
            className="max-w-[80vw] max-h-[80vh] object-contain opacity-90 shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
