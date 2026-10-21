import { Analytics } from "@vercel/analytics/react";
import LayoutContent from "./LayoutContent";
import "./globals.css";

export const metadata = {
  title: "Emily Sihan Zhang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutContent>{children}</LayoutContent>
        <Analytics mode="production" />
      </body>
    </html>
  );
}
