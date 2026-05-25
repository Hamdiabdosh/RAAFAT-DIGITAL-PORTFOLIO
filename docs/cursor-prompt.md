# Cursor Prompt — RAAFAT-DIGITAL Portfolio Website


---

## 0. Context & Starting Point

We have an existing React template codebase already set up with:
- **React 19 + TanStack Router** (file-based routing in `src/routes/`)
- **Tailwind CSS v4** with the full RAAFAT-DIGITAL design system (gold `#D4A017`, Cinzel display font, DM Sans body, dark/light mode tokens in `src/styles.css`)
- **shadcn/ui** component library in `src/components/ui/`
- **Recharts** for charts, **Sonner** for toasts, **React Hook Form + Zod** for forms
- **Lucide React** for icons
- Existing layouts: `PublicLayout`, `AppLayout`, `AuthLayout` in `src/components/layout/`
- Existing pages: landing (`/`), login, register, dashboard, settings, etc.

**Task:** Build a new public-facing **company portfolio website** for RAAFAT-DIGITAL on top of this template. This is NOT the dashboard app — it is the marketing/portfolio site that lives at the root `/` route and replaces the current placeholder landing page. The dashboard routes remain untouched.

---

## 1. Company Profile

| Field | Value |
|-------|-------|
| **Company name** | RAAFAT-DIGITAL |
| **Tagline** | "We Digitalize Everything" |
| **Type** | Digital agency / tech company |
| **Location** | Ethiopia (Harar) — serves clients across Ethiopia |
| **Founded** | 2025 (less than 1 year old, new but ambitious) |
| **Team** | Solo founder — present as "a passionate team" in copy, not "just me" |
| **Services** | Web Design & Development, Branding & Identity, Custom Software / SaaS, E-commerce Solutions |
| **Target clients** | Startups, SMBs, enterprises, NGOs, e-commerce brands, individual entrepreneurs — all in Ethiopia |
| **Positioning** | Mid-market — quality work at fair value, not the cheapest, not the most expensive |
| **Tone** | Warm & human — "We care about your success." Approachable, encouraging, professional but not cold |
| **Languages** | English (primary) + Amharic (secondary) — see Section 8 for i18n approach |
| **Pricing display** | Starting-from prices only (not full tiers) |
| **Blog** | Yes — include a blog/articles section |
| **Contact methods** | Contact form + email + WhatsApp + Telegram + book a call (Calendly-style) |

---

## 2. Route Structure

Replace the current `/` route content entirely. Add these new routes:

```
/                    → Home (portfolio landing page) — replaces current index.tsx
/about               → About page
/services            → Services overview page
/services/:slug      → Individual service detail page
/portfolio           → Portfolio / case studies page
/portfolio/:slug     → Individual case study page
/blog                → Blog listing page
/blog/:slug          → Individual blog post page
/contact             → Contact page
/privacy             → Privacy policy (simple)
/terms               → Terms of service (simple)
```

All these routes use `PublicLayout` (Navbar + Footer). Dashboard routes (`/dashboard/*`, `/login`, `/register`, `/settings`) remain completely unchanged.

---

## 3. Navigation Updates

### 3.1 Update the Navbar (`src/components/layout/navbar.tsx`)

**Desktop nav links:**
- Home → `/`
- Services → `/services`
- Portfolio → `/portfolio`
- Blog → `/blog`
- About → `/about`
- Contact → `/contact` (styled as gold outline button, not a plain link)

**Mobile menu:** Same links in a slide-down drawer. Contact button full-width at bottom.

**Right side of navbar:**
- Theme toggle (already exists — keep it)
- "Get a Quote" button → scrolls to contact form on `/contact` or navigates to `/contact`

**Language switcher:** Small `EN | አማ` toggle next to the theme toggle. Clicking switches between English and Amharic. See Section 8.

### 3.2 Update the Footer (`src/components/layout/footer.tsx`)

Four columns:
1. **Brand** — Logo, tagline "We Digitalize Everything", short one-liner about the company, social icons (LinkedIn, Telegram, WhatsApp, Instagram, TikTok — all `href="#"` placeholders)
2. **Services** — Web Development, Branding & Identity, Custom Software, E-commerce Solutions (links to `/services`)
3. **Company** — About, Portfolio, Blog, Contact, Privacy Policy, Terms
4. **Contact** — Email: `hello@raafat.digital` (placeholder), WhatsApp: `+251 XXX XXX XXX` (placeholder), Location: Harar, Ethiopia

Bottom bar: © 2025 RAAFAT-DIGITAL · All rights reserved · Made with ❤️ in Ethiopia

---

## 4. Page Specifications

---

### 4.1 Home Page (`/`) — Full redesign of `src/routes/index.tsx`

Build ALL sections in this exact order:

---

#### Section 1 — Hero

- Full viewport height (`min-h-screen`)
- Background: deep black with dot grid overlay (already in CSS as `.dot-grid`) + centered radial gold glow
- **Announcement bar** (top of hero, above heading): thin bar with gold background at 10% opacity, gold border, text: "🇪🇹 Proudly building Ethiopia's digital future" — centered, dismissible with × button
- **Badge pill:** pulsing gold dot + "Ethiopia's Digital Partner"
- **H1 heading** (Cinzel, fluid clamp 36px→80px, bold):
  ```
  We Digitalize
  Everything
  ```
  The word "Everything" on its own line in gold color
- **Subheading** (DM Sans, 18px, muted, max-width 560px, centered):
  "From stunning websites to powerful software — we help Ethiopian businesses, startups, and entrepreneurs build their digital presence and grow."
- **CTA buttons row:**
  - Primary (gold): "Start Your Project →" → links to `/contact`
  - Outline: "See Our Work" → links to `/portfolio`
- **Scroll indicator:** bouncing chevron at bottom center
- **Floating trust badges** (bottom of hero, horizontal row of 3 small cards):
  - "🌐 Web & Mobile"
  - "🎨 Branding"
  - "⚙️ Custom Software"
  - "🛍️ E-commerce"

---

#### Section 2 — Social Proof Bar

- Full-width dark card, no padding excess
- Content: "Trusted by businesses across Ethiopia" label centered above
- Row of 6 placeholder client logo boxes (gray rounded rectangles with "Client Logo" text in muted — these will be replaced with real logos later)
- Subtle left-to-right CSS marquee/scroll animation on the logos

---

#### Section 3 — Services Overview

- Section label: "WHAT WE DO" in gold uppercase
- H2: "Services built for your growth" (Cinzel)
- Subtext: "We offer end-to-end digital services tailored to Ethiopian businesses at every stage."
- **4 service cards** in a 2×2 grid (desktop), 1 column (mobile):

  **Card 1 — Web Design & Development**
  - Icon: `Globe` (lucide)
  - Title: "Web Design & Development"
  - Description: "Beautiful, fast, and responsive websites that work on every device. From landing pages to full web applications."
  - Starting from: "Starting from ETB 15,000"
  - CTA link: "Learn more →" → `/services/web-development`

  **Card 2 — Branding & Identity**
  - Icon: `Palette` (lucide)
  - Title: "Branding & Identity"
  - Description: "Logos, color systems, typography, and brand guidelines that make your business unforgettable."
  - Starting from: "Starting from ETB 8,000"
  - CTA link: "Learn more →" → `/services/branding`

  **Card 3 — Custom Software & SaaS**
  - Icon: `Code2` (lucide)
  - Title: "Custom Software & SaaS"
  - Description: "Tailor-made web applications, management systems, and SaaS platforms built for your exact needs."
  - Starting from: "Starting from ETB 40,000"
  - CTA link: "Learn more →" → `/services/custom-software`

  **Card 4 — E-commerce Solutions**
  - Icon: `ShoppingCart` (lucide)
  - Title: "E-commerce Solutions"
  - Description: "Online stores that convert visitors into customers — built with secure payments, inventory management, and fast checkout."
  - Starting from: "Starting from ETB 20,000"
  - CTA link: "Learn more →" → `/services/ecommerce`

- Card style: dark card bg, gold top accent bar on hover, icon in gold-dim rounded square, hover lifts card slightly

---

#### Section 4 — How We Work (Process)

- Section label: "OUR PROCESS" in gold
- H2: "Simple. Transparent. Effective." (Cinzel)
- 4-step horizontal timeline (stacked on mobile):

  **Step 1 — Discovery**
  Number "01" in large gold Cinzel. Title: "We Listen First". Description: "We start with a deep conversation about your business, goals, and challenges. No assumptions."

  **Step 2 — Strategy**
  Number "02". Title: "We Plan Together". Description: "A clear project roadmap, timeline, and budget — agreed upfront. No surprises."

  **Step 3 — Build**
  Number "03". Title: "We Build with Care". Description: "Regular updates, previews, and your feedback at every milestone. You're always in the loop."

  **Step 4 — Launch & Support**
  Number "04". Title: "We Stay with You". Description: "Launch day support and ongoing maintenance so you never feel abandoned after delivery."

- Connector line between steps (gold dashed line, hidden on mobile)

---

#### Section 5 — Portfolio Preview

- Section label: "OUR WORK" in gold
- H2: "Projects we're proud of" (Cinzel)
- Subtext: "Every project is a partnership. Here's a glimpse of what we've built."
- **3 placeholder portfolio cards** in a row (2 on tablet, 1 on mobile):

  Each card contains:
  - Image area: dark gray placeholder rectangle with aspect ratio 16/9, gold border on hover, "Project Screenshot" label centered in muted text
  - Category badge (gold pill): e.g. "Web Development", "Branding", "E-commerce"
  - Project title (bold): e.g. "Addis Marketplace", "Harar Coffee Brand", "NGO Management System"
  - Client type: e.g. "E-commerce · Ethiopia"
  - Short description: 1 sentence placeholder
  - "View Case Study →" link in gold

- Below cards: centered "View All Projects →" button (outline) linking to `/portfolio`

---

#### Section 6 — Stats / Achievements

- Dark card full width
- 4 stats in a row:
  - `10+` — Projects Delivered
  - `100%` — Client Satisfaction
  - `4` — Core Services
  - `1` — Mission: Digitalize Ethiopia
- Numbers in Cinzel gold, labels in muted uppercase small

---

#### Section 7 — Testimonials

- Section label: "KIND WORDS" in gold
- H2: "What our clients say" (Cinzel)
- **3 placeholder testimonial cards:**

  Card 1:
  - Quote: "RAAFAT-DIGITAL transformed our online presence. We went from zero to a fully functional e-commerce store in just 3 weeks. The team was patient, responsive, and truly cared about our success."
  - Name: "Fatima Hassan" (placeholder)
  - Role: "Owner, Harar Spice Market" (placeholder)
  - Avatar: initials "FH" in gold-dim circle

  Card 2:
  - Quote: "They built our NGO's management system from scratch. What impressed us most was how well they understood our mission, not just our technical requirements."
  - Name: "Solomon Tesfaye" (placeholder)
  - Role: "Director, Addis Youth Foundation" (placeholder)
  - Avatar: initials "ST"

  Card 3:
  - Quote: "Our brand identity finally feels professional. The logo, colors, and guidelines they delivered have elevated how clients perceive us at every touchpoint."
  - Name: "Meron Alemu" (placeholder)
  - Role: "Founder, Meron Consulting" (placeholder)
  - Avatar: initials "MA"

- Star rating (5 gold stars) above each quote

---

#### Section 8 — Why Choose Us

- Two-column layout (text left, visual right — stacked on mobile)
- **Left:** 
  - Section label: "WHY US" in gold
  - H2: "More than a vendor. A partner." (Cinzel)
  - Body: "We know what it's like to build something in Ethiopia. The challenges are real — limited resources, tight budgets, high expectations. We've built our services around that reality."
  - 4 bullet points with check icons in gold:
    - "Clear pricing, no hidden fees"
    - "Direct communication — you always talk to the person building your product"
    - "Fast turnaround without cutting corners"
    - "Ongoing support after launch"
- **Right:** A styled card showing a mock "project progress" UI — 4 rows with progress bars at different completion percentages, labeled "Discovery 100%", "Design 100%", "Development 75%", "Launch 20%" — uses the existing `Progress` component from shadcn/ui

---

#### Section 9 — Blog Preview

- Section label: "INSIGHTS" in gold
- H2: "From our blog" (Cinzel)
- **3 placeholder blog post cards:**

  Post 1:
  - Category: "Web Development"
  - Title: "Why Every Ethiopian Business Needs a Website in 2025"
  - Excerpt: "Internet penetration in Ethiopia is growing fast. Businesses that establish their online presence now will have a significant head start."
  - Read time: "5 min read"
  - Date: "December 2025"

  Post 2:
  - Category: "Branding"
  - Title: "What Makes a Great Logo? 5 Principles We Follow"
  - Excerpt: "A logo is more than a pretty mark. It's the visual foundation of your entire brand. Here's what we consider when designing one."
  - Read time: "4 min read"
  - Date: "November 2025"

  Post 3:
  - Category: "E-commerce"
  - Title: "How to Start Selling Online in Ethiopia: A Practical Guide"
  - Excerpt: "From choosing a platform to setting up payment methods — a step-by-step guide for Ethiopian entrepreneurs ready to go online."
  - Read time: "7 min read"
  - Date: "October 2025"

- Each card: category pill (gold), title (bold), excerpt (muted), date + read time row, "Read Article →" link
- Below: "Visit the Blog →" outline button linking to `/blog`

---

#### Section 10 — CTA / Contact Teaser

- Gold-dim background, gold border, rounded-2xl
- H2: "Ready to digitalize your business?" (Cinzel)
- Body: "Let's have a conversation. No pressure, no jargon — just an honest chat about how we can help."
- Two buttons: "Start a Project" (gold primary) + "WhatsApp Us" (outline with WhatsApp icon)
- Below buttons: small text "or email us at hello@raafat.digital"

---

### 4.2 About Page (`/about`)

Create `src/routes/about.tsx` using `PublicLayout`.

Sections in order:

**Hero:**
- H1: "About RAAFAT-DIGITAL" (Cinzel)
- Subtext: "A digital agency born in Ethiopia, built to help every kind of business thrive online."
- No full-height hero — compact, ~300px

**Story Section (2-col: text left, decorative right):**
- Title: "Our Story" (Cinzel)
- Body: "RAAFAT-DIGITAL was founded in 2025 in Harar, Ethiopia, with one clear mission: to make professional digital services accessible to Ethiopian businesses of all sizes. We saw too many great businesses held back by outdated online presence, complex processes, and agencies that didn't understand the local context. So we built something different — a digital partner that speaks your language, understands your market, and delivers results you can see."
- Right side: a styled card with the brand logo large, tagline, and location pin "Harar, Ethiopia 🇪🇹"

**Mission & Values (3 cards):**
- "Our Mission": "To digitalize every Ethiopian business — from the solo entrepreneur in Harar to the enterprise in Addis Ababa."
- "Our Vision": "An Ethiopia where every business, big or small, has the digital tools to compete, grow, and thrive."
- "Our Values": "Honesty. Quality. Warmth. We treat every project like it's our own business on the line."

**Team Section:**
- Title: "The Person Behind It" (Cinzel) — honest solo founder framing
- Single founder card: avatar placeholder (large initials circle "RD"), Name: "Raafat" (placeholder — user will fill real name), Title: "Founder & Lead Developer", Bio: "Full-stack developer and designer passionate about using technology to solve real problems for Ethiopian businesses. Every project gets my full attention and care.", Social icons: LinkedIn, GitHub (both `href="#"`)
- Below founder card: small text "Growing — we're always looking for talented collaborators. [Get in touch →]"

**Why Ethiopia Section:**
- Title: "Why We Focus on Ethiopia" (Cinzel)
- Body: "Ethiopia's digital economy is at an inflection point. With a young, growing population and increasing internet access, the opportunity for businesses to go digital has never been greater. We're here to make sure Ethiopian businesses don't miss this moment."
- 3 stat boxes: "120M+ Population", "Fast-growing internet penetration", "Booming startup ecosystem"

---

### 4.3 Services Page (`/services`)

Create `src/routes/services.tsx` using `PublicLayout`.

**Hero:** H1 "Our Services", subtext about end-to-end digital services for Ethiopian businesses. Compact hero.

**4 large service sections** — each alternating layout (image/visual left, text right — then text left, visual right):

Each service section includes:
- Service name (H2, Cinzel)
- Full description paragraph (3–4 sentences)
- Bullet list of what's included (5–6 items with check icons)
- Starting price badge: e.g. "Starting from ETB 15,000"
- CTA button: "Learn More" → to the detail page slug

**Service 1 — Web Design & Development** (`/services/web-development`)
Includes: Custom website design, Mobile-first responsive development, Landing pages, Web applications, CMS integration, Performance optimization, 1 month free support after launch

**Service 2 — Branding & Identity** (`/services/branding`)
Includes: Logo design (3 concepts), Color palette system, Typography selection, Brand guidelines document, Business card design, Social media kit, Letterhead & stationery

**Service 3 — Custom Software & SaaS** (`/services/custom-software`)
Includes: Requirements discovery & planning, UI/UX design, Full-stack development (React + Node.js), Database design, API development, Testing & QA, Deployment & hosting setup, Ongoing maintenance

**Service 4 — E-commerce Solutions** (`/services/ecommerce`)
Includes: Store design & setup, Product catalog management, Payment integration (local & international), Inventory management, Order management system, Mobile-optimized checkout, SEO setup

**FAQ Section at bottom of services page:**
- "How long does a project take?" — Websites: 1–3 weeks. Branding: 1–2 weeks. Custom software: 4–12 weeks depending on complexity.
- "Do you work with clients outside Harar?" — Yes, we work with clients across Ethiopia remotely.
- "What information do I need to get started?" — Just a brief description of your business and what you need. We'll guide you through the rest.
- "Do you offer payment plans?" — Yes, we offer flexible payment schedules for larger projects.
- "What happens after the project is delivered?" — All projects include a support period. We don't disappear after launch.

---

### 4.4 Individual Service Pages (`/services/:slug`)

Create `src/routes/services.$slug.tsx`.

Each service detail page (web-development, branding, custom-software, ecommerce) shows:
- Full-width hero with service name
- Detailed description
- What's included (expanded list)
- Process specific to that service (3–4 steps)
- Starting price + "Get a Quote" CTA
- 2 related portfolio placeholders at bottom
- FAQ for that specific service

Use a `services` data array/object in the file to drive the content — keyed by slug.

---

### 4.5 Portfolio Page (`/portfolio`)

Create `src/routes/portfolio.tsx` using `PublicLayout`.

**Hero:** H1 "Our Portfolio", subtext "Every project tells a story. Here are some of ours." Compact.

**Filter tabs** (above the grid): All | Web Development | Branding | Custom Software | E-commerce
- Filter buttons styled as pill tabs, active tab in gold
- Filtering is client-side JavaScript — no server calls

**Portfolio grid** (3 columns desktop, 2 tablet, 1 mobile):

Create 6 placeholder project cards:

1. **Addis Marketplace** — E-commerce | "A full e-commerce platform for a multi-vendor marketplace in Addis Ababa."
2. **Harar Coffee Brand** — Branding | "Complete brand identity for an Ethiopian specialty coffee export company."
3. **NGO Management System** — Custom Software | "A custom internal management system for a youth-focused NGO."
4. **Dire Dawa Restaurant** — Web Development | "A restaurant website with online menu, reservations, and delivery info."
5. **Mekelle Fashion Store** — E-commerce | "An online clothing store with size guide, wishlist, and local payment integration."
6. **Startup Pitch Deck Brand** — Branding | "Brand identity and pitch deck design for an Ethiopian fintech startup."

Each card:
- Image placeholder (gray rectangle 16:9, gold border on hover)
- Category pill (gold)
- Project title (bold, Cinzel)
- Client type / location
- Short description
- "View Case Study →" link

---

### 4.6 Individual Case Study Page (`/portfolio/:slug`)

Create `src/routes/portfolio.$slug.tsx`.

Each case study page:
- **Hero:** Project name, category, client type — large
- **Overview section:** Challenge, Solution, Result — 3 cards
- **Project details sidebar:** Service type, Timeline, Technologies used
- **Process section:** Step-by-step what we did
- **Image gallery placeholders:** 3 gray placeholder image blocks
- **Results section:** 3 metric cards (placeholder numbers like "+40% traffic", "3 weeks delivery", "100% client satisfaction")
- **CTA:** "Start a similar project →" → `/contact`
- **Related projects:** 2 other portfolio items

Use a `projects` data array keyed by slug.

---

### 4.7 Blog Page (`/blog`)

Create `src/routes/blog.tsx` using `PublicLayout`.

**Hero:** H1 "Insights & Articles", subtext "Practical advice for Ethiopian businesses navigating the digital world." Compact.

**Featured post** (large card, top): First blog post displayed prominently, full-width, with large image placeholder, title, excerpt, and "Read Article →" button.

**Posts grid** (below featured, 3 columns): Remaining posts as smaller cards.

**Category filter tabs:** All | Web Development | Branding | E-commerce | Business | Design

**Sidebar (desktop only):**
- Newsletter signup box: "Get articles in your inbox" — email input + subscribe button (gold)
- Popular tags cloud
- "Start a Project" mini CTA card

Use a `blogPosts` array with 6 placeholder posts covering the 3 from the homepage plus 3 more:
- Post 4: "Choosing the Right Color Palette for Your Ethiopian Brand"
- Post 5: "5 Signs Your Business Needs a Website Redesign"
- Post 6: "The Real Cost of Not Having a Website in Ethiopia"

---

### 4.8 Individual Blog Post Page (`/blog/:slug`)

Create `src/routes/blog.$slug.tsx`.

- Full article layout: large header, category + date + read time row, author (Raafat, placeholder), article body (long placeholder text using lorem ipsum mixed with real-looking headings like "Why This Matters", "What You Can Do", "The Bottom Line")
- Table of contents sidebar (sticky on desktop)
- At end: "Share this article" buttons (copy link, WhatsApp share, Telegram share)
- "Related articles" section (2 cards)
- Bottom CTA: "Need help with your digital presence? Let's talk." → `/contact`

---

### 4.9 Contact Page (`/contact`)

Create `src/routes/contact.tsx` using `PublicLayout`.

**Two-column layout** (form left, info right — stacked on mobile):

**Left — Contact Form:**
- H2: "Let's talk about your project" (Cinzel)
- Subtext: "Fill in the form and we'll get back to you within 24 hours."
- Form fields (React Hook Form + Zod validation):
  - Full Name (required, min 2 chars)
  - Email Address (required, valid email)
  - Phone Number (optional, Ethiopian format hint)
  - Service Interest (Select dropdown): Web Development, Branding, Custom Software, E-commerce, Not sure yet
  - Budget Range (Select): Under ETB 10,000 | ETB 10,000–30,000 | ETB 30,000–100,000 | ETB 100,000+ | Let's discuss
  - Project Description (Textarea, required, min 20 chars, placeholder: "Tell us about your business and what you're looking to build...")
  - How did you hear about us? (Select): Google, Social Media, Referral, Other
  - Submit button (gold, full width): "Send Message →"
- On submit: show Sonner toast success: "Message sent! We'll get back to you within 24 hours." (form submission is frontend-only for now — `console.log` the data, backend wiring comes later with Node.js)
- Form validation errors shown inline below each field in red

**Right — Contact Info:**
- "Or reach us directly" heading
- 4 contact method cards:
  1. **Email** — `hello@raafat.digital` (placeholder) — envelope icon — "We reply within 24 hours"
  2. **WhatsApp** — `+251 XXX XXX XXX` (placeholder) — WhatsApp icon (use `MessageCircle` lucide) — "Chat with us directly" — button opens `https://wa.me/251XXXXXXXXX`
  3. **Telegram** — `@raafatdigital` (placeholder) — `Send` lucide icon — "Message us on Telegram"
  4. **Book a Call** — "Schedule a free 30-minute discovery call" — `Calendar` lucide icon — button: "Book a Call →" links to `#` (Calendly placeholder)
- Below cards: Location info — "📍 Harar, Ethiopia — serving clients nationwide"
- Office hours: "Mon–Fri, 9:00 AM – 6:00 PM EAT"

**FAQ strip at bottom of contact page:**
- "How quickly do you respond?" — Within 24 hours on business days.
- "Is the initial consultation free?" — Yes, always.
- "Do I need to have everything figured out?" — Absolutely not. We'll help you shape the idea.

---

### 4.10 Privacy Policy (`/privacy`) and Terms (`/terms`)

Simple pages with `PublicLayout`. Just placeholder legal text with proper headings (H1, H2 sections). Use lorem ipsum with realistic section names like "Data We Collect", "How We Use It", "Your Rights", etc. for privacy. Terms: "Scope of Services", "Payment Terms", "Intellectual Property", "Liability", etc.

---

## 5. Design System Rules (DO NOT CHANGE)

These are inherited from the existing template — do not modify `src/styles.css` or the token values:

- **Gold accent:** `var(--gold)` = `#D4A017` — used for: active states, CTA buttons, section labels, icons, headings highlights, borders on hover
- **Dark default background:** `var(--background)` = `#080808`
- **Card background:** `var(--card)` = `#111111`
- **Display font:** `font-display` = Cinzel — ALL H1, H2 section headings, logo, stat numbers
- **Body font:** `font-sans` = DM Sans — everything else
- **Border radius:** Use `rounded-lg` (10px) for cards, `rounded-xl` (14px) for larger containers, `rounded-full` for pills/badges
- **Gold dim background:** `bg-gold-dim` (class already in CSS) — for tinted gold backgrounds
- **Gold border:** `border-gold-soft` (class already in CSS)

Tailwind classes to use consistently:
- Section padding: `py-24 px-4 sm:px-6 lg:px-8`
- Max width wrapper: `max-w-7xl mx-auto`
- Section label (above headings): `text-xs uppercase tracking-[0.2em] text-gold font-semibold`
- Card hover: `hover:-translate-y-0.5 transition-all duration-200`
- Muted text: `text-muted-foreground`

---

## 6. Component File Structure

Create these new files:

```
src/
├── data/
│   ├── services.ts          # Services data array (4 services with all content)
│   ├── portfolio.ts         # Portfolio projects data array (6 projects)
│   └── blog.ts              # Blog posts data array (6 posts)
├── components/
│   ├── portfolio/
│   │   ├── project-card.tsx         # Reusable portfolio card
│   │   └── project-filter.tsx       # Filter tabs component
│   ├── blog/
│   │   ├── post-card.tsx            # Reusable blog post card
│   │   └── featured-post.tsx        # Large featured post card
│   ├── services/
│   │   └── service-card.tsx         # Service card for homepage
│   ├── contact/
│   │   └── contact-form.tsx         # Full contact form with validation
│   └── home/
│       ├── hero.tsx                 # Hero section
│       ├── process-steps.tsx        # How we work section
│       ├── testimonials.tsx         # Testimonials section
│       └── stats-bar.tsx            # Stats section
└── routes/
    ├── index.tsx            # Home (rewrite)
    ├── about.tsx            # About page (new)
    ├── services.tsx         # Services overview (new)
    ├── services.$slug.tsx   # Service detail (new)
    ├── portfolio.tsx        # Portfolio page (new)
    ├── portfolio.$slug.tsx  # Case study (new)
    ├── blog.tsx             # Blog listing (new)
    ├── blog.$slug.tsx       # Blog post (new)
    ├── contact.tsx          # Contact page (new)
    ├── privacy.tsx          # Privacy policy (new)
    └── terms.tsx            # Terms (new)
```

---

## 7. Reusable Patterns

### Section Wrapper Component
Create `src/components/layout/section.tsx`:
```tsx
// Consistent section wrapper used across all pages
// Props: id?, className?, children
// Applies: max-w-7xl, mx-auto, px-4 sm:px-6 lg:px-8, py-24 by default
```

### Section Header Component
Create `src/components/layout/section-header.tsx`:
```tsx
// Props: label (gold uppercase), title (Cinzel H2), subtitle (muted), align ('center' | 'left')
// Used at top of every section
```

### Image Placeholder Component
Create `src/components/ui/image-placeholder.tsx`:
```tsx
// Props: aspectRatio ('16/9' | '1/1' | '4/3'), label?, className?
// Renders a dark gray rounded rectangle with centered muted label text
// Gold border on hover
// Used everywhere images will eventually be uploaded
```

---

## 8. Bilingual Support (English + Amharic)

### Approach
Use a simple React context-based i18n approach — NOT a heavy library like i18next.

Create `src/context/language-context.tsx`:
- Context provides: `lang` ('en' | 'am'), `setLang`, `t(key: string) → string`
- Store preference in `localStorage` key: `raafat-lang`
- Default: `'en'`

Create `src/i18n/en.ts` and `src/i18n/am.ts`:

**en.ts** — English strings object covering:
- nav: home, services, portfolio, blog, about, contact, getQuote
- hero: heading1, heading2, subheading, cta1, cta2
- sections: labels and headings for every section
- contact: form labels, placeholders, submit button, success message
- footer: tagline, copyright

**am.ts** — Amharic translations for the same keys:
- nav: ዋና ገጽ, አገልግሎቶች, ፖርትፎሊዮ, ብሎግ, ስለ እኛ, ያግኙን, ጥቅስ ያግኙ
- hero: "ሁሉንም ነገር ዲጂታላይዝ እናደርጋለን" (We Digitalize Everything)
- Subheading in Amharic
- CTA buttons in Amharic
- Contact form labels in Amharic
- Footer in Amharic

**Language toggle in Navbar:** `EN | አማ` — clicking switches language, all text using `t()` updates instantly without page reload.

**Implementation note:** Only the Navbar, Hero, section labels/headings, CTA buttons, and Contact form need to be translated. Blog post content and case study body text stays in English only. Mark with `// TODO: translate` comments in blog/portfolio body text.

---

## 9. SEO & Meta

Add meta tags to each route using TanStack Router's `head` export:

```tsx
export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — RAAFAT-DIGITAL | Ethiopia\'s Digital Agency' },
      { name: 'description', content: 'Learn about RAAFAT-DIGITAL, Ethiopia\'s digital agency...' },
      { property: 'og:title', content: 'About — RAAFAT-DIGITAL' },
    ],
  }),
  component: About,
})
```

Meta titles per page:
- Home: "RAAFAT-DIGITAL — We Digitalize Everything | Ethiopia's Digital Agency"
- About: "About Us — RAAFAT-DIGITAL | Digital Agency in Harar, Ethiopia"
- Services: "Our Services — Web, Branding, Software & E-commerce | RAAFAT-DIGITAL"
- Portfolio: "Portfolio — Our Work | RAAFAT-DIGITAL"
- Blog: "Blog & Insights | RAAFAT-DIGITAL"
- Contact: "Contact Us — Start Your Project | RAAFAT-DIGITAL"

---

## 10. Animations

Use the existing `tw-animate-css` and Tailwind transition utilities already in the project:

- **Hero heading:** fade-in + slide-up on mount (staggered: badge first, then H1, then subheading, then buttons — each 100ms apart). Use `animate-fade-in` with `animation-delay` inline styles.
- **Section cards:** use `IntersectionObserver` in a custom `useInView` hook → add `animate-fade-in` class when card enters viewport
- **Process steps:** slide-in from left on scroll, staggered
- **Stats numbers:** count-up animation from 0 to final value when stats section enters viewport — use a simple `useCountUp` hook
- **Portfolio cards:** hover lifts + gold border glow
- **Logo marquee:** CSS `@keyframes marquee` scroll for client logos
- **CTA section:** subtle gold border pulse animation

Keep all animations subtle and professional — this is a business site, not a portfolio showcase.

---

## 11. Responsive Behavior Notes

- **Mobile (< 640px):** Single column everything. Service cards stack. Portfolio cards stack. Testimonials scroll horizontally (carousel). Contact form full width, info section below. Navbar hamburger menu.
- **Tablet (640–1024px):** 2-column grids. Sidebar hidden (contact info goes below form). Hero text smaller.
- **Desktop (1024px+):** 3–4 column grids. Full sidebar on contact. All sections side-by-side where specified.
- **Large screens (1536px+):** Content stays max-width constrained, extra whitespace on sides. Font sizes scale up slightly.

---

## 12. What to Leave Untouched

Do NOT modify any of the following:
- `src/routes/login.tsx`
- `src/routes/register.tsx`
- `src/routes/forgot-password.tsx`
- `src/routes/dashboard.tsx` and all `dashboard.*` routes
- `src/routes/settings.tsx`
- `src/routes/maintenance.tsx`
- `src/components/ui/*` (shadcn components)
- `src/styles.css` (design tokens)
- `src/components/theme/` (theme toggle already works)
- `package.json`, `vite.config.ts`, `tsconfig.json`

The dashboard and auth system remain intact for future use as a client portal or admin panel connected to the Node.js backend.

---

## 13. Backend Integration Notes (for future Node.js connection)

The following are frontend-only for now but must be built with future backend wiring in mind:

| Feature | Frontend now | Backend later |
|---------|-------------|---------------|
| Contact form | `console.log` data on submit | `POST /api/contact` → email notification |
| Newsletter signup | Show success toast | `POST /api/newsletter` → mailing list |
| Blog posts | Static data array | `GET /api/blog` → MongoDB |
| Portfolio | Static data array | `GET /api/projects` → MongoDB |
| "Book a Call" | External link `#` | Calendly embed or `GET /api/availability` |

Create `src/lib/api.ts` with a base Axios instance pointing to `import.meta.env.VITE_API_URL` (defaulting to `http://localhost:3001`) — even if no calls are made yet, it's ready to use.

---

## 14. Final Checklist Before Considering Done

- [ ] All 11 public routes created and rendering without errors
- [ ] Navbar updated with new links + language toggle
- [ ] Footer updated with all 4 columns
- [ ] Home page has all 10 sections
- [ ] Dark/light mode works on every new page (test by toggling)
- [ ] All pages fully responsive (test at 375px, 768px, 1280px)
- [ ] Contact form validates correctly and shows toast on submit
- [ ] Language toggle switches EN/Amharic on hero and nav
- [ ] All placeholder images use the `ImagePlaceholder` component
- [ ] No TypeScript errors (`bun run build` passes)
- [ ] No broken links (all internal links use TanStack `<Link>`)
- [ ] Dashboard and auth routes still work at `/dashboard`, `/login`, `/register`
- [ ] SEO meta tags on all routes
- [ ] Animations don't break on mobile (check `prefers-reduced-motion`)

---

*RAAFAT-DIGITAL Portfolio Website — Cursor Prompt v1.0 | May 2026*
*Built on the RAAFAT-DIGITAL React Template | Node.js backend to be connected separately*