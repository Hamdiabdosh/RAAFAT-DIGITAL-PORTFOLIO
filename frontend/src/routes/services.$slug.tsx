import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
import { serviceSlugToProjectCategory } from "@/lib/content";
import { projectsQuery, serviceBySlugQuery } from "@/lib/queries";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params, context: { queryClient } }) => {
    try {
      return await queryClient.ensureQueryData(serviceBySlugQuery(params.slug));
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} — RAAFAT-DIGITAL`
          : "Service — RAAFAT-DIGITAL",
      },
      {
        name: "description",
        content: loaderData?.subtitle ?? "Service details",
      },
    ],
  }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = Route.useLoaderData();
  const category = serviceSlugToProjectCategory[slug];

  const { data: allProjects } = useQuery(projectsQuery());
  const related = category
    ? (allProjects ?? []).filter((p) => p.category === category).slice(0, 2)
    : [];

  return (
    <PublicLayout>
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-border">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Service</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">{service.title}</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">{service.description}</p>
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
          {service.processSteps.map((step, i) => (
            <div key={step.title}>
              <span className="text-gold font-display font-bold">
                {String(step.step ?? i + 1).padStart(2, "0")}
              </span>
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

      {service.faqs.length > 0 && (
        <Section className="!pt-0">
          <h2 className="font-display text-2xl font-bold mb-6">FAQ</h2>
          <Accordion type="single" collapsible className="max-w-2xl">
            {service.faqs.map((item, i) => (
              <AccordionItem key={item.question} value={`sq-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      )}

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
