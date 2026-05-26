import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Hero } from "@/components/home/hero";
import { SocialProof } from "@/components/home/social-proof";
import { ProcessSteps } from "@/components/home/process-steps";
import { StatsBar } from "@/components/home/stats-bar";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CtaSection } from "@/components/home/cta-section";
import { ServiceCardGrid } from "@/components/services/service-card";
import { ProjectCard } from "@/components/portfolio/project-card";
import { PostCard } from "@/components/blog/post-card";
import { ContentGate } from "@/components/content/content-state";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { blogPostsQuery, projectsQuery, servicesQuery } from "@/lib/queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "RAAFAT-DIGITAL — We Digitalize Everything | Ethiopia's Digital Agency",
      },
      {
        name: "description",
        content:
          "RAAFAT-DIGITAL helps Ethiopian businesses build websites, brands, software, and e-commerce. We digitalize everything.",
      },
      { property: "og:title", content: "RAAFAT-DIGITAL — We Digitalize Everything" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useLanguage();

  const services = useQuery(servicesQuery);
  const projects = useQuery(projectsQuery({ limit: "3" }));
  const blog = useQuery(blogPostsQuery({ limit: "3" }));

  return (
    <PublicLayout>
      <Hero />
      <SocialProof />

      <Section id="services">
        <SectionHeader
          label={t("sections.whatWeDo")}
          title={t("sections.servicesTitle")}
          subtitle={t("sections.servicesSubtitle")}
        />
        <div className="mt-14">
          <ContentGate
            isLoading={services.isLoading}
            isError={services.isError}
            error={services.error}
            onRetry={() => services.refetch()}
          >
            <ServiceCardGrid services={services.data ?? []} />
          </ContentGate>
        </div>
      </Section>

      <ProcessSteps />

      <Section>
        <SectionHeader
          label={t("sections.ourWork")}
          title={t("sections.portfolioTitle")}
          subtitle={t("sections.portfolioSubtitle")}
        />
        <ContentGate
          isLoading={projects.isLoading}
          isError={projects.isError}
          error={projects.error}
          onRetry={() => projects.refetch()}
          skeletonRows={3}
        >
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(projects.data ?? []).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </ContentGate>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/portfolio">
              {t("sections.viewAllProjects")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <StatsBar />
      <Testimonials />
      <WhyChooseUs />

      <Section>
        <SectionHeader label={t("sections.insights")} title={t("sections.blogTitle")} />
        <ContentGate
          isLoading={blog.isLoading}
          isError={blog.isError}
          error={blog.error}
          onRetry={() => blog.refetch()}
          skeletonRows={3}
        >
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {(blog.data ?? []).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </ContentGate>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">{t("sections.visitBlog")} →</Link>
          </Button>
        </div>
      </Section>

      <CtaSection />
    </PublicLayout>
  );
}
