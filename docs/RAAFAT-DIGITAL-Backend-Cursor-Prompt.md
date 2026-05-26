# Cursor Prompt — RAAFAT-DIGITAL Node.js Backend

> Paste this entire document into Cursor as your instruction. It covers every API endpoint, database schema, authentication system, file upload, email notification, and deployment configuration needed for the RAAFAT-DIGITAL backend.

---

## 0. Context & Goal

We have a working React frontend (in `frontend/`) for the RAAFAT-DIGITAL company portfolio website. The frontend currently uses static data arrays in `src/data/`. 

**Goal:** Build a production-ready Node.js/Express REST API backend that:
1. Serves all content (projects, blog posts, services, testimonials) from a PostgreSQL database
2. Handles contact form submissions + sends email notifications via Nodemailer (Gmail/SMTP)
3. Authenticates the admin user via JWT so the dashboard can manage all content
4. Stores uploaded images (project screenshots, blog covers, avatars)
5. Deploys to Railway with zero friction

The backend lives in a new `backend/` folder alongside the existing `frontend/` folder.

---

## 1. Tech Stack

| Layer | Choice |
|-------|--------|
| Runtime | Node.js 20+ |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL (via **Prisma ORM**) |
| Authentication | JWT (jsonwebtoken) + bcrypt |
| File uploads | Multer + local storage (Railway volume) |
| Email | Nodemailer (Gmail SMTP) |
| Validation | Zod |
| Environment | dotenv |
| Dev tooling | tsx (for dev), tsc (for build) |
| CORS | cors package |
| Security | helmet, express-rate-limit |
| Logging | morgan |

---

## 2. Project Structure

Create this exact folder structure inside `backend/`:

```
backend/
├── prisma/
│   ├── schema.prisma          # Full database schema
│   └── seed.ts                # Seed script with initial admin + placeholder data
├── src/
│   ├── index.ts               # Entry point — Express app setup
│   ├── config/
│   │   ├── env.ts             # Validated env variables (Zod)
│   │   └── prisma.ts          # Prisma client singleton
│   ├── middleware/
│   │   ├── auth.ts            # JWT verification middleware
│   │   ├── error.ts           # Global error handler
│   │   ├── validate.ts        # Zod request validation middleware
│   │   └── upload.ts          # Multer config for image uploads
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.router.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.schema.ts
│   │   ├── contact/
│   │   │   ├── contact.router.ts
│   │   │   ├── contact.controller.ts
│   │   │   ├── contact.service.ts     # Nodemailer email logic
│   │   │   └── contact.schema.ts
│   │   ├── projects/
│   │   │   ├── projects.router.ts
│   │   │   ├── projects.controller.ts
│   │   │   └── projects.schema.ts
│   │   ├── blog/
│   │   │   ├── blog.router.ts
│   │   │   ├── blog.controller.ts
│   │   │   └── blog.schema.ts
│   │   ├── services/
│   │   │   ├── services.router.ts
│   │   │   ├── services.controller.ts
│   │   │   └── services.schema.ts
│   │   ├── testimonials/
│   │   │   ├── testimonials.router.ts
│   │   │   ├── testimonials.controller.ts
│   │   │   └── testimonials.schema.ts
│   │   └── upload/
│   │       ├── upload.router.ts
│   │       └── upload.controller.ts
│   └── utils/
│       ├── jwt.ts             # Sign and verify JWT helpers
│       ├── slug.ts            # Auto-generate slugs from titles
│       └── response.ts        # Standardised API response helpers
├── uploads/                   # Local image storage (gitignored)
├── .env                       # Local env (gitignored)
├── .env.example               # Committed env template
├── .gitignore
├── package.json
├── tsconfig.json
└── railway.toml               # Railway deployment config
```

---

## 3. Environment Variables

### `.env.example` (commit this)
```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/raafat_digital

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Admin (initial seed)
ADMIN_EMAIL=admin@raafat.digital
ADMIN_PASSWORD=change-me-on-first-login

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM="RAAFAT-DIGITAL <your-gmail@gmail.com>"
NOTIFICATION_EMAIL=hello@raafat.digital

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# File uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=5
```

### `src/config/env.ts`
Parse and validate all env vars with Zod at startup. If any required variable is missing, throw a descriptive error and exit. Export a typed `env` object used everywhere — never use `process.env` directly outside this file.

---

## 4. Database Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String   @default("Raafat")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model ContactMessage {
  id              String    @id @default(cuid())
  name            String
  email           String
  phone           String?
  serviceInterest String?
  budgetRange     String?
  description     String
  hearAboutUs     String?
  status          MessageStatus @default(UNREAD)
  notes           String?       // Admin internal notes
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum MessageStatus {
  UNREAD
  READ
  REPLIED
  ARCHIVED
}

model Project {
  id           String        @id @default(cuid())
  slug         String        @unique
  title        String
  client       String
  clientType   String        // e.g. "E-commerce · Ethiopia"
  category     ProjectCategory
  description  String        // Short description (1-2 sentences)
  challenge    String        // Case study: the problem
  solution     String        // Case study: what we built
  result       String        // Case study: the outcome
  technologies String[]      // Array of tech names
  timeline     String        // e.g. "3 weeks"
  coverImage   String?       // Image path/URL
  images       String[]      // Gallery image paths
  metrics      Json?         // { traffic: "+40%", delivery: "3 weeks", satisfaction: "100%" }
  featured     Boolean       @default(false)
  published    Boolean       @default(true)
  order        Int           @default(0)  // For manual ordering
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

enum ProjectCategory {
  WEB_DEVELOPMENT
  BRANDING
  CUSTOM_SOFTWARE
  ECOMMERCE
}

model BlogPost {
  id          String      @id @default(cuid())
  slug        String      @unique
  title       String
  excerpt     String
  content     String      // Full article body (Markdown or HTML)
  category    BlogCategory
  coverImage  String?
  readTime    Int         // Minutes
  published   Boolean     @default(false)
  featured    Boolean     @default(false)
  tags        String[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  publishedAt DateTime?
}

enum BlogCategory {
  WEB_DEVELOPMENT
  BRANDING
  ECOMMERCE
  BUSINESS
  DESIGN
}

model Service {
  id           String   @id @default(cuid())
  slug         String   @unique
  title        String
  subtitle     String
  description  String
  icon         String   // Lucide icon name
  startingPrice String  // e.g. "ETB 15,000"
  includes     String[] // Bullet list of what's included
  processSteps Json[]   // [{ step: 1, title: "", description: "" }]
  faqs         Json[]   // [{ question: "", answer: "" }]
  order        Int      @default(0)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Testimonial {
  id        String   @id @default(cuid())
  name      String
  role      String
  company   String?
  quote     String
  avatar    String?  // Image path or initials fallback
  rating    Int      @default(5)
  featured  Boolean  @default(true)
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model SiteSetting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     String
  updatedAt DateTime @updatedAt
}
```

---

## 5. API Endpoints

### Base URL: `/api/v1`

All responses follow this shape:
```json
// Success
{ "success": true, "data": { ... } }
{ "success": true, "data": [...], "meta": { "total": 0, "page": 1, "limit": 10 } }

// Error
{ "success": false, "error": "Human-readable message", "code": "ERROR_CODE" }
```

---

### 5.1 Auth Routes — `/api/v1/auth`

#### `POST /api/v1/auth/login`
**Public.** Admin login.
- Body: `{ email: string, password: string }`
- Validates with Zod
- Checks admin exists, compares bcrypt hash
- Returns: `{ token: string, admin: { id, email, name } }`
- Token expires in `JWT_EXPIRES_IN`

#### `GET /api/v1/auth/me`
**Protected.** Returns current admin info from JWT.
- Header: `Authorization: Bearer <token>`
- Returns: `{ id, email, name, createdAt }`

#### `PUT /api/v1/auth/password`
**Protected.** Change admin password.
- Body: `{ currentPassword: string, newPassword: string }`
- Min 8 chars, bcrypt hash, save

#### `PUT /api/v1/auth/profile`
**Protected.** Update admin name/email.
- Body: `{ name?: string, email?: string }`

---

### 5.2 Contact Routes — `/api/v1/contact`

#### `POST /api/v1/contact`
**Public.** Submit contact form.
- Body: `{ name, email, phone?, serviceInterest?, budgetRange?, description, hearAboutUs? }`
- Validate with Zod (same rules as frontend)
- Save to `ContactMessage` table
- Send two emails via Nodemailer:
  1. **Notification to admin** (`NOTIFICATION_EMAIL`): formatted HTML email with all form data, subject: "New project enquiry from {name} — RAAFAT-DIGITAL"
  2. **Confirmation to client** (`email`): warm, branded HTML email thanking them, signed "Raafat — RAAFAT-DIGITAL", subject: "We received your message — RAAFAT-DIGITAL"
- Returns: `{ success: true, data: { message: "Message sent successfully" } }`
- Rate limit: 5 requests per IP per hour

#### `GET /api/v1/contact`
**Protected.** Get all messages with pagination.
- Query params: `page`, `limit`, `status` (UNREAD/READ/REPLIED/ARCHIVED)
- Default: page 1, limit 20, newest first
- Returns list + meta (total, unread count)

#### `GET /api/v1/contact/:id`
**Protected.** Get single message. Also marks it as READ automatically.

#### `PUT /api/v1/contact/:id`
**Protected.** Update message status or add admin notes.
- Body: `{ status?: MessageStatus, notes?: string }`

#### `DELETE /api/v1/contact/:id`
**Protected.** Delete message.

---

### 5.3 Projects Routes — `/api/v1/projects`

#### `GET /api/v1/projects`
**Public.** Get all published projects.
- Query params: `category` (WEB_DEVELOPMENT | BRANDING | CUSTOM_SOFTWARE | ECOMMERCE), `featured` (boolean), `limit`
- Returns only `published: true` projects, ordered by `order` ASC then `createdAt` DESC

#### `GET /api/v1/projects/:slug`
**Public.** Get single project by slug.
- Returns 404 if not found or not published

#### `GET /api/v1/admin/projects`
**Protected.** Get ALL projects including unpublished, with full data.
- Query: `page`, `limit`, `published`

#### `POST /api/v1/admin/projects`
**Protected.** Create project.
- Body: all Project fields except `id`, `slug` (auto-generated from title), `createdAt`, `updatedAt`
- Auto-generate slug from title using `src/utils/slug.ts`
- If slug exists, append `-2`, `-3`, etc.

#### `PUT /api/v1/admin/projects/:id`
**Protected.** Update project. All fields optional.
- If `title` changes and no manual slug provided, regenerate slug.

#### `DELETE /api/v1/admin/projects/:id`
**Protected.** Delete project and its associated images from disk.

#### `PUT /api/v1/admin/projects/reorder`
**Protected.** Bulk update `order` field.
- Body: `{ items: [{ id: string, order: number }] }`

---

### 5.4 Blog Routes — `/api/v1/blog`

#### `GET /api/v1/blog`
**Public.** Get published posts.
- Query: `category`, `featured`, `page`, `limit`, `tag`
- Returns only `published: true`, ordered by `publishedAt` DESC

#### `GET /api/v1/blog/:slug`
**Public.** Get single published post.

#### `GET /api/v1/admin/blog`
**Protected.** Get ALL posts including drafts.
- Query: `page`, `limit`, `published`

#### `POST /api/v1/admin/blog`
**Protected.** Create blog post.
- Auto-generate slug from title
- If `published: true` and no `publishedAt`, set `publishedAt` to now

#### `PUT /api/v1/admin/blog/:id`
**Protected.** Update post.
- If publishing for first time (published changes false→true), set `publishedAt`

#### `DELETE /api/v1/admin/blog/:id`
**Protected.** Delete post.

---

### 5.5 Services Routes — `/api/v1/services`

#### `GET /api/v1/services`
**Public.** Get all active services, ordered by `order`.

#### `GET /api/v1/services/:slug`
**Public.** Get single service by slug.

#### `GET /api/v1/admin/services`
**Protected.** Get all services including inactive.

#### `POST /api/v1/admin/services`
**Protected.** Create service.

#### `PUT /api/v1/admin/services/:id`
**Protected.** Update service.

#### `DELETE /api/v1/admin/services/:id`
**Protected.** Delete service.

#### `PUT /api/v1/admin/services/reorder`
**Protected.** Bulk reorder.

---

### 5.6 Testimonials Routes — `/api/v1/testimonials`

#### `GET /api/v1/testimonials`
**Public.** Get featured testimonials, ordered by `order`.
- Query: `featured` (default true for public)

#### `GET /api/v1/admin/testimonials`
**Protected.** Get all testimonials.

#### `POST /api/v1/admin/testimonials`
**Protected.** Create testimonial.

#### `PUT /api/v1/admin/testimonials/:id`
**Protected.** Update testimonial.

#### `DELETE /api/v1/admin/testimonials/:id`
**Protected.** Delete testimonial.

---

### 5.7 Upload Routes — `/api/v1/admin/upload`

#### `POST /api/v1/admin/upload`
**Protected.** Upload one or more images.
- Multer: `multipart/form-data`, field name `images`, max 5 files
- Max file size: `MAX_FILE_SIZE_MB` from env
- Allowed types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- Save to `uploads/{year}/{month}/{uuid}.{ext}`
- Returns: `{ files: [{ url: string, filename: string, size: number }] }`

#### `DELETE /api/v1/admin/upload`
**Protected.** Delete an uploaded file.
- Body: `{ url: string }`
- Deletes file from disk

Serve uploaded files statically at `/uploads/*`.

---

### 5.8 Dashboard Stats — `/api/v1/admin/stats`

#### `GET /api/v1/admin/stats`
**Protected.** Returns dashboard overview numbers.
```json
{
  "success": true,
  "data": {
    "messages": { "total": 0, "unread": 0 },
    "projects": { "total": 0, "published": 0 },
    "blog": { "total": 0, "published": 0, "drafts": 0 },
    "testimonials": { "total": 0 }
  }
}
```

---

### 5.9 Site Settings — `/api/v1/admin/settings`

#### `GET /api/v1/admin/settings`
**Protected.** Get all site settings as key-value pairs.

#### `PUT /api/v1/admin/settings`
**Protected.** Upsert settings.
- Body: `{ settings: [{ key: string, value: string }] }`

Default settings to seed:
- `site_name`: "RAAFAT-DIGITAL"
- `tagline`: "We Digitalize Everything"
- `contact_email`: "hello@raafat.digital"
- `whatsapp_number`: "+251000000000"
- `telegram_handle`: "@raafatdigital"
- `instagram_url`: ""
- `linkedin_url`: ""
- `address`: "Harar, Ethiopia"
- `office_hours`: "Mon–Fri, 9:00 AM – 6:00 PM EAT"

---

## 6. Middleware Details

### `src/middleware/auth.ts`
```typescript
// Extracts Bearer token from Authorization header
// Verifies with JWT_SECRET
// Attaches decoded payload to req.admin
// Returns 401 if missing, 403 if invalid/expired
```

### `src/middleware/validate.ts`
```typescript
// Factory: validate(schema: ZodSchema, target: 'body' | 'query' | 'params')
// Returns 400 with Zod error details if validation fails
// Usage: router.post('/', validate(schema), controller)
```

### `src/middleware/error.ts`
```typescript
// Global Express error handler (4 args)
// Catches Prisma errors (P2002 unique → 409, P2025 not found → 404)
// Catches Zod errors → 400
// Catches JWT errors → 401
// All others → 500
// Always returns { success: false, error: string, code: string }
// Never expose stack traces in production
```

### `src/middleware/upload.ts`
```typescript
// Multer diskStorage config
// Destination: uploads/{year}/{month}/
// Filename: {uuid}.{ext}
// fileFilter: only allow image MIME types
// limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024, files: 5 }
```

---

## 7. Email Templates

### Admin notification email (HTML)
Subject: `🔔 New enquiry from {name} — RAAFAT-DIGITAL`

```html
<!-- Dark branded HTML email -->
<!-- Header: RAAFAT-DIGITAL logo text in gold on dark bg -->
<!-- Body: clean table with all form fields -->
<!-- Fields: Name, Email, Phone, Service Interest, Budget, Message, Source -->
<!-- Submitted: {date and time} -->
<!-- Footer: "Reply directly to {email}" -->
```

### Client confirmation email (HTML)
Subject: `We got your message — RAAFAT-DIGITAL 🙌`

```html
<!-- Warm, human tone matching brand voice -->
<!-- Opening: "Hi {name}, thank you for reaching out!" -->
<!-- Body: "We've received your message and will get back to you within 24 hours on business days." -->
<!-- What's next section: 3 bullet points -->
<!--   • We review your project details -->
<!--   • We'll reach out to schedule a free discovery call -->
<!--   • We share a clear proposal with no surprises -->
<!-- Signed: Raafat, Founder — RAAFAT-DIGITAL -->
<!-- Footer: Location, email, WhatsApp -->
```

Both emails must be valid, well-structured HTML with inline CSS (email clients strip `<style>` tags). Use the brand gold `#D4A017` as the accent color.

---

## 8. Seed Script (`prisma/seed.ts`)

The seed script must create:

**1. Admin user:**
- Email: from `ADMIN_EMAIL` env
- Password: bcrypt hash of `ADMIN_PASSWORD` env (rounds: 12)
- Name: "Raafat"

**2. All 4 Services** (matching the frontend data in `frontend/src/data/services.ts`):
- Web Design & Development (slug: `web-development`)
- Branding & Identity (slug: `branding`)
- Custom Software & SaaS (slug: `custom-software`)
- E-commerce Solutions (slug: `ecommerce`)
- Populate all fields: description, includes array, processSteps JSON, faqs JSON, startingPrice

**3. All 6 Portfolio Projects** (matching `frontend/src/data/portfolio.ts`):
- Addis Marketplace (slug: `addis-marketplace`, category: ECOMMERCE)
- Harar Coffee Brand (slug: `harar-coffee-brand`, category: BRANDING)
- NGO Management System (slug: `ngo-management-system`, category: CUSTOM_SOFTWARE)
- Dire Dawa Restaurant (slug: `dire-dawa-restaurant`, category: WEB_DEVELOPMENT)
- Mekelle Fashion Store (slug: `mekelle-fashion-store`, category: ECOMMERCE)
- Startup Pitch Deck Brand (slug: `startup-pitch-deck`, category: BRANDING)

**4. All 3 Testimonials** (matching `frontend/src/data/` testimonials):
- Fatima Hassan, Harar Spice Market
- Solomon Tesfaye, Addis Youth Foundation
- Meron Alemu, Meron Consulting

**5. All 6 Blog Posts** (matching `frontend/src/data/blog.ts`):
- All published, with full placeholder content (minimum 400 word body per post)

**6. Default Site Settings:**
- All keys from Section 5.9

Run seed with: `npx prisma db seed`
Add to `package.json`: `"prisma": { "seed": "tsx prisma/seed.ts" }`

---

## 9. Express App Setup (`src/index.ts`)

```typescript
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { env } from './config/env'
import { errorHandler } from './middleware/error'

const app = express()

// Security
app.use(helmet())
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}))

// Rate limiting (global)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
}))

// Logging
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Static file serving (uploads)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contact', contactRouter)
app.use('/api/v1/projects', projectsRouter)
app.use('/api/v1/blog', blogRouter)
app.use('/api/v1/services', servicesRouter)
app.use('/api/v1/testimonials', testimonialsRouter)
app.use('/api/v1/admin', requireAuth, adminRouter) // groups all admin/* routes

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found', code: 'NOT_FOUND' })
})

// Global error handler (must be last)
app.use(errorHandler)

app.listen(env.PORT, () => {
  console.log(`🚀 RAAFAT-DIGITAL API running on port ${env.PORT}`)
  console.log(`📦 Environment: ${env.NODE_ENV}`)
})
```

---

## 10. `package.json`

```json
{
  "name": "raafat-digital-backend",
  "version": "1.0.0",
  "description": "RAAFAT-DIGITAL REST API",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate deploy",
    "db:migrate:dev": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "express-rate-limit": "^7.0.0",
    "helmet": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.0",
    "uuid": "^9.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.0",
    "@types/express": "^4.17.0",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/morgan": "^1.9.0",
    "@types/multer": "^1.4.0",
    "@types/nodemailer": "^6.4.0",
    "@types/node": "^20.0.0",
    "@types/uuid": "^9.0.0",
    "prisma": "^5.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

---

## 11. TypeScript Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "prisma"]
}
```

---

## 12. Railway Deployment Config

### `railway.toml`
```toml
[build]
builder = "nixpacks"
buildCommand = "npm install && npx prisma generate && npm run build"

[deploy]
startCommand = "npx prisma migrate deploy && npm run start"
restartPolicyType = "on-failure"
restartPolicyMaxRetries = 3

[environments.production.variables]
NODE_ENV = "production"
PORT = "3001"
```

### Railway setup steps (include as comments at top of `railway.toml`):
```
# RAILWAY SETUP STEPS:
# 1. Push backend/ to GitHub
# 2. Create new Railway project → Deploy from GitHub repo
# 3. Add PostgreSQL plugin to the project (Railway provides DATABASE_URL automatically)
# 4. Add all env variables from .env.example in Railway dashboard
# 5. Railway builds and deploys automatically on every push to main
# 6. After first deploy, run seed: railway run npm run db:seed
# 7. Add a Railway volume mounted at /app/uploads for persistent image storage
```

---

## 13. Frontend Wiring (update `frontend/src/lib/api.ts`)

After backend is built, update the frontend API client. Replace the current placeholder with:

```typescript
// frontend/src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('raafat-admin-token')
  
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()
  if (!data.success) throw new Error(data.error || 'API error')
  return data.data
}

export const api = {
  // Auth
  login: (body: { email: string; password: string }) =>
    request<{ token: string; admin: object }>('/auth/login', {
      method: 'POST', body: JSON.stringify(body)
    }),
  me: () => request('/auth/me'),

  // Public
  getProjects: (params?: Record<string, string>) =>
    request(`/projects?${new URLSearchParams(params)}`),
  getProject: (slug: string) => request(`/projects/${slug}`),
  getBlogPosts: (params?: Record<string, string>) =>
    request(`/blog?${new URLSearchParams(params)}`),
  getBlogPost: (slug: string) => request(`/blog/${slug}`),
  getServices: () => request('/services'),
  getService: (slug: string) => request(`/services/${slug}`),
  getTestimonials: () => request('/testimonials'),
  submitContact: (body: object) =>
    request('/contact', { method: 'POST', body: JSON.stringify(body) }),

  // Admin
  admin: {
    getMessages: (params?: Record<string, string>) =>
      request(`/admin/contact?${new URLSearchParams(params)}`),
    updateMessage: (id: string, body: object) =>
      request(`/admin/contact/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    deleteMessage: (id: string) =>
      request(`/admin/contact/${id}`, { method: 'DELETE' }),
    getStats: () => request('/admin/stats'),
    createProject: (body: object) =>
      request('/admin/projects', { method: 'POST', body: JSON.stringify(body) }),
    updateProject: (id: string, body: object) =>
      request(`/admin/projects/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    deleteProject: (id: string) =>
      request(`/admin/projects/${id}`, { method: 'DELETE' }),
    createPost: (body: object) =>
      request('/admin/blog', { method: 'POST', body: JSON.stringify(body) }),
    updatePost: (id: string, body: object) =>
      request(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    deletePost: (id: string) =>
      request(`/admin/blog/${id}`, { method: 'DELETE' }),
    uploadImage: (formData: FormData) =>
      request('/admin/upload', { method: 'POST', body: formData,
        headers: {} }), // Let browser set multipart boundary
    getSettings: () => request('/admin/settings'),
    updateSettings: (settings: { key: string; value: string }[]) =>
      request('/admin/settings', { method: 'PUT', body: JSON.stringify({ settings }) }),
  }
}
```

Also add `VITE_API_URL=http://localhost:3001/api/v1` to `frontend/.env.local`.

---

## 14. Dashboard Pages to Update (Frontend)

After backend is wired, update these existing dashboard pages to use real API data instead of static mock data:

### `/dashboard` (Overview)
- Replace hardcoded KPI values with `api.admin.getStats()` via TanStack Query
- `useQuery({ queryKey: ['stats'], queryFn: api.admin.getStats })`
- Show real counts: messages, projects, blog posts
- Recent messages table: fetch from `api.admin.getMessages({ limit: '5' })`

### New Dashboard Pages to CREATE:

#### `/dashboard/messages`
- Table of all contact messages
- Columns: Name, Email, Service, Budget, Status pill, Date, Actions
- Click row → expand to show full message + admin notes field
- Status dropdown to mark as Read/Replied/Archived
- Unread count badge in sidebar

#### `/dashboard/portfolio`
- Table of all projects (published + drafts)
- Columns: Title, Category, Client, Published toggle, Order, Actions (Edit, Delete)
- "New Project" button → modal or page with full project form
- Drag-to-reorder rows (update `order` field)
- Image upload for cover image + gallery

#### `/dashboard/blog`
- Table of all posts with Published toggle
- "New Post" button → rich text editor page (use a simple `<textarea>` for Markdown for now)
- Columns: Title, Category, Status (Draft/Published), PublishedAt, Actions

#### `/dashboard/testimonials`
- Simple list of testimonials
- Add/Edit/Delete with a small form modal

#### `/dashboard/settings`
- Form with all `SiteSetting` key-value pairs
- WhatsApp number, email, social links, address, office hours
- Save button → `api.admin.updateSettings()`

---

## 15. Security Checklist

Implement all of the following:

- [ ] All admin routes protected by `requireAuth` middleware
- [ ] Passwords hashed with bcrypt (rounds: 12)
- [ ] JWT secret minimum 32 chars — validate at startup
- [ ] Rate limiting on `POST /contact`: 5 per IP per hour (stricter than global)
- [ ] Rate limiting on `POST /auth/login`: 10 per IP per 15 minutes
- [ ] Helmet sets security headers (CSP, HSTS, etc.)
- [ ] File upload: validate MIME type AND file extension (both must be image)
- [ ] File upload: reject files over size limit
- [ ] No stack traces in production error responses
- [ ] CORS restricted to `FRONTEND_URL` only
- [ ] SQL injection impossible via Prisma (parameterized queries)
- [ ] `.env` in `.gitignore`
- [ ] `uploads/` in `.gitignore` (Railway volume handles persistence)

---

## 16. `.gitignore`

```
node_modules/
dist/
.env
uploads/
*.log
.DS_Store
```

---

## 17. Local Development Setup (README section)

Add a `backend/README.md` with these exact steps:

```markdown
## Local Setup

1. Install dependencies:
   npm install

2. Copy env file and fill in your values:
   cp .env.example .env

3. Start a local PostgreSQL database (or use Railway's CLI to connect to remote):
   # Using Docker:
   docker run --name raafat-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=raafat_digital -p 5432:5432 -d postgres

4. Run migrations:
   npm run db:migrate:dev

5. Seed the database:
   npm run db:seed

6. Start dev server:
   npm run dev

API runs at: http://localhost:3001
Health check: http://localhost:3001/health
Prisma Studio: npm run db:studio → http://localhost:5555
```

---

## 18. Final Checklist Before Considering Done

- [ ] `backend/` folder created at root level alongside `frontend/`
- [ ] All dependencies installed, `npm run dev` starts without errors
- [ ] Prisma schema created, `npx prisma generate` succeeds
- [ ] Migrations run, `npx prisma migrate dev` creates all tables
- [ ] Seed runs successfully, creates admin + all content
- [ ] `GET /health` returns 200
- [ ] `POST /api/v1/auth/login` returns JWT with correct credentials
- [ ] `GET /api/v1/auth/me` returns admin info with valid token, 401 without
- [ ] `POST /api/v1/contact` saves to DB and sends both emails
- [ ] All public GET endpoints return seeded data
- [ ] All admin CRUD endpoints work (test with Postman or curl)
- [ ] Image upload saves file to `uploads/` and returns URL
- [ ] `npm run build` compiles TypeScript without errors
- [ ] `railway.toml` created and correct
- [ ] `frontend/src/lib/api.ts` updated with full API client
- [ ] `.env.example` committed, `.env` gitignored
- [ ] No TypeScript errors (`tsc --noEmit` passes)

---

*RAAFAT-DIGITAL Backend — Cursor Prompt v1.0 | May 2026*
*Stack: Node.js + Express + TypeScript + PostgreSQL (Prisma) + JWT + Nodemailer*
*Deploy target: Railway*
