export type BlogCategory =
  | "Web Development"
  | "Branding"
  | "E-commerce"
  | "Business"
  | "Design";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ethiopian-business-website-2025",
    title: "Why Every Ethiopian Business Needs a Website in 2025",
    excerpt:
      "Internet penetration in Ethiopia is growing fast. Businesses that establish their online presence now will have a significant head start.",
    category: "Web Development",
    readTime: "5 min read",
    date: "December 2025",
    author: "Raafat",
    tags: ["website", "ethiopia", "growth"],
  },
  {
    slug: "great-logo-principles",
    title: "What Makes a Great Logo? 5 Principles We Follow",
    excerpt:
      "A logo is more than a pretty mark. It's the visual foundation of your entire brand. Here's what we consider when designing one.",
    category: "Branding",
    readTime: "4 min read",
    date: "November 2025",
    author: "Raafat",
    tags: ["logo", "branding", "design"],
  },
  {
    slug: "selling-online-ethiopia",
    title: "How to Start Selling Online in Ethiopia: A Practical Guide",
    excerpt:
      "From choosing a platform to setting up payment methods — a step-by-step guide for Ethiopian entrepreneurs ready to go online.",
    category: "E-commerce",
    readTime: "7 min read",
    date: "October 2025",
    author: "Raafat",
    tags: ["ecommerce", "payments", "guide"],
  },
  {
    slug: "color-palette-ethiopian-brand",
    title: "Choosing the Right Color Palette for Your Ethiopian Brand",
    excerpt:
      "Colors carry cultural meaning. Here's how we help brands pick palettes that resonate locally and look great globally.",
    category: "Design",
    readTime: "6 min read",
    date: "September 2025",
    author: "Raafat",
    tags: ["colors", "branding"],
  },
  {
    slug: "website-redesign-signs",
    title: "5 Signs Your Business Needs a Website Redesign",
    excerpt:
      "Slow load times, poor mobile experience, or outdated branding? These signs mean it's time for a refresh.",
    category: "Web Development",
    readTime: "5 min read",
    date: "August 2025",
    author: "Raafat",
    tags: ["redesign", "ux"],
  },
  {
    slug: "cost-no-website-ethiopia",
    title: "The Real Cost of Not Having a Website in Ethiopia",
    excerpt:
      "Every day without a web presence, potential customers find your competitors instead. Here's what that costs in practice.",
    category: "Business",
    readTime: "6 min read",
    date: "July 2025",
    author: "Raafat",
    tags: ["business", "strategy"],
  },
];

export const blogFilters = [
  "All",
  "Web Development",
  "Branding",
  "E-commerce",
  "Business",
  "Design",
] as const;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
