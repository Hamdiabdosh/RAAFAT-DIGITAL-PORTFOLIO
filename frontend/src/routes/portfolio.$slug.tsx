import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/ui/media-image";
import { ProjectCard } from "@/components/portfolio/project-card";
import { projectCategoryLabels, projectMetrics } from "@/lib/content";
import { projectBySlugQuery, projectsQuery } from "@/lib/queries";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params, context: { queryClient } }) => {
    try {
      return await queryClient.ensureQueryData(projectBySlugQuery(params.slug));
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} — RAAFAT-DIGITAL`
          : "Case Study — RAAFAT-DIGITAL",
      },
      { name: "description", content: loaderData?.description ?? "Project case study" },
    ],
  }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const project = Route.useLoaderData();
  const { data: allProjects } = useQuery(projectsQuery());

  const related = (allProjects ?? [])
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  const metrics = projectMetrics(project.metrics);
  const gallery = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...project.images,
  ];

  return (
    <PublicLayout>
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">
          {projectCategoryLabels[project.category]}
        </p>
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
              <h2 className="font-display text-2xl font-bold">Technologies</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm bg-secondary text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            {gallery.length > 0 && (
              <div className="grid gap-5">
                {gallery.map((src, i) => (
                  <MediaImage
                    key={`${src}-${i}`}
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    label={project.title}
                  />
                ))}
              </div>
            )}
          </div>
          <Card className="p-6 h-fit bg-card">
            <h3 className="font-display font-semibold">Project Details</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Client</dt>
                <dd className="font-medium">{project.client}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Service</dt>
                <dd className="font-medium">{projectCategoryLabels[project.category]}</dd>
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

      {metrics.length > 0 && (
        <Section className="!pt-0">
          <div className="grid sm:grid-cols-3 gap-5">
            {metrics.map((m) => (
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
      )}

      {related.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold mb-8">Related Projects</h2>
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
