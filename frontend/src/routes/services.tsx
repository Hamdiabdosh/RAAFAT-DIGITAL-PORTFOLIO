import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title: "Our Services — Web, Branding, Software & E-commerce | RAAFAT-DIGITAL",
      },
      {
        name: "description",
        content: "End-to-end digital services for Ethiopian businesses — web, branding, software, and e-commerce.",
      },
      { property: "og:title", content: "Our Services — RAAFAT-DIGITAL" },
    ],
  }),
  component: ServicesPage,
});

const faqs = [
  {
    q: "How long does a project take?",
    a: "Websites: 1–3 weeks. Branding: 1–2 weeks. Custom software: 4–12 weeks depending on complexity.",
  },
  {
    q: "Do you work with clients outside Harar?",
    a: "Yes, we work with clients across Ethiopia remotely.",
  },
  {
    q: "What information do I need to get started?",
    a: "Just a brief description of your business and what you need. We'll guide you through the rest.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, we offer flexible payment schedules for larger projects.",
  },
  {
    q: "What happens after the project is delivered?",
    a: "All projects include a support period. We don't disappear after launch.",
  },
];

function ServicesPage() {
  return (
    <PublicLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Our Services</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          End-to-end digital services tailored to Ethiopian businesses at every stage of growth.
        </p>
      </div>

      {services.map((service, i) => (
        <Section key={service.slug} className={i % 2 === 1 ? "bg-card/30" : undefined}>
          <div
            className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <ImagePlaceholder label={service.title} />
            <div>
              <h2 className="font-display text-3xl font-bold">{service.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{service.fullDescription}</p>
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

      <Section>
        <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </PublicLayout>
  );
}
