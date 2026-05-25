import { useLanguage } from "@/context/language-context";

export function SocialProof() {
  const { t } = useLanguage();
  const logos = Array.from({ length: 12 }, (_, i) => `Client Logo ${(i % 6) + 1}`);

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
          {[...logos, ...logos].map((label, i) => (
            <div
              key={`${label}-${i}`}
              className="flex-shrink-0 w-32 h-16 rounded-lg bg-secondary border border-border flex items-center justify-center text-xs text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
