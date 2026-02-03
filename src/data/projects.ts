export type WebApp = {
  title: string;
  repo?: string;
  description: string;
  tags: string[];
  demo?: string;
  thumbnail: string;
};

export const WEB_APPS: WebApp[] = [
  {
    title: "Dutch Expat Check",
    demo: "https://www.expatcheck.nl/",
    description:
      "An application that helps expats in the Netherlands to check their eligibility for tax deduction and benefits based on their personal circumstances.",
    tags: ["Next.js", "TypeScript", "Frontend", "Backend"],
    thumbnail: "/_static/projects/expat-check.png",
  },
  {
    title: "Savoria",
    demo: "https://restaurant-nextjs-jade.vercel.app/",
    repo: "https://github.com/karlo292/restaurant-nextjs",
    description:
      "A modern restaurant website built with Next.js, featuring modern design, menu showcase, reservation system, and customer reviews to enhance the dining experience.",
    tags: ["Next.js", "TypeScript", "Template", "Frontend"],
    thumbnail: "/_static/projects/savoria.png",
  },
  {
    title: "Infracharm",
    demo: "https://infracharm-website.vercel.app/",
    description:
    "The official website for Infracharm, showcasing their services, projects, and company information with a modern and responsive design provided by them.",
    tags: ["Next.js", "TypeScript", "Frontend"],
    thumbnail: "/_static/projects/infracharm.png",
  },
  {
    title: "GetFit",
    description:
    "A gym website design built with Figma for a fitness centar.",
    tags: ["Figma", "Design"],
    thumbnail: "/_static/projects/getfit.jpg",
  }
] as WebApp[];

export type Tool = {
  title: string;
  repo: string;
  demo: string;
  description: string;
  techs: string[];
};

export const TOOLS: Tool[] = [
  {
    title: "states-nepal",
    repo: "https://github.com/adarshaacharya/states-nepal",
    demo: "https://www.npmjs.com/package/states-nepal",
    description:
      "npm package to get the dataset about different administrative division of Nepal.",
    techs: ["npm-package"],
  },
  {
    title: "aaja (आज)",
    repo: "https://github.com/adarshaacharya/aaja",
    demo: "https://www.npmjs.com/package/aaja",
    description:
      "Cli tool to get today's nepali date, tithi, public events and current time.",
    techs: ["npm-package"],
  },
  {
    title: "ApiHub",
    repo: "https://github.com/adarshaacharya/ApiHub",
    demo:
      "https://marketplace.visualstudio.com/items?itemName=AadarshaAcharya.api-hub",
    description:
      "VS Code extension to get free third party api url on different categories.",
    techs: ["vscode-extension"],
  },
  {
    title: "shitcommits",
    repo: "https://github.com/adarshaacharya/shitcommits",
    demo: "https://www.npmjs.com/package/shitcommits",
    description: "Cli tool to make git commits with not-so perfect messges.",
    techs: ["npm-package"],
  },
];
