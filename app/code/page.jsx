import { permanentRedirect } from "next/navigation";

export default function LegacyCodePage() {
  permanentRedirect("/software");
}
