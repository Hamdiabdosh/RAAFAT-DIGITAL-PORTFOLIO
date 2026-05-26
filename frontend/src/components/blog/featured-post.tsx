import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/language-context";
import { blogCategoryLabels, formatBlogDate, formatReadTime } from "@/lib/content";
import type { ApiBlogPost } from "@/lib/types";
import { MediaImage } from "@/components/ui/media-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FeaturedPost({ post }: { post: ApiBlogPost }) {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden bg-card border-border">
      <div className="grid md:grid-cols-2 gap-0">
        <MediaImage
          src={post.coverImage}
          alt={post.title}
          label={post.title}
          className="rounded-none md:min-h-[280px]"
        />
        <div className="p-8 flex flex-col justify-center">
          <Badge variant="outline" className="border-gold-soft text-gold bg-gold-dim w-fit">
            {blogCategoryLabels[post.category]}
          </Badge>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl font-bold">{post.title}</h2>
          <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
          <div className="mt-4 text-xs text-muted-foreground">
            {formatBlogDate(post.publishedAt)} · {formatReadTime(post.readTime)}
          </div>
          <Button asChild className="mt-6 w-fit">
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              {t("sections.readArticle")} →
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
