import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Mail, MessageCircle, Send } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/contact/contact-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/language-context";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { telegramLink, whatsappLink } from "@/lib/site-settings";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Start Your Project | RAAFAT-DIGITAL" },
      {
        name: "description",
        content: "Get in touch with RAAFAT-DIGITAL — contact form, email, WhatsApp, and more.",
      },
      { property: "og:title", content: "Contact — RAAFAT-DIGITAL" },
    ],
  }),
  component: ContactPage,
});

const contactFaqs = [
  {
    q: "How quickly do you respond?",
    a: "Within 24 hours on business days.",
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes, always.",
  },
  {
    q: "Do I need to have everything figured out?",
    a: "Absolutely not. We'll help you shape the idea.",
  },
];

function ContactPage() {
  const { t } = useLanguage();
  const settings = useSiteSettings();

  const channels = [
    {
      icon: Mail,
      title: "Email",
      value: settings.contact_email,
      hint: "We reply within 24 hours",
      href: `mailto:${settings.contact_email}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: settings.whatsapp_number,
      hint: "Chat with us directly",
      href: whatsappLink(settings.whatsapp_number),
    },
    {
      icon: Send,
      title: "Telegram",
      value: settings.telegram_handle,
      hint: "Message us on Telegram",
      href: telegramLink(settings.telegram_handle),
    },
  ];

  return (
    <PublicLayout>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{t("contact.title")}</h1>
            <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold">Or reach us directly</h2>
            <div className="mt-6 space-y-4">
              {channels.map((item) => (
                <Card key={item.title} className="p-5 bg-card flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gold-dim border border-gold-soft flex items-center justify-center text-gold flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <a
                      href={item.href}
                      target={item.title !== "Email" ? "_blank" : undefined}
                      rel={item.title !== "Email" ? "noopener noreferrer" : undefined}
                      className="text-sm text-gold hover:underline"
                    >
                      {item.value}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">{item.hint}</p>
                  </div>
                </Card>
              ))}
              <Card className="p-5 bg-card flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-gold-dim border border-gold-soft flex items-center justify-center text-gold flex-shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Office hours</p>
                  <p className="text-sm text-muted-foreground">{settings.office_hours}</p>
                  <p className="text-xs text-muted-foreground mt-2">📍 {settings.address}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {contactFaqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`cf-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </PublicLayout>
  );
}
