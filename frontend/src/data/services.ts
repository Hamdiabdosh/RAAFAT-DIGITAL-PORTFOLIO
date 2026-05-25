export type ServiceSlug = "web-development" | "branding" | "custom-software" | "ecommerce";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: "Globe" | "Palette" | "Code2" | "ShoppingCart";
  startingPrice: string;
  category: string;
  includes: string[];
  process: { title: string; description: string }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Design & Development",
    shortDescription:
      "Beautiful, fast, and responsive websites that work on every device. From landing pages to full web applications.",
    fullDescription:
      "Your website is often the first impression customers have of your business. We design and build sites that look professional, load fast, and work flawlessly on phones, tablets, and desktops. Whether you need a simple landing page or a full web application, we deliver with care and attention to Ethiopian market needs.",
    icon: "Globe",
    startingPrice: "Starting from ETB 15,000",
    category: "Web Development",
    includes: [
      "Custom website design",
      "Mobile-first responsive development",
      "Landing pages",
      "Web applications",
      "CMS integration",
      "Performance optimization",
      "1 month free support after launch",
    ],
    process: [
      { title: "Discovery", description: "We learn your business, audience, and goals." },
      { title: "Design", description: "Wireframes and visual design for your approval." },
      { title: "Development", description: "We build, test, and optimize across devices." },
      { title: "Launch", description: "Go live with training and post-launch support." },
    ],
    faq: [
      {
        q: "How long does a website take?",
        a: "Most websites take 1–3 weeks depending on scope and content readiness.",
      },
      {
        q: "Do you provide hosting?",
        a: "Yes, we can set up hosting and domain configuration as part of the project.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding & Identity",
    shortDescription:
      "Logos, color systems, typography, and brand guidelines that make your business unforgettable.",
    fullDescription:
      "Strong branding sets you apart in a crowded market. We create cohesive visual identities — from logo concepts to complete brand guidelines — that reflect your values and resonate with Ethiopian customers. Every element is designed to work across print, digital, and social media.",
    icon: "Palette",
    startingPrice: "Starting from ETB 8,000",
    category: "Branding",
    includes: [
      "Logo design (3 concepts)",
      "Color palette system",
      "Typography selection",
      "Brand guidelines document",
      "Business card design",
      "Social media kit",
      "Letterhead & stationery",
    ],
    process: [
      { title: "Research", description: "We study your market, competitors, and audience." },
      { title: "Concepts", description: "Three distinct logo directions for you to choose from." },
      { title: "Refinement", description: "We polish the chosen direction into a full system." },
      { title: "Delivery", description: "Brand guidelines and all asset files handed over." },
    ],
    faq: [
      {
        q: "How many logo revisions are included?",
        a: "We include reasonable revisions within the agreed scope — typically 2–3 rounds after concept selection.",
      },
      {
        q: "What file formats do I receive?",
        a: "PNG, SVG, PDF, and source files suitable for print and digital use.",
      },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software & SaaS",
    shortDescription:
      "Tailor-made web applications, management systems, and SaaS platforms built for your exact needs.",
    fullDescription:
      "Off-the-shelf software rarely fits unique workflows. We build custom web applications and SaaS products using modern stacks (React, Node.js) tailored to how your team actually works. From NGO management systems to internal tools, we partner with you from requirements through deployment and beyond.",
    icon: "Code2",
    startingPrice: "Starting from ETB 40,000",
    category: "Custom Software",
    includes: [
      "Requirements discovery & planning",
      "UI/UX design",
      "Full-stack development (React + Node.js)",
      "Database design",
      "API development",
      "Testing & QA",
      "Deployment & hosting setup",
      "Ongoing maintenance",
    ],
    process: [
      { title: "Scoping", description: "Detailed requirements and technical architecture." },
      { title: "Design & Build", description: "Iterative development with regular demos." },
      { title: "Testing", description: "QA across devices and user scenarios." },
      { title: "Deploy & Support", description: "Production launch and maintenance options." },
    ],
    faq: [
      {
        q: "How long do custom projects take?",
        a: "Typically 4–12 weeks depending on complexity and feature set.",
      },
      {
        q: "Who owns the code?",
        a: "You own the deliverables upon final payment as outlined in our terms.",
      },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce Solutions",
    shortDescription:
      "Online stores that convert visitors into customers — built with secure payments, inventory management, and fast checkout.",
    fullDescription:
      "Selling online in Ethiopia is growing fast — and your store needs to keep up. We build e-commerce experiences with local and international payment options, inventory tools, and mobile-first checkout flows designed to turn browsers into buyers.",
    icon: "ShoppingCart",
    startingPrice: "Starting from ETB 20,000",
    category: "E-commerce",
    includes: [
      "Store design & setup",
      "Product catalog management",
      "Payment integration (local & international)",
      "Inventory management",
      "Order management system",
      "Mobile-optimized checkout",
      "SEO setup",
    ],
    process: [
      { title: "Store Planning", description: "Catalog structure, payments, and shipping flow." },
      { title: "Design", description: "Product pages and checkout optimized for conversion." },
      { title: "Integration", description: "Payments, inventory, and order workflows." },
      { title: "Launch", description: "Go live with training and sales support tips." },
    ],
    faq: [
      {
        q: "Which payment methods can you integrate?",
        a: "We work with common Ethiopian and international gateways based on your needs.",
      },
      {
        q: "Can I manage products myself?",
        a: "Yes — we set up an admin panel so you can add and edit products easily.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
