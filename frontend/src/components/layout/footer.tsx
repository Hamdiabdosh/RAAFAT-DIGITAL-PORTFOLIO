import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { telegramLink, whatsappLink } from "@/lib/site-settings";

export function Footer() {
  const { t } = useLanguage();
  const settings = useSiteSettings();

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", href: settings.linkedin_url },
    { icon: Send, label: "Telegram", href: telegramLink(settings.telegram_handle) },
    { icon: MessageCircle, label: "WhatsApp", href: whatsappLink(settings.whatsapp_number) },
    { icon: Instagram, label: "Instagram", href: settings.instagram_url },
  ].filter((s) => s.href && s.href !== "#");

  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo size="lg" />
            <p className="mt-3 text-sm font-medium text-gold">{settings.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t("footer.about")}</p>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold-soft transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              {t("footer.services")}
            </h4>
            <ul className="mt-4 space-y-2">
              {[
                { label: t("footer.webDev"), to: "/services/web-development" },
                { label: t("footer.branding"), to: "/services/branding" },
                { label: t("footer.software"), to: "/services/custom-software" },
                { label: t("footer.ecommerce"), to: "/services/ecommerce" },
              ].map((l) => (
                <li key={l.to}>
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
                { label: t("nav.projects"), to: "/portfolio" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms", to: "/terms" },
              ].map((l) => (
                <li key={l.to}>
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
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="hover:text-gold transition-colors"
                >
                  {settings.contact_email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(settings.whatsapp_number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp: {settings.whatsapp_number}
                </a>
              </li>
              <li>📍 {settings.address}</li>
              <li>{settings.office_hours}</li>
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
