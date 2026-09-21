import { getProjectBySlug } from "../../data/projects";
import WorkPageClient from "./WorkPageClient";
import { notFound } from "next/navigation";

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);

  return project ? { title: project.title } : {};
}

export default function WorkPage({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <WorkPageClient />;
}
