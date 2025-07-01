import ExternalLink from "../ExternalLink";
import diffusionMeVideo from "../../assets/projects/diffusionme.mp4";

function DiffusionMe({ links = [] }) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl mb-2">emily-diffusion</h2>
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

      <div className="space-y-4">
        <div className="w-full">
          <video
            src={diffusionMeVideo}
            controls
            className="w-full max-w-4xl rounded-lg shadow-lg"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="text-primary text-lg">Project details coming soon...</p>
      </div>
    </div>
  );
}

export default DiffusionMe;
