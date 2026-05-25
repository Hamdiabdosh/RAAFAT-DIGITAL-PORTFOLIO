import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, CreditCard } from "lucide-react";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — RAAFAT-DIGITAL" }] }),
  component: BillingPage,
});

const usage = [
  { label: "Storage", used: 64, max: 100, unit: "GB" },
  { label: "Seats", used: 8, max: 20, unit: "" },
  { label: "API calls", used: 412000, max: 1000000, unit: "" },
];

const invoices = [
  { date: "May 1, 2026", amount: "$49.00", status: "Paid" },
  { date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
  { date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
  { date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
];

function BillingPage() {
  return (
    <>
      <PageHeader title="Billing" subtitle="Plan, usage, and invoices." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 bg-card relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gold" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Current plan</p>
          <p className="mt-2 font-display text-2xl font-bold text-gold">Studio</p>
          <p className="text-sm text-muted-foreground">$49 / month</p>
          <p className="mt-4 text-xs text-muted-foreground">Renews on June 1, 2026</p>
          <Button className="mt-4" size="sm" variant="outline">Manage plan</Button>
        </Card>

        <Card className="p-6 bg-card lg:col-span-2">
          <h3 className="font-display text-lg font-semibold mb-4">Usage</h3>
          <div className="space-y-4">
            {usage.map((u) => (
              <div key={u.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{u.label}</span>
                  <span className="text-muted-foreground">{u.used.toLocaleString()}{u.unit && ` ${u.unit}`} / {u.max.toLocaleString()}{u.unit && ` ${u.unit}`}</span>
                </div>
                <Progress value={(u.used / u.max) * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6 bg-card flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-gold-dim border border-gold-soft flex items-center justify-center text-gold">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12 / 2028</p>
          </div>
        </div>
        <Button variant="outline" size="sm">Change card</Button>
      </Card>

      <Card className="mt-6 p-0 overflow-hidden bg-card">
        <div className="p-6 pb-3">
          <h3 className="font-display text-lg font-semibold">Invoice history</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Invoice</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.date}>
                  <TableCell>{i.date}</TableCell>
                  <TableCell>{i.amount}</TableCell>
                  <TableCell><span className="text-success text-xs font-medium">{i.status}</span></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>
  );
}