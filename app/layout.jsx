import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./providers/ThemeProvider";
import LayoutContent from "./LayoutContent";
import "./globals.css";

export const metadata = {
  title: "Emily Zhang",
  description: "Engineer, artist, and creative technologist",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
