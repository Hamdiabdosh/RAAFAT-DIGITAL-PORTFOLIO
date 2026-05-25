import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProjectCard } from "@/components/portfolio/project-card";
import { getServiceBySlug } from "@/data/services";
import { projects } from "@/data/portfolio";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    return {
      meta: [
        {
          title: service
            ? `${service.title} — RAAFAT-DIGITAL`
            : "Service — RAAFAT-DIGITAL",
        },
        {
          name: "description",
          content: service?.shortDescription ?? "Service details",
        },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = getServiceBySlug(slug);
  if (!service) throw notFound();

  const related = projects.filter((p) => p.category === service.category).slice(0, 2);

  return (
    <PublicLayout>
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-border">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">{service.category}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">{service.title}</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">{service.fullDescription}</p>
      </div>

      <Section>
        <h2 className="font-display text-2xl font-bold">What's Included</h2>
        <ul className="mt-6 grid sm:grid-cols-2 gap-3">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-gold mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="!pt-0">
        <h2 className="font-display text-2xl font-bold">Our Process</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step, i) => (
            <div key={step.title}>
              <span className="text-gold font-display font-bold">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-2xl border border-gold-soft bg-gold-dim p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-xl font-bold text-gold">{service.startingPrice}</p>
          <Button asChild size="lg">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>
      </Section>

      <Section className="!pt-0">
        <h2 className="font-display text-2xl font-bold mb-6">FAQ</h2>
        <Accordion type="single" collapsible className="max-w-2xl">
          {service.faq.map((item, i) => (
            <AccordionItem key={item.q} value={`sq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {related.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold mb-8">Related Work</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}
    </PublicLayout>
  );
}
