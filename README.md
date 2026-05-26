# RAAFAT-DIGITAL Portfolio

Public marketing website for **RAAFAT-DIGITAL** — Ethiopia's digital agency. Tagline: *We Digitalize Everything*.

## Stack

- **Frontend:** React 19, TanStack Router, Tailwind CSS v4, shadcn/ui
- **Backend:** Node.js, Express, PostgreSQL (Prisma) — see `backend/README.md`

## Getting started

```bash
# Frontend
cd frontend
bun install
bun run dev

# Backend (separate terminal)
cd backend
npm install
cp .env.example .env
npm run db:migrate:dev
npm run db:seed
npm run dev
```

Build for production:

```bash
cd frontend
bun run build
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home (portfolio landing) |
| `/about` | About |
| `/services` | Services overview |
| `/portfolio` | Case studies |
| `/blog` | Articles |
| `/contact` | Contact form |

Dashboard and auth routes (`/dashboard`, `/login`, etc.) are included for future client portal use.

## License

Proprietary — RAAFAT-DIGITAL © 2025
