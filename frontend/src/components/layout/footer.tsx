import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo size="lg" />
            <p className="mt-3 text-sm font-medium text-gold">{t("footer.tagline")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("footer.about")}</p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Send, label: "Telegram" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: Instagram, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold-soft transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="#"
                className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold-soft transition-colors text-xs font-bold"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {t("footer.services")}
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: t("footer.webDev"), to: "/services" },
                { label: t("footer.branding"), to: "/services" },
                { label: t("footer.software"), to: "/services" },
                { label: t("footer.ecommerce"), to: "/services" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-foreground/80 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {t("footer.company")}
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: "About", to: "/about" },
                { label: "Portfolio", to: "/portfolio" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms", to: "/terms" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-foreground/80 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@raafat.digital" className="hover:text-gold transition-colors">
                  hello@raafat.digital
                </a>
              </li>
              <li>WhatsApp: +251 XXX XXX XXX</li>
              <li>📍 Harar, Ethiopia</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
