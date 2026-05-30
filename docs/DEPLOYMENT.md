# Deploy: Vercel (frontend) + Render (backend) + Supabase (DB) + Cloudinary

| Layer | Provider |
|-------|----------|
| Frontend | [Vercel](https://vercel.com) |
| API | [Render](https://render.com) |
| PostgreSQL | [Supabase](https://supabase.com) |
| Images | [Cloudinary](https://cloudinary.com) |

This splits **manual one-time setup** (accounts, secrets, database) from **repeatable deploys** (Git push or CLI).

---

## Part A — Manual setup (you do this once)

### A1. Cloudinary (photos)

1. [Cloudinary Console](https://console.cloudinary.com/) → **Upload** → **Upload presets** → **Add upload preset**:
   - **Signing mode**: Unsigned
   - **Folder**: `raafat-digital/uploads`
   - **Formats**: jpg, png, gif, webp
   - **Max file size**: ~5 MB
2. Save: **cloud name**, **preset name**, **API key**, **API secret**.

### A2. GitHub

Push this monorepo to GitHub. Same repo for:
- **Vercel** → root directory `frontend/`
- **Render** → root directory `backend/` (or use [`render.yaml`](../render.yaml) at repo root)

### A3. Supabase — PostgreSQL

You already ran `supabase init` and `supabase login` at the repo root — that created [`supabase/config.toml`](../supabase/config.toml) and authenticated the CLI. **Schema changes still use Prisma** (`backend/prisma/`); the Supabase CLI is for linking the project and optional local Postgres (`supabase start`).

1. [Supabase](https://supabase.com) → **New project** for RAAFAT-DIGITAL (or pick an existing empty project).
2. **Link** the repo to that project (from repo root):

   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```

   Find `YOUR_PROJECT_REF` in the dashboard URL (`https://supabase.com/dashboard/project/<ref>`) or from `npx supabase projects list`.

3. **Connection strings** — dashboard **Project Settings** → **Database**, or after linking:

   ```bash
   npx supabase db show --linked
   ```

   Copy into `backend/.env`:
   - **URI** (direct, port **5432**) → use as `DIRECT_URL` (migrations / Prisma `migrate deploy`)
   - **URI** with **Transaction pooler** (port **6543**, `?pgbouncer=true`) → use as `DATABASE_URL` (app runtime on Render)

   Example shape (replace with your values):

   ```env
   DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   DIRECT_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
   ```

4. From your machine, with those URLs in `backend/.env`, run migrations and seed **once** against Supabase:

   ```bash
   cd backend
   cp .env.example .env   # fill DATABASE_URL + DIRECT_URL + JWT_SECRET, etc.
   npm install
   npm run db:migrate
   npm run db:seed
   ```

   Or run the same after Render is up (see A4 step 6).

### A4. Render — backend API

**Option 1 — Dashboard (recommended first time)**

1. [Render Dashboard](https://dashboard.render.com) → **New** → **Web Service**.
2. Connect your **GitHub** repo.
3. Settings:

   | Setting | Value |
   |---------|--------|
   | **Root Directory** | `backend` |
   | **Runtime** | Node |
   | **Build Command** | `npm ci && npx prisma generate && npm run build` |
   | **Start Command** | `npx prisma migrate deploy && npm run start` |
   | **Health Check Path** | `/health` |

4. **Environment** — add variables from [`backend/.env.example`](../backend/.env.example):

   | Variable | Source |
   |----------|--------|
   | `DATABASE_URL` | Supabase **Transaction pooler** (6543) |
   | `DIRECT_URL` | Supabase **direct** (5432) — required for Prisma migrations |
   | `JWT_SECRET` | ≥32 random characters |
   | `NODE_ENV` | `production` |
   | `FRONTEND_URL` | Your Vercel URL, e.g. `https://your-app.vercel.app` |
   | `CLOUDINARY_*` | From Cloudinary |
   | Email | `RESEND_API_KEY`, etc. |

   Render sets `PORT` automatically; the app reads it via [`backend/src/config/env.ts`](../backend/src/config/env.ts).

5. **Create Web Service** → wait for first deploy.
6. If you did **not** migrate/seed locally, run once from your machine:

   ```bash
   cd backend
   # Temporarily point .env at Supabase, or use Render Shell:
   npm run db:migrate
   npm run db:seed
   ```

   Or open **Render Shell** on the service and run the same commands there.

7. Copy the service URL (e.g. `https://raafat-digital-api.onrender.com`). API base for the frontend:

   `https://YOUR-SERVICE.onrender.com/api/v1`

**Option 2 — Blueprint**

1. **New** → **Blueprint** → select repo.
2. Render reads [`render.yaml`](../render.yaml); enter secret env values when prompted.
3. Complete deploy, then migrate/seed as in step 6 above.

### A5. Vercel — frontend

In the Vercel project (`frontend/` root):

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://YOUR-SERVICE.onrender.com/api/v1` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Your cloud name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Unsigned preset name |

No Cloudinary **secret** on Vercel.

---

## Part B — CLI deploy (optional)

### Frontend → Vercel

```bash
cd frontend
npx vercel@latest login    # first time
npx vercel@latest link     # first time
npm run deploy:vercel
```

### Backend → Render

Render is usually **Git-connected** (auto-deploy on push). For manual deploys, install the [Render CLI](https://render.com/docs/cli):

```bash
render login
cd backend
render deploy   # if linked to a service
```

Most teams only push to `main` and let Render rebuild.

---

## Part C — Git auto-deploy

| Service | Root | Trigger |
|---------|------|---------|
| Vercel | `frontend/` | Push to `main` |
| Render | `backend/` | Push to `main` |
| Supabase | — | Schema via `prisma migrate` from CI or your machine |

---

## Quick verification

1. `GET https://YOUR-RENDER-URL/health` → `{ "status": "ok", ... }`
2. Vercel site loads.
3. Admin → upload image → URL is `https://res.cloudinary.com/...`

---

## Common issues

| Issue | Fix |
|-------|-----|
| CORS errors | `FRONTEND_URL` on Render must match the browser origin exactly. |
| Prisma migrate fails on Render | Set `DIRECT_URL` (5432 direct), not only the pooler URL. |
| `Can't reach database` / P1001 | Use **pooler** URLs (`aws-0-<region>.pooler.supabase.com`), not `db.<ref>.supabase.co` (often IPv6-only). Confirm project is not paused. URL-encode special characters in the password. |
| Seed uses `localhost:5433` | `DATABASE_URL` still points at local `supabase start`; point both URLs at remote Supabase. |
| Render cold start | Free tier sleeps; first request may be slow (~30s). |
| Preview Vercel URLs | Use a staging Render service or temporarily set `FRONTEND_URL` to the preview URL. |

---

## Local development

- **DB:** local Postgres (Docker) or Supabase URLs in `backend/.env`.
- **Frontend:** `frontend/.env` with `VITE_API_URL=http://localhost:3001/api/v1`.

Never commit `.env` files with real secrets.
