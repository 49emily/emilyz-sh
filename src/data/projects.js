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

import tangentImage from "../assets/projects/tangent.png";

export const projects = [
  {
    title: "what do you dream about?",
    year: "2025",
    path: "/work/what-do-you-dream-about",
    component: WhatDoYouDreamAbout,
    image: whatdoyoudreamImage,
    status: "real-time diffusion installation",
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
    image: lettersToMyMomImage,
    status: "series of generative prints",
    links: [
      { label: "GitHub", url: "https://github.com/49emily/ai-art-calligraphy", icon: "github" },
    ],
  },
  {
    title: "diffusion-me",
    year: "2025",
    path: "/work/diffusion-me",
    component: DiffusionMe,
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
    path: null,
    component: null,
    image: pearlMobileImage,
    status: "Mobile companion to writewithprl.com, coming soon to the iOS App Store.",
    links: [{ label: "DM for Testflight", url: "https://x.com/writewithprl", icon: "twitter" }],
  },
  {
    title: "Tangent",
    year: "2025",
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
