import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — RAAFAT-DIGITAL" }] }),
  component: AnalyticsPage,
});

const line = Array.from({ length: 30 }, (_, i) => ({ d: `D${i + 1}`, v: 200 + Math.round(Math.sin(i / 3) * 80 + i * 6) }));
const sources = [
  { source: "Organic", v: 4200 },
  { source: "Referral", v: 2100 },
  { source: "Social", v: 1700 },
  { source: "Direct", v: 980 },
];
const categories = [
  { name: "SaaS", value: 42 },
  { name: "E-commerce", value: 28 },
  { name: "Marketing", value: 18 },
  { name: "Internal", value: 12 },
];
const COLORS = ["var(--gold)", "var(--info)", "var(--success)", "var(--warning)"];
const pages = [
  { p: "/", v: "12,481" }, { p: "/pricing", v: "8,109" }, { p: "/dashboard", v: "6,402" },
  { p: "/blog/launch", v: "4,201" }, { p: "/login", v: "3,920" }, { p: "/about", v: "2,841" },
  { p: "/docs", v: "2,512" }, { p: "/changelog", v: "1,902" }, { p: "/contact", v: "1,440" }, { p: "/legal", v: "812" },
];
const ranges = ["7d", "30d", "90d", "Custom"];

function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Traffic, revenue, and audience breakdowns."
        actions={ranges.map((r, i) => (
          <Button key={r} variant={i === 1 ? "default" : "outline"} size="sm">{r}</Button>
        ))}
      />

      <Card className="p-6 bg-card">
        <h3 className="font-display text-lg font-semibold mb-4">Revenue over time</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={line} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="v" stroke="var(--gold)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="p-6 bg-card">
          <h3 className="font-display text-lg font-semibold mb-4">Users by source</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={sources} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="source" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="var(--gold)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-card">
          <h3 className="font-display text-lg font-semibold mb-4">Revenue by category</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categories} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                  {categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-0 overflow-hidden bg-card">
        <div className="p-6 pb-3">
          <h3 className="font-display text-lg font-semibold">Top 10 pages by traffic</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Page</TableHead><TableHead className="text-right">Views</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((p) => (
                <TableRow key={p.p}>
                  <TableCell className="font-mono text-sm">{p.p}</TableCell>
                  <TableCell className="text-right">{p.v}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}