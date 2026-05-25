import { createFileRoute } from "@tanstack/react-router";
import { Download, Plus } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { StatusPill } from "@/components/dashboard/status-pill";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — RAAFAT-DIGITAL" }] }),
  component: Overview,
});

const revenue = [
  { m: "Jan", v: 42 }, { m: "Feb", v: 56 }, { m: "Mar", v: 48 }, { m: "Apr", v: 71 },
  { m: "May", v: 64 }, { m: "Jun", v: 89 }, { m: "Jul", v: 78 }, { m: "Aug", v: 92 },
  { m: "Sep", v: 84 }, { m: "Oct", v: 110 }, { m: "Nov", v: 98 }, { m: "Dec", v: 124 },
];

const activity = [
  { color: "bg-success", text: "New project 'Aurora' created", time: "2m ago" },
  { color: "bg-gold", text: "Invoice #1842 marked as paid", time: "1h ago" },
  { color: "bg-info", text: "Ada Morrison joined the team", time: "3h ago" },
  { color: "bg-danger", text: "Build failed on staging/api", time: "5h ago" },
  { color: "bg-success", text: "Plan upgraded to Studio", time: "yesterday" },
  { color: "bg-muted-foreground", text: "Settings updated by admin", time: "2d ago" },
];

const projects = [
  { name: "Aurora", client: "Northwind", status: "active" as const, revenue: "$24,800", updated: "2h ago" },
  { name: "Helios CMS", client: "Pylon", status: "pending" as const, revenue: "$12,400", updated: "1d ago" },
  { name: "Caelum Studio", client: "Caelum", status: "active" as const, revenue: "$38,200", updated: "3d ago" },
  { name: "Vega Mobile", client: "Vega Labs", status: "paused" as const, revenue: "$6,000", updated: "1w ago" },
  { name: "Orion Internal", client: "—", status: "error" as const, revenue: "$0", updated: "1w ago" },
];

function Overview() {
  return (
    <>
      <PageHeader
        title="Overview"
        subtitle={new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
            <Button size="sm"><Plus className="h-4 w-4" /> New Project</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Revenue" value="$128,420" delta="+12.4% vs last month" />
        <KpiCard label="Active Users" value="2,847" delta="+8.2%" />
        <KpiCard label="Projects" value="42" delta="+3 new" />
        <KpiCard label="Uptime" value="99.98%" delta="-0.01%" positive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card className="lg:col-span-2 p-6 bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-semibold">Monthly Revenue</h3>
              <p className="text-xs text-muted-foreground">Last 12 months</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--hover)" }}
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} animationDuration={500}>
                  {revenue.map((_, i) => <Cell key={i} fill="var(--gold)" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-card">
          <h3 className="font-display text-lg font-semibold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${a.color}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 p-0 overflow-hidden bg-card">
        <div className="flex items-center justify-between p-6 pb-3">
          <h3 className="font-display text-lg font-semibold">Projects</h3>
          <a href="/dashboard/projects" className="text-sm text-gold hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.name}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.client}</TableCell>
                  <TableCell><StatusPill status={p.status} /></TableCell>
                  <TableCell>{p.revenue}</TableCell>
                  <TableCell className="text-muted-foreground">{p.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}