export type ProjectCategory =
  | "WEB_DEVELOPMENT"
  | "BRANDING"
  | "CUSTOM_SOFTWARE"
  | "ECOMMERCE";

export type BlogCategory =
  | "WEB_DEVELOPMENT"
  | "BRANDING"
  | "ECOMMERCE"
  | "BUSINESS"
  | "DESIGN";

export type ApiProject = {
  id: string;
  slug: string;
  title: string;
  client: string;
  clientType: string;
  category: ProjectCategory;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  timeline: string;
  coverImage?: string | null;
  images: string[];
  metrics?: Record<string, string> | null;
  featured: boolean;
  published: boolean;
  order: number;
};

export type ApiService = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  startingPrice: string;
  includes: string[];
  processSteps: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  order: number;
  active: boolean;
};

export type ApiBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage?: string | null;
  readTime: number;
  published: boolean;
  featured: boolean;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
};

export type ApiTestimonial = {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  quote: string;
  avatar?: string | null;
  rating: number;
  featured: boolean;
  order: number;
};
