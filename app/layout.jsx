import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./providers/ThemeProvider";
import LayoutContent from "./LayoutContent";
import "./globals.css";

export const metadata = {
  title: {
    default: "emily sihan zhang",
    template: "emily sihan zhang > %s",
  },
  description:
    "Emily Sihan Zhang is an engineer, artist, and creative technologist based in New York City.",
  keywords: [
    "Emily Zhang",
    "stanford",
    "colorado",
    "creative technologist",
    "artist",
    "engineer",
    "nyc",
    "A24",
    "film",
  ],
  authors: [{ name: "Emily Sihan Zhang" }],
  creator: "Emily Sihan Zhang",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emilyz.sh",
    siteName: "emily sihan zhang",
    title: "emily sihan zhang",
    description:
      "Emily Sihan Zhang is an engineer, artist, and creative technologist based in New York City.",
    images: [
      {
        url: "/profile3.jpg",
        width: 1200,
        height: 630,
        alt: "Emily Sihan Zhang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "emily sihan zhang",
    description: "Engineer, artist, and creative technologist based in Brooklyn, NY.",
    images: ["/profile3.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://emilyz.sh"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
          <Analytics mode="production" />
        </ThemeProvider>
      </body>
    </html>
  );
}
