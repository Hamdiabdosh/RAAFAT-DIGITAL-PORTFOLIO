import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ServiceIconVisual } from "@/components/services/service-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContentGate } from "@/components/content/content-state";
import { servicesQuery } from "@/lib/queries";
import type { ApiService } from "@/lib/types";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "Our Services — Web, Branding, Software & E-commerce | RAAFAT-DIGITAL",
      },
      {
        name: "description",
        content:
          "End-to-end digital services for Ethiopian businesses — web, branding, software, and e-commerce.",
      },
      { property: "og:title", content: "Our Services — RAAFAT-DIGITAL" },
    ],
  }),
  component: ServicesPage,
});

function collectFaqs(services: ApiService[]) {
  const seen = new Set<string>();
  const faqs: { q: string; a: string }[] = [];
  for (const service of services) {
    for (const item of service.faqs) {
      if (seen.has(item.question)) continue;
      seen.add(item.question);
      faqs.push({ q: item.question, a: item.answer });
    }
  }
  return faqs;
}

function ServicesPage() {
  const { data: services, isLoading, isError, error, refetch } = useQuery(servicesQuery);
  const faqs = collectFaqs(services ?? []);

  return (
    <PublicLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Our Services</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          End-to-end digital services tailored to Ethiopian businesses at every stage of growth.
        </p>
      </div>

      <ContentGate
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        skeletonRows={4}
      >
        {(services ?? []).map((service, i) => (
          <Section key={service.slug} className={i % 2 === 1 ? "bg-card/30" : undefined}>
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <ServiceIconVisual service={service} />
              <div>
                <h2 className="font-display text-3xl font-bold">{service.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.includes.slice(0, 6).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 inline-block px-3 py-1 rounded-full bg-gold-dim border border-gold-soft text-gold text-sm font-medium">
                  {service.startingPrice}
                </p>
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/services/$slug" params={{ slug: service.slug }}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        ))}
      </ContentGate>

      {faqs.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      )}
    </PublicLayout>
  );
}
