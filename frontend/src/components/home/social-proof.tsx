import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/language-context";
import { projectsQuery } from "@/lib/queries";

export function SocialProof() {
  const { t } = useLanguage();
  const { data: projects } = useQuery(projectsQuery());

  const clients = [
    ...new Set((projects ?? []).map((p) => p.client).filter(Boolean)),
  ];

  const labels =
    clients.length > 0
      ? clients
      : (projects ?? []).map((p) => p.title).slice(0, 6);

  const marquee = labels.length > 0 ? labels : ["RAAFAT-DIGITAL"];

  return (
    <section className="py-12 border-y border-border bg-card overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
      <p className="text-center text-sm text-muted-foreground mb-8 px-4">
        {t("sections.socialProof")}
      </p>
      <div className="relative">
        <div className="flex marquee-track w-max gap-6">
          {[...marquee, ...marquee].map((label, i) => (
            <div
              key={`${label}-${i}`}
              className="flex-shrink-0 min-w-[8rem] max-w-[12rem] h-16 px-4 rounded-lg bg-secondary border border-border flex items-center justify-center text-xs text-muted-foreground text-center font-medium"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
