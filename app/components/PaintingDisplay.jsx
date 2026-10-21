"use client";

import Image from "next/image";

// Component for displaying paintings/visual art
export default function PaintingDisplay({ project }) {
  const { artMetadata } = project;
  const displayImages = artMetadata.images || [project.image];

  return (
    <div className="min-h-screen md:pb-12">
      <div className="max-w-4xl mx-auto px-0 md:px-4">
        {/* Title */}
        <h1 className="text-3xl mb-4 text-primary font-exposure-bold">{project.title}</h1>

        {/* Metadata */}
        <div className=" mb-8 text-primary space-y-1">
          <p>
            <i className="font-exposure-regular">medium:</i> {artMetadata.medium}
          </p>
          {artMetadata.size && (
            <p>
              <i className="font-exposure-regular">size:</i> {artMetadata.size}
            </p>
          )}
          <p>
            <i className="font-exposure-regular">year:</i> {project.year}
          </p>
        </div>

        {/* Description */}
        {artMetadata.description && (
          <div className=" max-w-none text-primary">
            {artMetadata.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Images */}
        <div className="space-y-8 mt-12">
          {displayImages.map((imagePath, index) => (
            <div key={index} className="relative w-full">
              <div className="relative w-full">
                <Image
                  src={imagePath}
                  alt={`${project.title}${displayImages.length > 1 ? ` - Image ${index + 1}` : ""}`}
                  width={1920}
                  height={1440}
                  sizes="(min-width: 64rem) 896px, 100vw"
                  className="w-full h-auto object-contain max-h-screen"
                  priority={index === 0}
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
            </div>
          ))}

          {artMetadata.video && (
            <div className="relative w-full">
              <video controls className="w-full h-auto">
                <source src={artMetadata.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
