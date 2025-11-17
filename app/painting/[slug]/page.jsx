import { getPaintingBySlug, paintings } from "../../data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return paintings.map((painting) => ({
    slug: painting.slug,
  }));
}

export async function generateMetadata({ params }) {
  const painting = getPaintingBySlug(params.slug);

  if (!painting) {
    return {
      title: "Painting Not Found",
    };
  }

  return {
    title: `${painting.title} | Emily Zhang`,
    description: painting.description || `${painting.title} - ${painting.medium}, ${painting.year}`,
  };
}

export default function PaintingPage({ params }) {
  const painting = getPaintingBySlug(params.slug);

  if (!painting) {
    notFound();
  }

  const displayImages = painting.images || [painting.image];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl mb-4 text-primary">{painting.title}</h1>

        {/* Metadata */}
        <div className="mb-8 text-xl text-primary space-y-1">
          <p>
            <span className="text-secondary">Medium:</span> {painting.medium}
          </p>
          {painting.size && (
            <p>
              <span className="text-secondary">Size:</span> {painting.size}
            </p>
          )}
          <p>
            <span className="text-secondary">Year:</span> {painting.year}
          </p>
          {painting.exhibitions && painting.exhibitions.length > 0 && (
            <p>
              <span className="text-secondary">Exhibitions:</span> {painting.exhibitions.join(", ")}
            </p>
          )}
        </div>

        {/* Description */}
        {painting.description && (
          <div className="max-w-none text-lg text-primary font-light">
            {painting.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Images */}
        <div className="space-y-8 mt-12">
          {displayImages.map((imagePath, index) => (
            <div key={index} className="relative w-full">
              <img
                src={imagePath}
                alt={`${painting.title}${displayImages.length > 1 ? ` - Image ${index + 1}` : ""}`}
                className="w-full h-auto"
              />
            </div>
          ))}

          {painting.video && (
            <div className="relative w-full">
              <video
                controls
                className="w-full h-auto rounded-lg shadow-lg"
                poster={painting.image}
              >
                <source src={painting.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
