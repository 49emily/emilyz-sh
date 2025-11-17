"use client";

import Image from "next/image";
import ExternalLink from "../ExternalLink";

export default function LettersToMyMom({ links = [] }) {
  return (
    <div className="space-y-6 max-w-4xl w-full py-12 pt-20">
      <div className="mb-6">
        <h2 className="text-3xl mb-2">Letters to my Mom</h2>
        <p className="text-secondary">(2025)</p>

        {/* Links section */}
        {links.length > 0 && (
          <div className="flex gap-4 mt-3">
            {links.map((link, index) => (
              <ExternalLink key={index} href={link.url} className="link">
                {link.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </div>

      <p className="text-lg text-primary font-light">
        At their home in rural China last year, my grandparents found a small piece of old paper
        tucked away in a book. It was a love letter that my dad wrote my mom in the &apos;90s when
        they were long-distance dating, complete with frayed, folded edges and smudged blue ink.
        When I saw it I was immediately emotional, nostalgic for a time when loving was hard, but
        worthwhile. <i>Letters to My Mom</i> is a bittersweet homage to my parents&apos; story and a
        machine exploration of loss, labor, and love.
        <br />
        <br />I cropped, annotated, and upscaled each character of my dad&apos;s original letter
        captured by my grandpa&apos;s phone camera halfway across the world. Using this small
        dataset, I trained a generative Chinese character model that imitated the ink, stroke, and
        paper my dad used. I then typed up two love letters to my mom and to my partner, fed these
        characters through the model I trained to generate 256px square images of each unique
        character, and printed out each resulting &quot;handwritten&quot; letter on sheets of
        canvas. One process of labor replaces another. When the viewer looks carefully, they see
        smudges and imperfections in the blue ink, but the naturality also feels eerily uniform and
        rigid. From the human past to the machine future, is there always something that is lost?
      </p>

      <div className="space-y-4">
        <Image
          src="/projects/letters.jpg"
          alt="Letters to my Mom"
          width={800}
          height={600}
          className="w-[80%] lg:w-1/2 h-auto"
        />
        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <Image
            src="/projects/letter1.jpg"
            alt="Letter 1"
            width={400}
            height={600}
            className="w-1/2"
          />
          <Image
            src="/projects/letter2.jpg"
            alt="Letter 2"
            width={400}
            height={600}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
}
