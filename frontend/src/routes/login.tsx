import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/password-input";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — RAAFAT-DIGITAL" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back");
      setLoading(false);
      navigate({ to: "/dashboard" });
    }, 700);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
      footer={<>Don't have an account? <Link to="/register" className="text-gold hover:underline">Create one</Link></>}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@company.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" placeholder="••••••••" required />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox id="remember" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-gold hover:underline">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : <>Sign In <ArrowRight className="h-4 w-4" /></>}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" className="w-full">Google</Button>
          <Button type="button" variant="outline" className="w-full">GitHub</Button>
        </div>
      </form>
    </AuthLayout>
  );
}