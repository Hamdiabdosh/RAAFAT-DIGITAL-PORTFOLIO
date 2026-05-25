import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Copy, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug, blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);
    return {
      meta: [
        { title: post ? `${post.title} — RAAFAT-DIGITAL` : "Article — RAAFAT-DIGITAL" },
        { name: "description", content: post?.excerpt ?? "Blog article" },
      ],
    };
  },
  component: BlogPostPage,
});

// TODO: translate — article body stays English only
const articleSections = [
  {
    heading: "Why This Matters",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ethiopian businesses are increasingly competing on a global stage, and digital presence is no longer optional.",
  },
  {
    heading: "What You Can Do",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Start with a clear goal: more leads, online sales, or brand credibility. Choose tools and partners that understand your market and budget realities.",
  },
  {
    heading: "The Bottom Line",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. The businesses that invest in their digital foundation today will be the ones best positioned to grow tomorrow.",
  },
];

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getBlogPostBySlug(slug);
  if (!post) throw notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const url = typeof window !== "undefined" ? window.location.href : "";

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
              {post.category}
            </Badge>
            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
              <span>By {post.author}</span>
            </div>

            <div className="mt-10 prose prose-invert max-w-none space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
              {articleSections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl font-bold mt-8">{section.heading}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{section.body}</p>
                </section>
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
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + url)}`}
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

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {articleSections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${s.heading.replace(/\s/g, "-").toLowerCase()}`} className="text-muted-foreground hover:text-gold">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

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
    </PublicLayout>
  );
}
