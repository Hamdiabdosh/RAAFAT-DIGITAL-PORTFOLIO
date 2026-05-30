import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const useCloudflare = process.env.DEPLOY_TARGET === "cloudflare";

// Vercel: connect GitHub repo with root directory `frontend` (native TanStack Start detection).
// Cloudflare: DEPLOY_TARGET=cloudflare npm run build
export default defineConfig({
  plugins: [
    ...(useCloudflare
      ? [cloudflare({ viteEnvironment: { name: "ssr" } })]
      : []),
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
