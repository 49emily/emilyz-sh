import whatDoYouDreamVideo from "../../assets/projects/whatdoyoudream.mp4";
import ExternalLink from "../ExternalLink";

function WhatDoYouDreamAbout({ links = [] }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-3xl mb-2">what do you dream about?</h2>
        <p className="text-secondary text-sm">(2025)</p>

        {/* Links section */}
        {links.length > 0 && (
          <div className="flex gap-4 mt-3">
            {links.map((link, index) => (
              <ExternalLink key={index} href={link.url} className="text-sm link">
                {link.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/J32KjOcauFQ"
              title="what do you dream about? - Interactive Media Installation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <video
              className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
              controls
              src={whatDoYouDreamVideo}
              title="what do you dream about? - Local Video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <p className="text-lg text-primary">
          <i>what do you dream about?</i> is an interactive media installation that asks viewers in
          machine-generated voice questions like <i>"what do you eat for breakfast?"</i>,{" "}
          <i>"where did you first fall in love?"</i>, <i>"what do you dream about?"</i>. Reversing
          the familiar role of prompting an LLM for our needs, we answer at the behest of the
          machine, and then it generates in real-time its interpretation of our answer on a giant
          100" projection. This generator is conditioned on the camera pointing at the viewer – so
          audiences begin moving their bodies, turning into strawberries, buildings, and cats. This
          is done using ChatGPT-augmented prompts and Stream Diffusion, a fast implementation of
          img2img diffusion that runs at multiple frames per second, but not without jarring
          hallucinations (if you answer that you dream of running your own business, you will
          suddenly be looking back at yourself as a man). The machine here feels large, and the
          viewer small. I brought my setup all over campus, and watched students rock side to side,
          cover the camera, use props, to condition machine imagination.{" "}
        </p>
      </div>
    </div>
  );
}

export default WhatDoYouDreamAbout;
