# RAAFAT-DIGITAL Backend

Node.js/Express REST API with PostgreSQL (Prisma + Supabase), JWT auth, Cloudinary-backed media (client upload, server delete), and email contact notifications.

## Production deploy (Render + Supabase)

See **[../docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md)** for Supabase setup, Render web service, env vars, and migrations.

Quick reference:

- **Database:** Supabase → `DATABASE_URL` (pooler) + `DIRECT_URL` (direct) in Render env
- **API:** Render web service, root `backend/`, start command runs `prisma migrate deploy` then `npm start`
- **Blueprint:** [`../render.yaml`](../render.yaml) at repo root

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   For local Postgres, set `DATABASE_URL` and `DIRECT_URL` to the same connection string.

3. Start PostgreSQL (Docker example):

   ```bash
   docker run --name raafat-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=raafat_digital -p 5432:5432 -d postgres
   ```

4. Run migrations:

   ```bash
   npm run db:migrate:dev
   ```

5. Seed the database:

   ```bash
   npm run db:seed
   ```

6. Start dev server:

   ```bash
   npm run dev
   ```

API runs at: http://localhost:3001  
Health check: http://localhost:3001/health  
Prisma Studio: `npm run db:studio` → http://localhost:5555

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm run db:migrate` | Apply migrations (production / Supabase) |
| `npm run db:migrate:dev` | Create/apply migrations (dev) |
| `npm run db:seed` | Seed admin + content |
