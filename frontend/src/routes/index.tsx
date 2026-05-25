import { createFileRoute, Link } from "@tanstack/react-router";
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
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { projects } from "@/data/portfolio";
import { blogPosts } from "@/data/blog";
import { useLanguage } from "@/context/language-context";

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
  const previewProjects = projects.slice(0, 3);
  const previewPosts = blogPosts.slice(0, 3);

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
          <ServiceCardGrid services={services} />
        </div>
      </Section>

      <ProcessSteps />

      <Section>
        <SectionHeader
          label={t("sections.ourWork")}
          title={t("sections.portfolioTitle")}
          subtitle={t("sections.portfolioSubtitle")}
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {previewProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {previewPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
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
