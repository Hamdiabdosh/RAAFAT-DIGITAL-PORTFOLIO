import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizeCls = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";
  return (
    <Link
      to="/"
      className={cn("font-display font-bold tracking-wider select-none", sizeCls, className)}
      aria-label="RAAFAT-DIGITAL home"
    >
      <span className="text-gold">RAAFAT</span>
      <span className="text-muted-foreground mx-0.5">-</span>
      <span className="text-gold">DIGITAL</span>
    </Link>
  );
}