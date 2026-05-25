import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PasswordInput } from "@/components/auth/password-input";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — RAAFAT-DIGITAL" }] }),
  component: () => (<AppLayout><SettingsPage /></AppLayout>),
});

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your account, preferences, and security." />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6"><ProfileTab /></TabsContent>
        <TabsContent value="notifications" className="mt-6"><NotificationsTab /></TabsContent>
        <TabsContent value="security" className="mt-6"><SecurityTab /></TabsContent>
        <TabsContent value="billing" className="mt-6"><BillingTab /></TabsContent>
        <TabsContent value="danger" className="mt-6"><DangerTab /></TabsContent>
      </Tabs>
    </>
  );
}

function ProfileTab() {
  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-gold-dim border border-gold-soft flex items-center justify-center font-display text-gold text-2xl">RD</div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Upload</Button>
          <Button size="sm" variant="ghost">Remove</Button>
        </div>
      </div>

      <form className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved"); }}>
        <div className="space-y-1.5"><Label htmlFor="fn">Full name</Label><Input id="fn" defaultValue="Ada Morrison" /></div>
        <div className="space-y-1.5"><Label htmlFor="em">Email</Label><Input id="em" type="email" defaultValue="ada@northwind.co" /></div>
        <div className="space-y-1.5"><Label htmlFor="ph">Phone</Label><Input id="ph" defaultValue="+1 555 010 0123" /></div>
        <div className="space-y-1.5"><Label htmlFor="we">Website</Label><Input id="we" defaultValue="https://raafat.digital" /></div>
        <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" rows={3} defaultValue="Design lead, building premium digital experiences." /></div>
        <div className="space-y-1.5">
          <Label>Language</Label>
          <Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="ar">Arabic</SelectItem><SelectItem value="fr">French</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Timezone</Label>
          <Select defaultValue="utc"><SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="utc">UTC</SelectItem><SelectItem value="cet">CET (Berlin)</SelectItem><SelectItem value="pst">PST (LA)</SelectItem></SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2 pt-2"><Button type="submit" className="w-full">Save changes</Button></div>
      </form>
    </Card>
  );
}

const notifs = [
  { k: "email", label: "Email notifications", desc: "Receive product updates by email", on: true, locked: false },
  { k: "push", label: "Browser push", desc: "Real-time alerts in your browser", on: false, locked: false },
  { k: "digest", label: "Weekly digest", desc: "A summary of activity every Monday", on: true, locked: false },
  { k: "proj", label: "Project updates", desc: "Status changes and comments", on: true, locked: false },
  { k: "pay", label: "Payment alerts", desc: "Invoices and payment failures", on: true, locked: false },
  { k: "sec", label: "Security alerts", desc: "Sign-ins and password changes", on: true, locked: true },
];

function NotificationsTab() {
  return (
    <Card className="p-2 bg-card">
      {notifs.map((n) => (
        <div key={n.k} className="flex items-center justify-between p-4 border-b border-border last:border-b-0">
          <div className="min-w-0 pr-4">
            <p className="text-sm font-medium">{n.label}{n.locked && <span className="ml-2 text-[10px] uppercase tracking-widest text-gold">Required</span>}</p>
            <p className="text-xs text-muted-foreground">{n.desc}</p>
          </div>
          <Switch defaultChecked={n.on} disabled={n.locked} />
        </div>
      ))}
    </Card>
  );
}

const sessions = [
  { device: "MacBook Pro · Safari", location: "Berlin, DE", last: "active now" },
  { device: "iPhone 15 · Mobile", location: "Berlin, DE", last: "2h ago" },
  { device: "Linux · Firefox", location: "Cairo, EG", last: "3d ago" },
];

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card">
        <h3 className="font-display text-lg font-semibold">Change password</h3>
        <form className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }}>
          <div className="space-y-1.5"><Label htmlFor="cp">Current</Label><PasswordInput id="cp" /></div>
          <div className="space-y-1.5"><Label htmlFor="np">New</Label><PasswordInput id="np" /></div>
          <div className="space-y-1.5"><Label htmlFor="cn">Confirm</Label><PasswordInput id="cn" /></div>
          <div className="sm:col-span-3"><Button type="submit">Update password</Button></div>
        </form>
      </Card>

      <Card className="p-6 bg-card flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Two-factor authentication</h3>
          <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security at sign-in.</p>
        </div>
        <Switch />
      </Card>

      <Card className="p-0 overflow-hidden bg-card">
        <div className="p-6 pb-3"><h3 className="font-display text-lg font-semibold">Active sessions</h3></div>
        <Table>
          <TableHeader><TableRow><TableHead>Device</TableHead><TableHead>Location</TableHead><TableHead>Last active</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
          <TableBody>
            {sessions.map((s) => (
              <TableRow key={s.device}>
                <TableCell className="font-medium">{s.device}</TableCell>
                <TableCell className="text-muted-foreground">{s.location}</TableCell>
                <TableCell className="text-muted-foreground">{s.last}</TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="sm" className="text-danger hover:text-danger">Revoke</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function BillingTab() {
  return (
    <Card className="p-6 bg-card">
      <h3 className="font-display text-lg font-semibold">Billing</h3>
      <p className="text-sm text-muted-foreground mt-1">Manage your plan and payment methods.</p>
      <Button asChild className="mt-4" variant="outline" size="sm"><a href="/dashboard/billing">Open billing</a></Button>
    </Card>
  );
}

function DangerTab() {
  const [confirm, setConfirm] = useState("");
  return (
    <Card className="p-6 bg-card border-danger/40">
      <h3 className="font-display text-lg font-semibold text-danger">Delete account</h3>
      <p className="text-sm text-muted-foreground mt-1">This is permanent and cannot be undone. All projects and data will be erased.</p>
      <Dialog>
        <DialogTrigger asChild><Button variant="destructive" className="mt-4">Delete my account</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>Type <span className="font-mono text-foreground">DELETE</span> to confirm.</DialogDescription>
          </DialogHeader>
          <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="DELETE" />
          <DialogFooter>
            <Button variant="destructive" disabled={confirm !== "DELETE"} onClick={() => toast.error("Account deletion is disabled in demo")}>Delete account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}