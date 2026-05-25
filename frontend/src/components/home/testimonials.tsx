import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";

const testimonials = [
  {
    quote:
      "RAAFAT-DIGITAL transformed our online presence. We went from zero to a fully functional e-commerce store in just 3 weeks. The team was patient, responsive, and truly cared about our success.",
    initials: "FH",
    name: "Fatima Hassan",
    role: "Owner, Harar Spice Market",
  },
  {
    quote:
      "They built our NGO's management system from scratch. What impressed us most was how well they understood our mission, not just our technical requirements.",
    initials: "ST",
    name: "Solomon Tesfaye",
    role: "Director, Addis Youth Foundation",
  },
  {
    quote:
      "Our brand identity finally feels professional. The logo, colors, and guidelines they delivered have elevated how clients perceive us at every touchpoint.",
    initials: "MA",
    name: "Meron Alemu",
    role: "Founder, Meron Consulting",
  },
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <Section>
      <SectionHeader
        label={t("sections.kindWords")}
        title={t("sections.testimonialsTitle")}
      />
      <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {testimonials.map((item) => (
          <Card
            key={item.name}
            className="min-w-[280px] md:min-w-0 flex-shrink-0 snap-center p-6 bg-card"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <p className="mt-4 text-sm text-foreground/90 leading-relaxed">"{item.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gold-dim border border-gold-soft flex items-center justify-center text-gold font-display text-sm">
                {item.initials}
              </div>
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
