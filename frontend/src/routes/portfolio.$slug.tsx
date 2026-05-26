import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { CaseStudyDepth } from "@/components/portfolio/case-study-depth";
import { CaseStudyGallery } from "@/components/portfolio/case-study-gallery";
import { CaseStudyHero } from "@/components/portfolio/case-study-hero";
import { CaseStudyNav } from "@/components/portfolio/case-study-nav";
import { CaseStudySidebar } from "@/components/portfolio/case-study-sidebar";
import { CaseStudyStory } from "@/components/portfolio/case-study-story";
import { ProjectCard } from "@/components/portfolio/project-card";
import { getAdjacentProjects } from "@/lib/project-navigation";
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

  const { prev, next } = getAdjacentProjects(allProjects ?? [], project.slug);

  const related = (allProjects ?? [])
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  return (
    <PublicLayout>
      <CaseStudyHero project={project} />

      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <CaseStudyStory project={project} />
            <CaseStudyGallery project={project} />
            <CaseStudyDepth project={project} />
          </div>
          <CaseStudySidebar project={project} />
        </div>
      </Section>

      <Section className="!pt-0">
        <CaseStudyNav prev={prev} next={next} />
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Discuss your project with us →</Link>
          </Button>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold mb-8">Related projects</h2>
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
