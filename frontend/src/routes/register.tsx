import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/password-input";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — RAAFAT-DIGITAL" }] }),
  component: RegisterPage,
});

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const labels = ["", "Weak", "Fair", "Good", "Strong"];
const colors = ["bg-border", "bg-danger", "bg-warning", "bg-gold", "bg-success"];

function RegisterPage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const score = useMemo(() => strength(pw), [pw]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start building in minutes"
      footer={<>Already have an account? <Link to="/login" className="text-gold hover:underline">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Ada Morrison" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
          <div className="mt-2 grid grid-cols-4 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-1 rounded-full ${i < score ? colors[score] : "bg-border"}`} />
            ))}
          </div>
          {pw && <p className="text-xs text-muted-foreground">Strength: <span className="text-foreground">{labels[score]}</span></p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <PasswordInput id="confirm" required />
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <Checkbox id="terms" required className="mt-0.5" />
          <span>I agree to the <a href="#" className="text-gold hover:underline">Terms of Service</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a></span>
        </label>
        <Button type="submit" className="w-full">
          Create Account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthLayout>
  );
}