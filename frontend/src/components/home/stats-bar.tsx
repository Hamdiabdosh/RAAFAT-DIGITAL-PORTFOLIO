import { useQuery } from "@tanstack/react-query";
import { Section } from "@/components/layout/section";
import { useLanguage } from "@/context/language-context";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";
import { projectsQuery, servicesQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

function StatItem({
  value,
  label,
  active,
}: {
  value: string;
  label: string;
  active: boolean;
}) {
  const display = useCountUp(value, active);
  return (
    <div className="text-center">
      <p className="font-display font-bold text-gold text-3xl sm:text-4xl">{display}</p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

export function StatsBar() {
  const { t } = useLanguage();
  const { ref, inView } = useInView();
  const { data: projects } = useQuery(projectsQuery());
  const { data: services } = useQuery(servicesQuery);

  const projectCount = projects?.length ?? 0;
  const serviceCount = services?.length ?? 0;

  const statValues = [
    {
      value: projectCount > 0 ? `${projectCount}+` : "0",
      key: "stats.projects" as const,
    },
    { value: "100%", key: "stats.satisfaction" as const },
    {
      value: String(serviceCount > 0 ? serviceCount : 4),
      key: "stats.services" as const,
    },
    { value: "1", key: "stats.mission" as const },
  ];

  return (
    <Section noPadding className="px-4 sm:px-6 lg:px-8 pb-0">
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-border bg-card p-8 sm:p-12 transition-opacity duration-500",
          inView ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statValues.map((s) => (
            <StatItem key={s.key} value={s.value} label={t(s.key)} active={inView} />
          ))}
        </div>
      </div>
    </Section>
  );
}
