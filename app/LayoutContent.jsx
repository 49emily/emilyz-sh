"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "About" },
  { href: "/software", label: "Software" },
  { href: "/visual-art", label: "Painting" },
  { href: "/installation", label: "Installation" },
  { href: "/archive", label: "Archive" },
];

export default function LayoutContent({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-svh">
      <a href="#main-content" className="fixed -top-[100px] left-5 z-20 bg-white p-3 focus:top-3">Skip to content</a>
      <header className="sticky top-0 z-10 bg-transparent px-4 pt-5 pb-6 md:px-8 md:pt-6.5 md:pb-8">
        <nav className="grid grid-cols-[0.75fr_1fr_0.95fr_1.3fr_0.85fr] items-center justify-between gap-1 md:grid-cols-[repeat(5,minmax(0,6rem))] md:gap-6" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="text-center text-sm leading-tight md:text-base font-exposure-semibold no-underline transition-[font-weight] duration-200 ease-[ease] first:text-left last:text-right hover:font-exposure-heavy aria-[current=page]:font-exposure-heavy motion-reduce:transition-none"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main
        id="main-content"
        className={`mx-auto w-[calc(100%_-_2rem)] pb-8 max-md:[&>div]:py-0 max-md:[&>div]:mb-0 ${pathname === "/"
          ? "max-w-[840px] md:w-[63.333333%] md:pb-12.5 lg:w-1/2"
          : "md:w-[min(1200px,calc(100%_-_5rem))] md:pb-15 md:[&>div]:pt-6"}`}
      >
        {children}
      </main>
    </div>
  );
}
