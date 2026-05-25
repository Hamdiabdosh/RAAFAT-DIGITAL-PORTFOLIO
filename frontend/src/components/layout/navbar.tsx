import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage, type Lang } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/" as const, label: t("nav.home") },
    { to: "/services" as const, label: t("nav.services") },
    { to: "/portfolio" as const, label: t("nav.portfolio") },
    { to: "/blog" as const, label: t("nav.blog") },
    { to: "/about" as const, label: t("nav.about") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = (next: Lang) => setLang(next);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[100] h-14 border-b transition-colors duration-200",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border"
          : "bg-background/40 backdrop-blur-md border-transparent",
      )}
    >
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="outline" size="sm" className="border-gold-soft text-gold">
            <Link to="/contact">{t("nav.contact")}</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center text-xs font-medium border border-border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => toggleLang("en")}
              className={cn("px-2 py-1", lang === "en" && "bg-gold-dim text-gold")}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => toggleLang("am")}
              className={cn("px-2 py-1", lang === "am" && "bg-gold-dim text-gold")}
            >
              አማ
            </button>
          </div>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/contact">{t("nav.getQuote")}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground py-1"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 py-2">
              <button
                type="button"
                onClick={() => toggleLang("en")}
                className={cn("px-3 py-1 rounded text-xs border", lang === "en" && "border-gold text-gold")}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => toggleLang("am")}
                className={cn("px-3 py-1 rounded text-xs border", lang === "am" && "border-gold text-gold")}
              >
                አማ
              </button>
            </div>
            <Button asChild variant="outline" className="border-gold-soft text-gold w-full">
              <Link to="/contact" onClick={() => setOpen(false)}>
                {t("nav.contact")}
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link to="/contact" onClick={() => setOpen(false)}>
                {t("nav.getQuote")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
