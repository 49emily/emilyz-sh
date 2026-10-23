import { permanentRedirect } from "next/navigation";

export default function LegacyVisualArtPage() {
  permanentRedirect("/painting");
}
