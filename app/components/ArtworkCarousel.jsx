"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectDestination } from "../data/projects";

const slides = [
  {
    slug: "youre-doing-it-to-yourself",
    alt: "A painting of figures in a bamboo steamer, hanging on a cream-colored wall",
  },
  {
    slug: "letters-to-my-mom",
    alt: "Letters to my Mom, a series of generative calligraphy prints",
  },
  {
    slug: "the-lovers",
    alt: "The Lovers, an oil painting across two canvases",
  },
  {
    title: "Portrait of You",
  },
].map((slide) => {
  const project = projects.find((entry) => slide.slug ? entry.slug === slide.slug : entry.title === slide.title);
  return {
    ...slide,
    title: project.title,
    src: project.video || project.carouselImage || project.image,
    type: project.video ? "video" : "image",
    destination: getProjectDestination(project),
  };
});

export default function ArtworkCarousel() {
  const [active, setActive] = useState(0);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState({});
  const [mediaRatios, setMediaRatios] = useState({});
  const [failed, setFailed] = useState({});
  const videoRef = useRef(null);
  const touchStart = useRef(null);
  const swiped = useRef(false);
  const paused = keyboardFocused || !visible || reducedMotion;

  useEffect(() => {
    const handleArrowKey = (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof HTMLElement && (
        event.target.isContentEditable || event.target.closest("input, textarea, select, video, [role='slider']")
      )) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      setActive((current) => (current + direction + slides.length) % slides.length);
    };
    window.addEventListener("keydown", handleArrowKey);
    return () => window.removeEventListener("keydown", handleArrowKey);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || (!ready[active] && !failed[active])) return;
    const timer = window.setTimeout(() => {
      // Never automatically transition to media that has not loaded.
      const next = slides.map((_, offset) => (active + offset + 1) % slides.length)
        .find((index) => ready[index] && !failed[index]);
      if (next !== undefined) setActive(next);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [active, paused, ready, failed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (slides[active].type === "video" && visible && !reducedMotion) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, visible, reducedMotion]);

  useEffect(() => {
    if (slides[active].type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [active]);

  const select = (index) => {
    setActive((index + slides.length) % slides.length);
  };
  const markReady = (index, media) => {
    const width = media.naturalWidth || media.videoWidth;
    const height = media.naturalHeight || media.videoHeight;
    if (width && height) setMediaRatios((current) => ({ ...current, [index]: width / height }));
    setReady((current) => ({ ...current, [index]: true }));
  };
  const markFailed = (index) => setFailed((current) => ({ ...current, [index]: true }));

  return (
    <section
      className="relative isolate"
      aria-label="Selected artwork. Use the left and right arrow keys to change slides."
      aria-roledescription="carousel"
      tabIndex={0}
      onPointerDown={() => setKeyboardFocused(false)}
      onFocus={(event) => setKeyboardFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
        swiped.current = false;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = touchStart.current - event.changedTouches[0].clientX;
        if (Math.abs(distance) > 45) {
          swiped.current = true;
          select(active + (distance > 0 ? 1 : -1));
        }
        touchStart.current = null;
      }}
      onClickCapture={(event) => {
        if (swiped.current) {
          event.preventDefault();
          event.stopPropagation();
          swiped.current = false;
        }
      }}
    >
      <div className="relative aspect-[4/3]" aria-live={paused ? "polite" : "off"}>
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-[opacity,filter] duration-[900ms] ease-[ease-in-out] motion-reduce:blur-none motion-reduce:transition-none ${
              active === index
                ? "pointer-events-auto z-[1] opacity-100 blur-none"
                : "pointer-events-none opacity-0 blur-[20px]"
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={active !== index}
          >
            {slide.type === "video" ? (
              <video
                ref={videoRef}
                className="size-full object-contain"
                src={slide.src}
                muted
                loop
                playsInline
                preload="auto"
                tabIndex={-1}
                aria-label="Portrait of You, a living generative portrait"
                onLoadedData={(event) => markReady(index, event.currentTarget)}
                onError={() => markFailed(index)}
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                className="size-full object-contain"
                fill
                sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) 63.333333vw, (max-width: 1680px) 50vw, 840px"
                quality={85}
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                onLoad={(event) => markReady(index, event.currentTarget)}
                onError={() => markFailed(index)}
              />
            )}
            {failed[index] && <p className="absolute inset-0 grid place-content-center p-6 text-center">{slide.title}<br />This artwork couldn’t load. Please try the next slide.</p>}
            {slide.destination && mediaRatios[index] && (
              <Link
                href={slide.destination.href}
                target={slide.destination.external ? "_blank" : undefined}
                rel={slide.destination.external ? "noopener noreferrer" : undefined}
                aria-label={`View ${slide.title}${slide.destination.external ? " (opens in a new tab)" : ""}`}
                tabIndex={active === index ? 0 : -1}
                style={{
                  width: `${Math.min(1, mediaRatios[index] / (4 / 3)) * 100}%`,
                  height: `${Math.min(1, (4 / 3) / mediaRatios[index]) * 100}%`,
                }}
                className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 focus-visible:outline-offset-[-3px]"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
