import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ProjectCard } from "@/components/portfolio/project-card";
import { getProjectBySlug, projects } from "@/data/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    return {
      meta: [
        { title: project ? `${project.title} — RAAFAT-DIGITAL` : "Case Study — RAAFAT-DIGITAL" },
        { name: "description", content: project?.description ?? "Project case study" },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const project = getProjectBySlug(slug);
  if (!project) throw notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <PublicLayout>
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">{project.category}</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold">{project.title}</h1>
        <p className="mt-2 text-muted-foreground">{project.clientType}</p>
      </div>

      <Section className="!pt-0">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: "Challenge", body: project.challenge },
            { title: "Solution", body: project.solution },
            { title: "Result", body: project.result },
          ].map((card) => (
            <Card key={card.title} className="p-6 bg-card">
              <h3 className="font-display font-semibold text-gold">{card.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{card.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold">Process</h2>
              <ol className="mt-4 space-y-2 list-decimal list-inside text-muted-foreground">
                {project.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="grid gap-5">
              {["Screenshot 1", "Screenshot 2", "Screenshot 3"].map((label) => (
                <ImagePlaceholder key={label} label={label} />
              ))}
            </div>
          </div>
          <Card className="p-6 h-fit bg-card">
            <h3 className="font-display font-semibold">Project Details</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Service</dt>
                <dd className="font-medium">{project.category}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="font-medium">{project.timeline}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Technologies</dt>
                <dd className="font-medium">{project.technologies.join(", ")}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid sm:grid-cols-3 gap-5">
          {project.metrics.map((m) => (
            <Card key={m.label} className="p-6 text-center bg-card">
              <p className="font-display text-3xl text-gold font-bold">{m.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link to="/contact">Start a similar project →</Link>
          </Button>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-bold mb-8">Related Projects</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {related.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
