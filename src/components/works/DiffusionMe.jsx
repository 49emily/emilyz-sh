import ExternalLink from "../ExternalLink";
import diffusionMeVideo from "../../assets/projects/diffusionme.mp4";
import DontStare from "../../assets/projects/Don_t Stare.png";
import comfyImage from "../../assets/projects/comfyui.png";
import falImage from "../../assets/projects/fal.png";

function DiffusionMe({ links = [] }) {
  return (
    <div className="space-y-6 max-w-4xl w-full">
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

      <div className="space-y-8">
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
        <p className="text-primary text-lg font-light">
          I trained a Flux 1.0 LoRA on 21 samples of my artwork from my recent portfolio, as a
          thought experiment on what parts of my work could be most easily understood and replicated
          by a machine. Each medium (oil, acrylic, watercolor, and colored pencil) was labeled as a
          substyle, and labels were generated using a chain of custom GPT-4o prompts. Here is an
          example of one of my works, and its label:
        </p>

        <div className="flex flex-row items-center gap-4 justify-between w-full">
          <div className="w-1/2">
            <img src={DontStare} alt="DiffusionMe" className="w-full" />
            {/* <p className="text-secondary text-sm mt-2 italic">
              Original artwork: "Don't Stare" - oil painting used as training data
            </p> */}
          </div>
          <p className="text-primary text-lg font-light w-1/2">
            <i>
              in the style of zsh-oil, 1girl, leaning on railing, oval face smooth tan skin, subtle
              asym mouth eyes, medium forehead, dark straight thick eyebrows, almond brown eyes
              medium lashes, gaze slightly past camera, straight medium nose rounded tip, full
              closed lips neutral, left ear silver stud earring, long straight black hair middle
              part stray strands, natural makeup soft blush muted pink lips, cream satin low v-neck
              spaghetti-strap dress loose fit, shoulders collarbones upper chest exposed, right arm
              extended back hand on railing, left arm bent on hip, slight forward lean torso turned
              slightly left, head upright slight tilt left, background, green metal structure left
              side vertical beams matte muted green with bolts, calm blue-teal water spans horizon
              gentle ripples, sunset sky upper band gradient blue to orange patchy clouds, distant
              dark cityscape silhouette along horizon, green-white metal guard railing runs behind
              subject, view from eye-level slight left front
            </i>
          </p>
        </div>
        <p className="text-primary text-lg font-light">
          I found the best stylistic consistency and sample quality at epoch 26, through lots of
          experimentation.
        </p>
        <div>
          <img src={comfyImage} alt="comfy UI" className="w-full max-w-4xl" />
          <p className=" text-sm mt-2 italic">Notice the watercolor borders!</p>
        </div>
        <p className="text-primary text-lg font-light">
          The LoRA was able to retain surprising formalistic elements, like the shading on the hair,
          the messy way I paint moving strands of hair, the sheen on the canvas, the general tones
          and hues of the shadows (especially on the skin), and the border from artist's tape on my
          watercolor portraits.
        </p>
        <div>
          <img src={falImage} alt="fal" className="w-full max-w-4xl" />
          <p className=" text-sm mt-2 italic">Notice the hair!!!</p>
        </div>
        <p className="text-primary text-lg font-light">
          You can see how safely within distribution the LoRA stays in the following comparisons
          (left is my original artwork, right is a generated sample).
        </p>
      </div>
    </div>
  );
}

export default DiffusionMe;
