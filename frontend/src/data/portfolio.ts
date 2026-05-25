export type ProjectCategory =
  | "Web Development"
  | "Branding"
  | "Custom Software"
  | "E-commerce";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  clientType: string;
  description: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  result: string;
  timeline: string;
  technologies: string[];
  process: string[];
  metrics: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "addis-marketplace",
    title: "Addis Marketplace",
    category: "E-commerce",
    clientType: "E-commerce · Ethiopia",
    description: "A full e-commerce platform for a multi-vendor marketplace in Addis Ababa.",
    shortDescription:
      "Multi-vendor marketplace with vendor dashboards and local payments.",
    challenge: "Launch a scalable marketplace for local vendors with minimal technical overhead.",
    solution: "Custom storefront, vendor onboarding, and integrated payment flows.",
    result: "Platform launched on schedule with vendors onboarded in the first month.",
    timeline: "8 weeks",
    technologies: ["React", "Node.js", "PostgreSQL"],
    process: ["Discovery workshops", "UX design", "Agile development", "Launch support"],
    metrics: [
      { value: "+40%", label: "Online traffic" },
      { value: "8 weeks", label: "Delivery time" },
      { value: "100%", label: "Client satisfaction" },
    ],
  },
  {
    slug: "harar-coffee-brand",
    title: "Harar Coffee Brand",
    category: "Branding",
    clientType: "Export · Harar",
    description: "Complete brand identity for an Ethiopian specialty coffee export company.",
    shortDescription: "Logo, packaging direction, and brand guidelines for export markets.",
    challenge: "Stand out in international specialty coffee markets while honoring Harar heritage.",
    solution: "Distinctive visual identity with flexible guidelines for print and digital.",
    result: "Brand adopted across packaging, website, and trade show materials.",
    timeline: "2 weeks",
    technologies: ["Figma", "Adobe Illustrator"],
    process: ["Market research", "Concept exploration", "Guidelines delivery"],
    metrics: [
      { value: "3", label: "Logo concepts" },
      { value: "2 weeks", label: "Delivery time" },
      { value: "100%", label: "Client satisfaction" },
    ],
  },
  {
    slug: "ngo-management-system",
    title: "NGO Management System",
    category: "Custom Software",
    clientType: "NGO · Addis Ababa",
    description: "A custom internal management system for a youth-focused NGO.",
    shortDescription: "Donor tracking, program management, and reporting in one system.",
    challenge: "Replace spreadsheets with a secure system tailored to NGO workflows.",
    solution: "Role-based web app with reporting and donor management modules.",
    result: "Team adoption within two weeks of launch; reporting time cut significantly.",
    timeline: "10 weeks",
    technologies: ["React", "Node.js", "MongoDB"],
    process: ["Requirements mapping", "Prototype review", "Phased rollout", "Training"],
    metrics: [
      { value: "-60%", label: "Reporting time" },
      { value: "10 weeks", label: "Delivery time" },
      { value: "100%", label: "Client satisfaction" },
    ],
  },
  {
    slug: "dire-dawa-restaurant",
    title: "Dire Dawa Restaurant",
    category: "Web Development",
    clientType: "Hospitality · Dire Dawa",
    description: "A restaurant website with online menu, reservations, and delivery info.",
    shortDescription: "Mobile-first site with menu, hours, and contact integration.",
    challenge: "Increase visibility and make menu and hours easy to find on mobile.",
    solution: "Fast, bilingual-friendly site with clear CTAs for reservations and calls.",
    result: "Higher engagement from mobile search and social referrals.",
    timeline: "2 weeks",
    technologies: ["React", "Tailwind CSS"],
    process: ["Content gathering", "Design", "Build", "SEO basics"],
    metrics: [
      { value: "+55%", label: "Mobile visits" },
      { value: "2 weeks", label: "Delivery time" },
      { value: "100%", label: "Client satisfaction" },
    ],
  },
  {
    slug: "mekelle-fashion-store",
    title: "Mekelle Fashion Store",
    category: "E-commerce",
    clientType: "Retail · Mekelle",
    description: "An online clothing store with size guide, wishlist, and local payment integration.",
    shortDescription: "Fashion e-commerce with size guide and local checkout.",
    challenge: "Sell online with sizing confidence and familiar local payment methods.",
    solution: "Store with size guide, wishlist, and integrated local payments.",
    result: "Steady order growth after launch with low cart abandonment on mobile.",
    timeline: "5 weeks",
    technologies: ["React", "Stripe", "Local payments"],
    process: ["Catalog setup", "Checkout design", "Payment testing", "Launch"],
    metrics: [
      { value: "+30%", label: "Online sales" },
      { value: "5 weeks", label: "Delivery time" },
      { value: "100%", label: "Client satisfaction" },
    ],
  },
  {
    slug: "startup-pitch-deck-brand",
    title: "Startup Pitch Deck Brand",
    category: "Branding",
    clientType: "Fintech · Addis Ababa",
    description: "Brand identity and pitch deck design for an Ethiopian fintech startup.",
    shortDescription: "Investor-ready deck and cohesive startup visual identity.",
    challenge: "Communicate trust and innovation to investors in a competitive space.",
    solution: "Clean brand system and polished pitch deck aligned with product vision.",
    result: "Successfully used in investor meetings and accelerator applications.",
    timeline: "3 weeks",
    technologies: ["Figma", "Keynote templates"],
    process: ["Brand workshop", "Visual system", "Deck design", "Handoff"],
    metrics: [
      { value: "12", label: "Deck slides" },
      { value: "3 weeks", label: "Delivery time" },
      { value: "100%", label: "Client satisfaction" },
    ],
  },
];

export const portfolioFilters = [
  "All",
  "Web Development",
  "Branding",
  "Custom Software",
  "E-commerce",
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
