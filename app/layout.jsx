import { Analytics } from "@vercel/analytics/react";
import { Space_Mono } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import LayoutContent from "./LayoutContent";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: {
    default: "emily sihan zhang",
    template: "emily sihan zhang > %s",
  },
  description:
    "Emily Sihan Zhang is an engineer and artist based between Stanford and NYC. She is currently working on software and storytelling at A24 Films.",
  keywords: [
    "Emily Zhang",
    "stanford",
    "colorado",
    "artist",
    "engineer",
    "startups",
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
      "Emily Sihan Zhang is an engineer and artist based between Stanford and NYC. She is currently working on software and storytelling at A24 Films.",
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
    description:
      "Engineer and artist based between Stanford and NYC. She is currently working on software and storytelling at A24 Films.",
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
    <html lang="en" className={spaceMono.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
          <Analytics mode="production" />
        </ThemeProvider>
      </body>
    </html>
  );
}
