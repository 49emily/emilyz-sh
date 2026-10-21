import ArtworkCarousel from "./components/ArtworkCarousel";

const socialLinks = [
  { label: "X", href: "https://x.com/emilyzsh" },
  { label: "Instagram", href: "https://www.instagram.com/emilysihanzhang/" },
  { label: "Email", href: "mailto:emilysihanzhang@gmail.com" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/emilyszhang/" },
  { label: "Github", href: "https://github.com/49emily" },
];

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Emily Sihan Zhang</h1>
      <ArtworkCarousel />
      <div className="mt-[26px] grid grid-cols-[1fr_1.9fr] gap-7 text-base leading-[1.25] max-[1100px]:grid-cols-[1fr_2.2fr] max-[1100px]:gap-6 max-[700px]:mt-6 max-[700px]:grid-cols-1 max-[700px]:gap-7">
        <nav
          className="flex flex-col items-start gap-5 leading-[1.25] max-[700px]:w-full max-[700px]:flex-row max-[700px]:flex-wrap max-[700px]:justify-between max-[700px]:gap-x-2 max-[700px]:gap-y-3 max-[700px]:text-sm"
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
        <div className="space-y-[26px] font-exposure-medium text-justify max-[700px]:row-start-1 max-[700px]:space-y-[22px] max-[700px]:text-left">
          <p>
            My name is Emily Sihan Zhang. I am an artist and engineer born in
            Nanjing, China and based in New York City. I am thinking about
            creative agency in the age of AI and the stories that will matter
            for our future.
          </p>
          <p>
            Currently, I work on hard problems across engineering, product, and
            storytelling at Crosby. I also paint a lot. Previously, I spent time
            on a few early teams and at Stanford University.
          </p>
          <p>If my work resonates with you, please feel free to reach out.</p>
        </div>
      </div>
    </>
  );
}
