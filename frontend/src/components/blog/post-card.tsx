import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/context/language-context";
import type { BlogPost } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PostCard({ post, compact }: { post: BlogPost; compact?: boolean }) {
  const { t } = useLanguage();

  return (
    <Card className={cn("p-5 bg-card border-border hover:-translate-y-0.5 transition-all duration-200", compact && "h-full flex flex-col")}>
      <Badge variant="outline" className="border-gold-soft text-gold bg-gold-dim w-fit">
        {post.category}
      </Badge>
      <h3 className={cn("mt-3 font-bold", compact ? "text-base" : "text-lg")}>{post.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground flex-1">{post.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="mt-4 inline-flex text-sm text-gold hover:underline"
      >
        {t("sections.readArticle")} →
      </Link>
    </Card>
  );
}
