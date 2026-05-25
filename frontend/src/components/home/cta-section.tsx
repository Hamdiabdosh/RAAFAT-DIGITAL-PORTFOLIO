import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { useLanguage } from "@/context/language-context";

export function CtaSection() {
  const { t } = useLanguage();

  return (
    <Section>
      <div className="rounded-2xl border border-gold-soft bg-gold-dim p-10 sm:p-14 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold">{t("sections.ctaTitle")}</h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{t("sections.ctaBody")}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/contact">{t("sections.ctaPrimary")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://wa.me/251XXXXXXXXX" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t("sections.ctaWhatsapp")}
            </a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{t("sections.ctaEmail")}</p>
      </div>
    </Section>
  );
}
