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
      <header className="sticky top-0 z-10 bg-transparent px-8 pt-[26px] pb-8 max-[700px]:px-4 max-[700px]:pt-5 max-[700px]:pb-6">
        <nav className="grid grid-cols-[repeat(5,minmax(0,6rem))] items-center justify-between gap-6 max-[700px]:grid-cols-[0.75fr_1fr_0.95fr_1.3fr_0.85fr] max-[700px]:gap-1" aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="text-center text-base leading-[1.25] font-exposure-semibold no-underline transition-[font-weight] duration-200 ease-[ease] first:text-left last:text-right hover:font-exposure-heavy aria-[current=page]:font-exposure-heavy motion-reduce:transition-none max-[700px]:text-sm"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main
        id="main-content"
        className={`mx-auto max-[700px]:w-[calc(100%_-_32px)] max-[700px]:pb-8 max-[700px]:[&>div]:py-0 max-[700px]:[&>div]:mb-0 ${pathname === "/"
          ? "w-1/2 max-w-[840px] pb-[50px] max-[1100px]:w-[63.333333%]"
          : "w-[min(1200px,calc(100%_-_80px))] pb-[60px] [&>div]:pt-6"}`}
      >
        {children}
      </main>
    </div>
  );
}
