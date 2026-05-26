import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/language-context";
import { blogCategoryLabels, formatBlogDate, formatReadTime } from "@/lib/content";
import type { ApiBlogPost } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MediaImage } from "@/components/ui/media-image";
import { cn } from "@/lib/utils";

export function PostCard({ post, compact }: { post: ApiBlogPost; compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <Card
      className={cn(
        "overflow-hidden bg-card border-border hover:-translate-y-0.5 transition-all duration-200",
        compact && "h-full flex flex-col",
      )}
    >
      {!compact && (
        <MediaImage
          src={post.coverImage}
          alt={post.title}
          label={post.title}
          className="rounded-none border-0 border-b"
        />
      )}
      <div className={cn("p-5", compact && "flex flex-col flex-1")}>
      <Badge variant="outline" className="border-gold-soft text-gold bg-gold-dim w-fit">
        {blogCategoryLabels[post.category]}
      </Badge>
      <h3 className={cn("mt-3 font-bold", compact ? "text-base" : "text-lg")}>{post.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span>·</span>
        <span>{formatReadTime(post.readTime)}</span>
      </div>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="mt-4 inline-flex text-sm text-gold hover:underline"
      >
        {t("sections.readArticle")} →
      </Link>
      </div>
    </Card>
  );
}
