import bcrypt from "bcrypt";
import {
  BlogCategory,
  PrismaClient,
  ProjectCategory,
} from "@prisma/client";

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 12;

function blogBody(title: string): string {
  const paragraphs = [
    `Ethiopia's digital landscape is evolving rapidly, and ${title.toLowerCase()} is more relevant than ever for businesses that want to grow sustainably.`,
    "At RAAFAT-DIGITAL, we work with founders, NGOs, retailers, and established companies across Harar, Addis Ababa, and beyond. Our experience shows that clarity, speed, and local context matter as much as technology choices.",
    "Whether you are launching your first website, refreshing a brand, or building custom software, the principles in this article apply to real projects we have delivered for Ethiopian clients.",
    "We believe in transparent communication, realistic timelines, and solutions that your team can actually maintain after launch. That means choosing the right stack, documenting decisions, and planning for mobile-first users who discover you on social media.",
    "If you are ready to take the next step, reach out through our contact form. We typically respond within one business day and offer a free discovery call to understand your goals before proposing a clear scope and budget.",
    "Thank you for reading — we hope this guide helps you make confident decisions for your business in 2025 and beyond.",
  ];
  return paragraphs.join("\n\n");
}

const defaultSettings = [
  { key: "site_name", value: "RAAFAT-DIGITAL" },
  { key: "tagline", value: "We Digitalize Everything" },
  { key: "contact_email", value: "hello@raafat.digital" },
  { key: "whatsapp_number", value: "+251000000000" },
  { key: "telegram_handle", value: "@raafatdigital" },
  { key: "instagram_url", value: "" },
  { key: "linkedin_url", value: "" },
  { key: "address", value: "Harar, Ethiopia" },
  { key: "office_hours", value: "Mon–Fri, 9:00 AM – 6:00 PM EAT" },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@raafat.digital";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me-on-first-login";

  await prisma.contactMessage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.service.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.admin.deleteMany();

  const passwordHash = await bcrypt.hash(adminPassword, BCRYPT_ROUNDS);
  await prisma.admin.create({
    data: {
      email: adminEmail,
      passwordHash,
      name: "Raafat",
    },
  });

  const services = [
    {
      slug: "web-development",
      title: "Web Design & Development",
      subtitle:
        "Beautiful, fast, and responsive websites that work on every device. From landing pages to full web applications.",
      description:
        "Your website is often the first impression customers have of your business. We design and build sites that look professional, load fast, and work flawlessly on phones, tablets, and desktops.",
      icon: "Globe",
      startingPrice: "Starting from ETB 15,000",
      includes: [
        "Custom website design",
        "Mobile-first responsive development",
        "Landing pages",
        "Web applications",
        "CMS integration",
        "Performance optimization",
        "1 month free support after launch",
      ],
      processSteps: [
        { step: 1, title: "Discovery", description: "We learn your business, audience, and goals." },
        { step: 2, title: "Design", description: "Wireframes and visual design for your approval." },
        { step: 3, title: "Development", description: "We build, test, and optimize across devices." },
        { step: 4, title: "Launch", description: "Go live with training and post-launch support." },
      ],
      faqs: [
        {
          question: "How long does a website take?",
          answer: "Most websites take 1–3 weeks depending on scope and content readiness.",
        },
        {
          question: "Do you provide hosting?",
          answer: "Yes, we can set up hosting and domain configuration as part of the project.",
        },
      ],
      order: 0,
    },
    {
      slug: "branding",
      title: "Branding & Identity",
      subtitle:
        "Logos, color systems, typography, and brand guidelines that make your business unforgettable.",
      description:
        "Strong branding sets you apart in a crowded market. We create cohesive visual identities — from logo concepts to complete brand guidelines.",
      icon: "Palette",
      startingPrice: "Starting from ETB 8,000",
      includes: [
        "Logo design (3 concepts)",
        "Color palette system",
        "Typography selection",
        "Brand guidelines document",
        "Business card design",
        "Social media kit",
        "Letterhead & stationery",
      ],
      processSteps: [
        { step: 1, title: "Research", description: "We study your market, competitors, and audience." },
        { step: 2, title: "Concepts", description: "Three distinct logo directions for you to choose from." },
        { step: 3, title: "Refinement", description: "We polish the chosen direction into a full system." },
        { step: 4, title: "Delivery", description: "Brand guidelines and all asset files handed over." },
      ],
      faqs: [
        {
          question: "How many logo revisions are included?",
          answer: "We include reasonable revisions within the agreed scope — typically 2–3 rounds after concept selection.",
        },
        {
          question: "What file formats do I receive?",
          answer: "PNG, SVG, PDF, and source files suitable for print and digital use.",
        },
      ],
      order: 1,
    },
    {
      slug: "custom-software",
      title: "Custom Software & SaaS",
      subtitle:
        "Tailor-made web applications, management systems, and SaaS platforms built for your exact needs.",
      description:
        "Off-the-shelf software rarely fits unique workflows. We build custom web applications and SaaS products using modern stacks tailored to how your team actually works.",
      icon: "Code2",
      startingPrice: "Starting from ETB 40,000",
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
      processSteps: [
        { step: 1, title: "Scoping", description: "Detailed requirements and technical architecture." },
        { step: 2, title: "Design & Build", description: "Iterative development with regular demos." },
        { step: 3, title: "Testing", description: "QA across devices and user scenarios." },
        { step: 4, title: "Deploy & Support", description: "Production launch and maintenance options." },
      ],
      faqs: [
        {
          question: "How long do custom projects take?",
          answer: "Typically 4–12 weeks depending on complexity and feature set.",
        },
        {
          question: "Who owns the code?",
          answer: "You own the deliverables upon final payment as outlined in our terms.",
        },
      ],
      order: 2,
    },
    {
      slug: "ecommerce",
      title: "E-commerce Solutions",
      subtitle:
        "Online stores that convert visitors into customers — built with secure payments, inventory management, and fast checkout.",
      description:
        "Selling online in Ethiopia is growing fast — and your store needs to keep up. We build e-commerce experiences with local and international payment options.",
      icon: "ShoppingCart",
      startingPrice: "Starting from ETB 20,000",
      includes: [
        "Store design & setup",
        "Product catalog management",
        "Payment integration (local & international)",
        "Inventory management",
        "Order management system",
        "Mobile-optimized checkout",
        "SEO setup",
      ],
      processSteps: [
        { step: 1, title: "Store Planning", description: "Catalog structure, payments, and shipping flow." },
        { step: 2, title: "Design", description: "Product pages and checkout optimized for conversion." },
        { step: 3, title: "Integration", description: "Payments, inventory, and order workflows." },
        { step: 4, title: "Launch", description: "Go live with training and sales support tips." },
      ],
      faqs: [
        {
          question: "Which payment methods can you integrate?",
          answer: "We work with common Ethiopian and international gateways based on your needs.",
        },
        {
          question: "Can I manage products myself?",
          answer: "Yes — we set up an admin panel so you can add and edit products easily.",
        },
      ],
      order: 3,
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  const projects = [
    {
      slug: "addis-marketplace",
      title: "Addis Marketplace",
      client: "Addis Marketplace",
      clientType: "E-commerce · Ethiopia",
      category: ProjectCategory.ECOMMERCE,
      description: "A full e-commerce platform for a multi-vendor marketplace in Addis Ababa.",
      challenge: "Launch a scalable marketplace for local vendors with minimal technical overhead.",
      solution: "Custom storefront, vendor onboarding, and integrated payment flows.",
      result: "Platform launched on schedule with vendors onboarded in the first month.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      timeline: "8 weeks",
      metrics: { traffic: "+40%", delivery: "8 weeks", satisfaction: "100%" },
      features: [
        "Multi-vendor storefront with role-based admin",
        "Integrated payment and order tracking",
        "Mobile-first product discovery",
        "Vendor onboarding workflow",
      ],
      liveUrl: "https://example.com/addis-marketplace",
      technicalNotes:
        "We chose PostgreSQL for transactional integrity across vendors and orders, and split the admin dashboard from the public storefront for clearer security boundaries.",
      nextSteps:
        "Planned enhancements include automated vendor payouts and advanced inventory forecasting.",
      featured: true,
      order: 0,
    },
    {
      slug: "harar-coffee-brand",
      title: "Harar Coffee Brand",
      client: "Harar Coffee Brand",
      clientType: "Export · Harar",
      category: ProjectCategory.BRANDING,
      description: "Complete brand identity for an Ethiopian specialty coffee export company.",
      challenge: "Stand out in international specialty coffee markets while honoring Harar heritage.",
      solution: "Distinctive visual identity with flexible guidelines for print and digital.",
      result: "Brand adopted across packaging, website, and trade show materials.",
      technologies: ["Figma", "Adobe Illustrator"],
      timeline: "2 weeks",
      metrics: { traffic: "3 concepts", delivery: "2 weeks", satisfaction: "100%" },
      order: 1,
    },
    {
      slug: "ngo-management-system",
      title: "NGO Management System",
      client: "Addis Youth Foundation",
      clientType: "NGO · Addis Ababa",
      category: ProjectCategory.CUSTOM_SOFTWARE,
      description: "A custom internal management system for a youth-focused NGO.",
      challenge: "Replace spreadsheets with a secure system tailored to NGO workflows.",
      solution: "Role-based web app with reporting and donor management modules.",
      result: "Team adoption within two weeks of launch; reporting time cut significantly.",
      technologies: ["React", "Node.js", "MongoDB"],
      timeline: "10 weeks",
      metrics: { traffic: "-60% reporting", delivery: "10 weeks", satisfaction: "100%" },
      order: 2,
    },
    {
      slug: "dire-dawa-restaurant",
      title: "Dire Dawa Restaurant",
      client: "Dire Dawa Restaurant",
      clientType: "Hospitality · Dire Dawa",
      category: ProjectCategory.WEB_DEVELOPMENT,
      description: "A restaurant website with online menu, reservations, and delivery info.",
      challenge: "Increase visibility and make menu and hours easy to find on mobile.",
      solution: "Fast, bilingual-friendly site with clear CTAs for reservations and calls.",
      result: "Higher engagement from mobile search and social referrals.",
      technologies: ["React", "Tailwind CSS"],
      timeline: "2 weeks",
      metrics: { traffic: "+55%", delivery: "2 weeks", satisfaction: "100%" },
      order: 3,
    },
    {
      slug: "mekelle-fashion-store",
      title: "Mekelle Fashion Store",
      client: "Mekelle Fashion Store",
      clientType: "Retail · Mekelle",
      category: ProjectCategory.ECOMMERCE,
      description: "An online clothing store with size guide, wishlist, and local payment integration.",
      challenge: "Sell online with sizing confidence and familiar local payment methods.",
      solution: "Store with size guide, wishlist, and integrated local payments.",
      result: "Steady order growth after launch with low cart abandonment on mobile.",
      technologies: ["React", "Stripe", "Local payments"],
      timeline: "5 weeks",
      metrics: { traffic: "+30%", delivery: "5 weeks", satisfaction: "100%" },
      order: 4,
    },
    {
      slug: "startup-pitch-deck-brand",
      title: "Startup Pitch Deck Brand",
      client: "Ethiopian Fintech Startup",
      clientType: "Fintech · Addis Ababa",
      category: ProjectCategory.BRANDING,
      description: "Brand identity and pitch deck design for an Ethiopian fintech startup.",
      challenge: "Communicate trust and innovation to investors in a competitive space.",
      solution: "Clean brand system and polished pitch deck aligned with product vision.",
      result: "Successfully used in investor meetings and accelerator applications.",
      technologies: ["Figma", "Keynote templates"],
      timeline: "3 weeks",
      metrics: { traffic: "12 slides", delivery: "3 weeks", satisfaction: "100%" },
      order: 5,
    },
  ];

  for (const p of projects) {
    await prisma.project.create({
      data: {
        ...p,
        features: "features" in p && Array.isArray(p.features) ? p.features : [],
        images: [],
        published: true,
      },
    });
  }

  const testimonials = [
    {
      name: "Fatima Hassan",
      role: "Owner",
      company: "Harar Spice Market",
      quote:
        "RAAFAT-DIGITAL transformed our online presence. We went from zero to a fully functional e-commerce store in just 3 weeks. The team was patient, responsive, and truly cared about our success.",
      avatar: "FH",
      order: 0,
    },
    {
      name: "Solomon Tesfaye",
      role: "Director",
      company: "Addis Youth Foundation",
      quote:
        "They built our NGO's management system from scratch. What impressed us most was how well they understood our mission, not just our technical requirements.",
      avatar: "ST",
      order: 1,
    },
    {
      name: "Meron Alemu",
      role: "Founder",
      company: "Meron Consulting",
      quote:
        "Our brand identity finally feels professional. The logo, colors, and guidelines they delivered have elevated how clients perceive us at every touchpoint.",
      avatar: "MA",
      order: 2,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  const blogPosts = [
    {
      slug: "ethiopian-business-website-2025",
      title: "Why Every Ethiopian Business Needs a Website in 2025",
      excerpt:
        "Internet penetration in Ethiopia is growing fast. Businesses that establish their online presence now will have a significant head start.",
      category: BlogCategory.WEB_DEVELOPMENT,
      readTime: 5,
      tags: ["website", "ethiopia", "growth"],
    },
    {
      slug: "great-logo-principles",
      title: "What Makes a Great Logo? 5 Principles We Follow",
      excerpt:
        "A logo is more than a pretty mark. It's the visual foundation of your entire brand. Here's what we consider when designing one.",
      category: BlogCategory.BRANDING,
      readTime: 4,
      tags: ["logo", "branding", "design"],
    },
    {
      slug: "selling-online-ethiopia",
      title: "How to Start Selling Online in Ethiopia: A Practical Guide",
      excerpt:
        "From choosing a platform to setting up payment methods — a step-by-step guide for Ethiopian entrepreneurs ready to go online.",
      category: BlogCategory.ECOMMERCE,
      readTime: 7,
      tags: ["ecommerce", "payments", "guide"],
    },
    {
      slug: "color-palette-ethiopian-brand",
      title: "Choosing the Right Color Palette for Your Ethiopian Brand",
      excerpt:
        "Colors carry cultural meaning. Here's how we help brands pick palettes that resonate locally and look great globally.",
      category: BlogCategory.DESIGN,
      readTime: 6,
      tags: ["colors", "branding"],
    },
    {
      slug: "website-redesign-signs",
      title: "5 Signs Your Business Needs a Website Redesign",
      excerpt:
        "Slow load times, poor mobile experience, or outdated branding? These signs mean it's time for a refresh.",
      category: BlogCategory.WEB_DEVELOPMENT,
      readTime: 5,
      tags: ["redesign", "ux"],
    },
    {
      slug: "cost-no-website-ethiopia",
      title: "The Real Cost of Not Having a Website in Ethiopia",
      excerpt:
        "Every day without a web presence, potential customers find your competitors instead. Here's what that costs in practice.",
      category: BlogCategory.BUSINESS,
      readTime: 6,
      tags: ["business", "strategy"],
    },
  ];

  const now = new Date();
  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    await prisma.blogPost.create({
      data: {
        ...post,
        content: blogBody(post.title),
        published: true,
        featured: i === 0,
        publishedAt: new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  for (const setting of defaultSettings) {
    await prisma.siteSetting.create({ data: setting });
  }

  console.log("✅ Seed completed");
  console.log(`   Admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
