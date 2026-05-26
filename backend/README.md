# RAAFAT-DIGITAL Backend

Node.js/Express REST API with PostgreSQL (Prisma), JWT auth, file uploads, and Nodemailer contact notifications.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env file and fill in your values:

   ```bash
   cp .env.example .env
   ```

3. Start a local PostgreSQL database (or use Railway's CLI to connect to remote):

   ```bash
   # Using Docker:
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
| `npm run db:migrate:dev` | Create/apply migrations (dev) |
| `npm run db:seed` | Seed admin + content |
