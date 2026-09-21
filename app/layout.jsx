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
  title: "Emily Sihan Zhang",
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
