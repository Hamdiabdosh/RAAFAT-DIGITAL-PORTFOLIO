import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  /** Supabase direct connection (port 5432) — used by Prisma migrate; pooler URL goes in DATABASE_URL */
  DIRECT_URL: z.string().min(1, "DIRECT_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_EMAIL: z.string().email().default("admin@raafat.digital"),
  ADMIN_PASSWORD: z.string().min(1).default("change-me-on-first-login"),
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().default("RAAFAT-DIGITAL <hello@raafat.digital>"),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().default("RAAFAT-DIGITAL <hello@raafat.digital>"),
  NOTIFICATION_EMAIL: z.string().email().default("hello@raafat.digital"),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  /** Legacy local uploads only — new images use Cloudinary URLs */
  UPLOAD_DIR: z.string().default("./uploads"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
