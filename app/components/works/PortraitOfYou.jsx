"use client";

import ExternalLink from "../ExternalLink";
import { getBunnyCDNUrl } from "../../utils";

export default function WhatDoYouDreamAbout({ links = [] }) {
  return (
    <div className="space-y-6 max-w-4xl mb-20  py-12 pt-20">
      <div className="mb-6">
        <h2 className="text-3xl mb-2 font-heavy">Portrait of You</h2>
        <div className="text-lg text-primary">
          <p>
            <i className="font-light">medium:</i> real-time, multimedia interactive generation
            (continuous)
          </p>
          <p>
            <i className="font-light">year:</i> 2025
          </p>
        </div>

        {/* Links section */}
        {links.length > 0 && (
          <div className="flex gap-4 mt-3">
            {links.map((link, index) => (
              <ExternalLink key={index} href={link.url} className="link">
                {link.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </div>

      <p className="text-lg text-primary ">
        <i>Portrait of You</i> is a series of generative living artworks that evolve with digital
        behavior inspired by Oscar Wilde&apos;s <i>The Picture of Dorian Gray</i>. Each portrait
        undergoes a transformation using a generative AI model at every increment of its owner&apos;s
        unproductive screen time, capturing the gradual erosion of identity in the age of
        distraction. The portraits will reset weekly at midnight EST on Sunday, giving each person a
        new chance at redefining themselves in an ongoing public installation of self-surveillance.
      </p>
      <p className="text-lg text-primary ">
        This installation, and its extension for friends of the artists, ran for 11 weeks from
        September 21st to December 7th, 2025.
      </p>

      <div className="space-y-8">
        <div className="space-y-6">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/J32KjOcauFQ"
              title="what do you dream about? - Interactive Media Installation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <video
              className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
              controls
              src={getBunnyCDNUrl("/projects/what-do-you-dream-about/whatdoyoudream.mp4")}
              title="what do you dream about? - Local Video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
