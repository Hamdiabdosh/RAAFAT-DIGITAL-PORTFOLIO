import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostCard } from "@/components/blog/post-card";
import { ProjectFilter } from "@/components/portfolio/project-filter";
import { ContentGate } from "@/components/content/content-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { blogFilters, filterBlogPosts, type BlogFilter } from "@/lib/content";
import { blogPostsQuery } from "@/lib/queries";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Insights | RAAFAT-DIGITAL" },
      {
        name: "description",
        content: "Practical advice for Ethiopian businesses navigating the digital world.",
      },
      { property: "og:title", content: "Blog — RAAFAT-DIGITAL" },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [filter, setFilter] = useState<BlogFilter>("All");
  const { data: posts, isLoading, isError, error, refetch } = useQuery(
    blogPostsQuery({ limit: "50" }),
  );

  const featured = (posts ?? []).find((p) => p.featured) ?? posts?.[0];
  const rest = (posts ?? []).filter((p) => p.slug !== featured?.slug);
  const filtered = filterBlogPosts(rest, filter);
  const allTags = [...new Set((posts ?? []).flatMap((p) => p.tags))];

  function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.success("Subscribed! We'll send you our latest articles.");
  }

  return (
    <PublicLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-bold">Insights & Articles</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Practical advice for Ethiopian businesses navigating the digital world.
        </p>
      </div>

      <Section className="!pt-0">
        <ContentGate
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={() => refetch()}
        >
          <div className="grid lg:grid-cols-[1fr_280px] gap-10">
            <div>
              {featured && <FeaturedPost post={featured} />}
              <div className="mt-10">
                <ProjectFilter options={blogFilters} active={filter} onChange={setFilter} />
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} compact />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="mt-10 text-center text-muted-foreground">
                  No articles in this category.
                </p>
              )}
            </div>

            <aside className="hidden lg:block space-y-6">
              <Card className="p-5 bg-card">
                <h3 className="font-display font-semibold">Get articles in your inbox</h3>
                <form onSubmit={handleNewsletter} className="mt-4 space-y-3">
                  <Input type="email" placeholder="your@email.com" required />
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </Card>
              <Card className="p-5 bg-card">
                <h3 className="text-sm font-semibold mb-3">Popular tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs bg-secondary text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Card>
              <Card className="p-5 bg-gold-dim border-gold-soft">
                <h3 className="font-display font-semibold">Start a Project</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ready to build your digital presence?
                </p>
                <Button asChild className="mt-4 w-full">
                  <Link to="/contact">Get in touch</Link>
                </Button>
              </Card>
            </aside>
          </div>
        </ContentGate>
      </Section>
    </PublicLayout>
  );
}
