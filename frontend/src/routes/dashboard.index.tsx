import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — RAAFAT-DIGITAL" }] }),
  component: Overview,
});

function Overview() {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.admin.getStats(),
  });

  const { data: messages } = useQuery({
    queryKey: ["messages", "recent"],
    queryFn: () => api.admin.getMessages({ limit: "5" }),
  });

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle={new Date().toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Messages"
          value={String(stats?.messages.total ?? "—")}
          delta={`${stats?.messages.unread ?? 0} unread`}
        />
        <KpiCard
          label="Projects"
          value={String(stats?.projects.total ?? "—")}
          delta={`${stats?.projects.published ?? 0} published`}
        />
        <KpiCard
          label="Blog Posts"
          value={String(stats?.blog.total ?? "—")}
          delta={`${stats?.blog.drafts ?? 0} drafts`}
        />
        <KpiCard
          label="Testimonials"
          value={String(stats?.testimonials.total ?? "—")}
          delta="Featured on site"
        />
      </div>

      <Card className="mt-6 p-0 overflow-hidden bg-card">
        <div className="flex items-center justify-between p-6 pb-3">
          <h3 className="font-display text-lg font-semibold">Recent Messages</h3>
          <Link to="/dashboard/messages" className="text-sm text-gold hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(messages ?? []).map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground">{m.email}</TableCell>
                  <TableCell>{m.serviceInterest ?? "—"}</TableCell>
                  <TableCell>{m.status}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {!messages?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No messages yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}
