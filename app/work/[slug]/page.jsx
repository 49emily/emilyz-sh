import { getProjectBySlug } from "../../data/projects";
import WorkPageClient from "./WorkPageClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description = project.artMetadata?.description
    ? project.artMetadata.description.split("\n\n")[0].substring(0, 160)
    : project.status || `View ${project.title} by Emily Sihan Zhang`;

  const imageUrl = project.image || "/profile3.jpg";

  return {
    title: project.title,
    description,
    keywords: [
      project.title,
      "Emily Zhang",
      project.year,
      ...(project.tags || []),
      ...(project.artMetadata?.medium ? [project.artMetadata.medium] : []),
    ],
    openGraph: {
      title: project.title,
      description,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function WorkPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <WorkPageClient />;
}
