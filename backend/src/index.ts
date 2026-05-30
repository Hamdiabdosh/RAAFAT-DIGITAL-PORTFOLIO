import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error";
import { requireAuth } from "./middleware/auth";
import authRouter from "./modules/auth/auth.router";
import contactRouter from "./modules/contact/contact.router";
import { projectsPublicRouter } from "./modules/projects/projects.router";
import { blogPublicRouter } from "./modules/blog/blog.router";
import { servicesPublicRouter } from "./modules/services/services.router";
import { testimonialsPublicRouter } from "./modules/testimonials/testimonials.router";
import settingsPublicRouter from "./modules/settings/settings-public.router";
import adminRouter from "./modules/admin/admin.router";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/projects", projectsPublicRouter);
app.use("/api/v1/blog", blogPublicRouter);
app.use("/api/v1/services", servicesPublicRouter);
app.use("/api/v1/testimonials", testimonialsPublicRouter);
app.use("/api/v1/settings", settingsPublicRouter);
app.use("/api/v1/admin", requireAuth, adminRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found", code: "NOT_FOUND" });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`🚀 RAAFAT-DIGITAL API running on port ${env.PORT}`);
  console.log(`📦 Environment: ${env.NODE_ENV}`);
});
