import { Link } from "@tanstack/react-router";
import { Code2, Globe, Palette, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import type { ApiService } from "@/lib/types";
import { cn } from "@/lib/utils";

const icons = { Globe, Palette, Code2, ShoppingCart } as const;

export function serviceIcon(service: ApiService) {
  return icons[service.icon as keyof typeof icons] ?? Globe;
}

export function ServiceIconVisual({
  service,
  className,
}: {
  service: ApiService;
  className?: string;
}) {
  const Icon = serviceIcon(service);
  return (
    <div
      className={cn(
        "aspect-video rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div className="h-16 w-16 rounded-2xl bg-gold-dim border border-gold-soft flex items-center justify-center text-gold">
        <Icon className="h-8 w-8" />
      </div>
      <p className="text-sm text-muted-foreground px-4 text-center">{service.subtitle}</p>
    </div>
  );
}

export function ServiceCard({ service }: { service: ApiService }) {
  const { t } = useLanguage();
  const Icon = serviceIcon(service);

  return (
    <Card className="relative p-6 bg-card border-border hover:-translate-y-0.5 hover:border-gold-soft transition-all duration-200 group">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="h-10 w-10 rounded-lg bg-gold-dim border border-gold-soft flex items-center justify-center text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.subtitle}</p>
      <p className="mt-4 text-sm font-medium text-gold">{service.startingPrice}</p>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="mt-4 inline-flex text-sm text-gold hover:underline"
      >
        {t("sections.learnMore")} →
      </Link>
    </Card>
  );
}

export function ServiceCardGrid({
  services: items,
  className,
}: {
  services: ApiService[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-5", className)}>
      {items.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  );
}
