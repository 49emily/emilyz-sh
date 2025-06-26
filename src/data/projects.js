// Import project components
import WhatDoYouDreamAbout from "../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../components/works/LettersToMyMom";
import DiffusionMe from "../components/works/DiffusionMe";
import StyleScape from "../components/works/StyleScape";
import Tangent from "../components/works/Tangent";

// Import project images
import whatdoyoudreamImage from "../assets/projects/whatdoyoudream.png";
import lettersToMyMomImage from "../assets/projects/letters.jpg";
import pearlImage from "../assets/projects/pearl.jpeg";

export const projects = [
  {
    title: "what do you dream about?",
    year: "2025",
    path: "/work/what-do-you-dream-about",
    component: WhatDoYouDreamAbout,
    description:
      "An interactive media installation that asks viewers machine-generated questions and generates real-time interpretations using Stream Diffusion.",
    image: whatdoyoudreamImage,
    status: "Interactive Installation",
    links: [
      // {
      //   label: "GitHub",
      //   url: "https://github.com/emilyz49/what-do-you-dream-about",
      //   icon: "github",
      // },
      // { label: "Demo", url: "https://what-do-you-dream-about.com", icon: "external" },
    ],
  },
  {
    title: "Letters to my Mom",
    year: "2025",
    path: "/work/letters-to-my-mom",
    component: LettersToMyMom,
    description:
      "A personal exploration of family, identity, and cross-cultural communication through digital storytelling.",
    image: lettersToMyMomImage,
    status: "Coming Soon",
    links: [
      { label: "GitHub", url: "https://github.com/49emily/ai-art-calligraphy", icon: "github" },
    ],
  },
  {
    title: "diffusion-me",
    year: "2025",
    path: "/work/diffusion-me",
    component: DiffusionMe,
    description:
      "An exploration of AI-generated self-representation and identity through diffusion models.",
    image: null,
    status: "training a generative model on my own art",
    links: [
      { label: "GitHub", url: "https://github.com/emilyz49/diffusion-me", icon: "github" },
      { label: "Paper", url: "https://arxiv.org/abs/2501.00000", icon: "external" },
    ],
  },
  {
    title: "prl",
    year: "2024-25",
    path: null,
    component: null,
    description:
      "A collaborative project exploring the intersection of technology and human relationships.",
    image: pearlImage,
    status: "The journal that reflects with you. Scaled to 2000+ users.",
    links: [
      // { label: "GitHub", url: "https://github.com/emilyz49/prl", icon: "github" },
      { label: "Live Site", url: "https://www.writewithprl.com/", icon: "external" },
      { label: "Info", url: "https://info.writewithprl.com/", icon: "external" },
      { label: "Updates", url: "https://x.com/writewithprl", icon: "twitter" },
      {
        label: "Product Hunt",
        url: "https://www.producthunt.com/products/pearl-8",
        icon: "external",
      },
    ],
  },
  {
    title: "prl iOS",
    year: "2025",
    path: null,
    component: null,
    description:
      "Mobile companion to the prl project, designed for intimate, personal interactions.",
    image: null,
    status: "Mobile companion to writewithprl.com, coming soon to the iOS App Store.",
    links: [{ label: "DM for Testflight", url: "https://x.com/writewithprl", icon: "twitter" }],
  },
  {
    title: "Tangent",
    year: "2025",
    path: "/work/tangent",
    component: Tangent,
    description:
      "A creative exploration of unexpected connections and divergent thinking patterns.",
    image: null,
    status: "An experimental browser that acts as your second brain.",
    links: [
      {
        label: "Demo",
        url: "https://x.com/emilyzsh/status/1882154398597734419",
        icon: "twitter",
      },
    ],
  },
  {
    title: "StyleScape",
    year: "2024",
    path: "/work/stylescape",
    component: StyleScape,
    description: "A visual journey through different aesthetic landscapes and design philosophies.",
    image: null,
    status: "infinitely generated world walkthroughs",
    links: [
      { label: "GitHub", url: "https://github.com/49emily/stylescape", icon: "github" },
      {
        label: "Project Page",
        url: "https://cs231n-final-project-stylescape.vercel.app/",
        icon: "external",
      },
    ],
  },
];

// Helper function to get projects with routes (for routing setup)
export const getProjectRoutes = () => {
  return projects.filter((project) => project.path && project.component);
};

// Helper function to get project by path
export const getProjectByPath = (path) => {
  return projects.find((project) => project.path === path);
};
