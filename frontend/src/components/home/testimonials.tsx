import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/context/language-context";
import { testimonialDisplayRole, testimonialInitials } from "@/lib/content";
import { mediaUrl } from "@/lib/media";
import { testimonialsQuery } from "@/lib/queries";

export function Testimonials() {
  const { t } = useLanguage();
  const { data: testimonials, isLoading, isError } = useQuery(testimonialsQuery);

  return (
    <Section>
      <SectionHeader
        label={t("sections.kindWords")}
        title={t("sections.testimonialsTitle")}
      />
      {isLoading && (
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      )}
      {isError && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Unable to load testimonials.
        </p>
      )}
      <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {(testimonials ?? []).map((item) => (
          <Card
            key={item.id}
            className="min-w-[280px] md:min-w-0 flex-shrink-0 snap-center p-6 bg-card"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold" />
              ))}
            </div>
            <p className="mt-4 text-sm text-foreground/90 leading-relaxed">"{item.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              {mediaUrl(item.avatar) ? (
                <img
                  src={mediaUrl(item.avatar)!}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover border border-gold-soft"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gold-dim border border-gold-soft flex items-center justify-center text-gold font-display text-sm">
                  {testimonialInitials(item.name, item.avatar)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonialDisplayRole(item)}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
