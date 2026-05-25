import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectFilter } from "@/components/portfolio/project-filter";
import { portfolioFilters, projects } from "@/data/portfolio";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Our Work | RAAFAT-DIGITAL" },
      { name: "description", content: "Explore projects built for Ethiopian businesses." },
      { property: "og:title", content: "Portfolio — RAAFAT-DIGITAL" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]>("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <PublicLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Our Portfolio</h1>
        <p className="mt-4 text-muted-foreground">
          Every project tells a story. Here are some of ours.
        </p>
      </div>

      <Section className="!pt-0">
        <ProjectFilter options={portfolioFilters} active={filter} onChange={setFilter} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </PublicLayout>
  );
}
