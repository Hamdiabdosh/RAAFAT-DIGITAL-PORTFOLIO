import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — RAAFAT-DIGITAL" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle={`We sent a reset link to ${email || "your email"}.`}
        footer={<Link to="/login" className="text-gold hover:underline">Back to sign in</Link>}
      >
        <div className="flex flex-col items-center text-center py-2">
          <div className="h-14 w-14 rounded-full bg-gold-dim border border-gold-soft flex items-center justify-center text-gold">
            <Mail className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">Didn't get it? Check spam, or</p>
          <button onClick={() => setSent(false)} className="mt-1 text-sm text-gold hover:underline">Resend email</button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={<Link to="/login" className="inline-flex items-center gap-1 text-gold hover:underline"><ArrowLeft className="h-3 w-3" /> Back to sign in</Link>}
    >
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />
        </div>
        <Button type="submit" className="w-full">Send Reset Link</Button>
      </form>
    </AuthLayout>
  );
}