import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t } = useLanguage();
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const stagger = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="h-[600px] w-[600px] gold-glow rounded-full" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl w-full">
        {showAnnouncement && (
          <div
            className="animate-in fade-in slide-in-from-top-2 duration-500 mx-auto max-w-lg flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gold-soft bg-gold-dim text-sm text-gold"
            style={stagger(0)}
          >
            <span className="flex-1">{t("hero.announcement")}</span>
            <button
              type="button"
              onClick={() => setShowAnnouncement(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <span
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-soft bg-gold-dim text-gold text-xs font-medium tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-500",
            showAnnouncement ? "mt-6" : "mt-0",
          )}
          style={stagger(100)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
          {t("hero.badge")}
        </span>

        <h1
          className="mt-6 font-display font-bold leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style={{ fontSize: "clamp(36px, 6vw, 80px)", ...stagger(200) }}
        >
          {t("hero.heading1")}
          <br />
          <span className="text-gold">{t("hero.heading2")}</span>
        </h1>

        <p
          className="mt-6 text-muted-foreground text-lg max-w-[560px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={stagger(300)}
        >
          {t("hero.subheading")}
        </p>

        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={stagger(400)}
        >
          <Button asChild size="lg">
            <Link to="/contact">
              {t("hero.cta1")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/portfolio">{t("hero.cta2")}</Link>
          </Button>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-24 inset-x-0 flex justify-center text-muted-foreground z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>

      <div className="absolute bottom-8 inset-x-0 z-10 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
          {[t("hero.trust1"), t("hero.trust2"), t("hero.trust3"), t("hero.trust4")].map(
            (label) => (
              <div
                key={label}
                className="px-4 py-2 rounded-lg bg-card/80 border border-border text-xs sm:text-sm backdrop-blur-sm"
              >
                {label}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
