import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Copy, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MediaImage } from "@/components/ui/media-image";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { whatsappLink } from "@/lib/site-settings";
import {
  blogCategoryLabels,
  formatBlogDate,
  formatReadTime,
} from "@/lib/content";
import { blogPostBySlugQuery, blogPostsQuery } from "@/lib/queries";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context: { queryClient } }) => {
    try {
      return await queryClient.ensureQueryData(blogPostBySlugQuery(params.slug));
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.title} — RAAFAT-DIGITAL`
          : "Article — RAAFAT-DIGITAL",
      },
      { name: "description", content: loaderData?.excerpt ?? "Blog article" },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();
  const settings = useSiteSettings();
  const { data: allPosts } = useQuery(blogPostsQuery({ limit: "20" }));

  const related = (allPosts ?? []).filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  function copyLink() {
    void navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  }

  return (
    <PublicLayout>
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_200px] gap-12">
          <div>
            <Badge variant="outline" className="border-gold-soft text-gold bg-gold-dim">
              {blogCategoryLabels[post.category]}
            </Badge>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>{formatReadTime(post.readTime)}</span>
              <span>By Raafat</span>
            </div>

            <MediaImage
              src={post.coverImage}
              alt={post.title}
              label={post.title}
              className="mt-8"
            />

            <div className="mt-10 prose prose-invert max-w-none space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
              {paragraphs.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm font-medium mb-4">Share this article</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={copyLink}>
                  <Copy className="h-4 w-4" />
                  Copy link
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`${whatsappLink(settings.whatsapp_number)}?text=${encodeURIComponent(post.title + " " + url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Send className="h-4 w-4" />
                    Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-bold mb-8">Related articles</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-gold-soft bg-gold-dim p-8 text-center">
            <p className="font-display text-xl font-bold">Need help with your digital presence?</p>
            <Button asChild className="mt-4">
              <Link to="/contact">Let's talk</Link>
            </Button>
          </div>
        </Section>
      )}
    </PublicLayout>
  );
}
