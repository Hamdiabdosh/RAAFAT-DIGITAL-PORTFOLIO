import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/portfolio")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/projects" });
  },
});
