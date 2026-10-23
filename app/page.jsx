import ArtworkCarousel from "./components/ArtworkCarousel";

const socialLinks = [
  { label: "X", href: "https://x.com/emilyzsh" },
  { label: "Email", href: "mailto:emilysihanzhang@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/emilysihanzhang/" },
  { label: "Github", href: "https://github.com/49emily" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/emilyszhang/" },
];

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Emily Sihan Zhang</h1>
      <ArtworkCarousel />
      <div className="mt-6 grid grid-cols-1 gap-7 text-base leading-tight md:grid-cols-[1fr_2fr]">
        <nav
          className="flex w-full flex-wrap items-start justify-between gap-x-2 gap-y-3 text-sm leading-tight md:flex-col md:flex-nowrap md:justify-start md:gap-5 md:text-base"
          aria-label="Social and contact links"
        >
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-exposure-semibold text-accent no-underline hover:underline"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="row-start-1 space-y-6 font-exposure-medium text-left md:row-auto md:text-justify">
          <p>
            My name is Emily Sihan Zhang. I am an artist and engineer born in
            Nanjing, China and based in New York City. I am thinking about
            creative agency in the age of AI and the stories that will matter
            for our future.
          </p>
          <p>
            Currently, I work on hard problems across engineering, product, and
            storytelling at Crosby. I also paint a lot. Previously, I spent time
            on a few early teams, a film studio, and at Stanford University.
          </p>
          <p>If my work resonates with you, please feel free to reach out.</p>
        </div>
      </div>
    </>
  );
}
