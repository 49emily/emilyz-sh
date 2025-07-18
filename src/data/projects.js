// Import project components
import WhatDoYouDreamAbout from "../components/works/WhatDoYouDreamAbout";
import LettersToMyMom from "../components/works/LettersToMyMom";
import DiffusionMe from "../components/works/DiffusionMe";

// Import project images
import whatdoyoudreamImage from "../assets/projects/dream.jpeg";
import lettersToMyMomImage from "../assets/projects/letters.jpg";
import pearlImage from "../assets/projects/pearl.jpeg";
import pearlMobileImage from "../assets/projects/pearlios.png";
import stylescapeImage from "../assets/projects/stylescape.png";
import diffusionMeImage from "../assets/projects/diffusionme.png";

import tangentImage from "../assets/projects/tangent.png";

import drawJournalImage from "../assets/projects/drawjournal.jpg";

export const projects = [
  {
    title: "journaling.ink",
    year: "2025",
    completionDate: "07/18/2025",
    creativeRating: 0.75,
    path: "/work/draw-with-your-journal",
    component: null,
    image: drawJournalImage,
    status:
      "draw with handwriting and text from your journal entries. opencv.js and custom fabric.js brushes.",
    links: [
      { label: "Live Site", url: "https://journaling.ink", icon: "external" },
      { label: "GitHub", url: "https://github.com/49emily/journal-draw", icon: "github" },
    ],
  },
  {
    title: "what do you dream about?",
    year: "2025",
    completionDate: "06/15/2025",
    creativeRating: 0.8,
    path: "/work/what-do-you-dream-about",
    component: WhatDoYouDreamAbout,
    image: whatdoyoudreamImage,
    status: "interactive real-time diffusion installation",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/49emily/what-do-you-dream-about",
        icon: "github",
      },
      // { label: "Demo", url: "https://what-do-you-dream-about.com", icon: "external" },
    ],
  },
  {
    title: "Letters to my Mom",
    year: "2025",
    completionDate: "05/10/2025",
    creativeRating: 0.9,
    path: "/work/letters-to-my-mom",
    component: LettersToMyMom,
    image: lettersToMyMomImage,
    status: "series of generative prints based on a love letter my dad wrote my mom in the 90s",
    // links: [
    //   { label: "GitHub", url: "https://github.com/49emily/ai-art-calligraphy", icon: "github" },
    // ],
  },
  {
    title: "emily-diffusion",
    year: "2025",
    completionDate: "06/05/2025",
    creativeRating: 0.6,
    path: "/work/emily-diffusion",
    component: DiffusionMe,
    image: diffusionMeImage,
    status: "training a generative model on my own art",
    links: [
      { label: "GitHub", url: "https://github.com/emilyz49/emily-diffusion", icon: "github" },
    ],
  },
  {
    title: "prl",
    year: "2024-25",
    completionDate: "12/20/2024",
    creativeRating: 0.4,
    path: null,
    component: null,
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
      { label: "Discord", url: "https://discord.gg/prl", icon: "discord" },
    ],
  },
  {
    title: "prl iOS",
    year: "2025",
    completionDate: "03/15/2025",
    creativeRating: 0.3,
    path: null,
    component: null,
    image: pearlMobileImage,
    status: "Mobile companion to writewithprl.com, coming soon to the iOS App Store.",
    links: [{ label: "DM for Testflight", url: "https://x.com/writewithprl", icon: "twitter" }],
  },
  {
    title: "Tangent",
    year: "2025",
    completionDate: "01/08/2025",
    creativeRating: 0.2,
    path: null,
    component: null,
    image: tangentImage,
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
    completionDate: "05/15/2024",
    creativeRating: 0.1,
    path: null,
    component: null,
    image: stylescapeImage,
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
