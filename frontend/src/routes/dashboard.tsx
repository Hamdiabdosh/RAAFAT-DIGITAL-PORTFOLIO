import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminAuthGuard } from "@/components/auth/admin-auth-guard";
import { AppLayout } from "@/components/layout/app-layout";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <AdminAuthGuard>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AdminAuthGuard>
  ),
});